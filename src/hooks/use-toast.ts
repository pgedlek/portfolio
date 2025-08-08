import * as React from "react";

// --- Type Definitions ---
// Define the properties of a single toast item.
type Toast = {
    id: string;
    title?: React.ReactNode;
    description?: React.ReactNode;
    action?: React.ReactNode;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    // Add other properties you might use in a toast, like variant or duration.
    [key: string]: any;
};

// Define the shape of the entire state object.
type State = {
    toasts: Toast[];
};

// Define the different action types for the reducer.
type Action =
    | {
        type: "ADD_TOAST";
        toast: Toast;
    }
    | {
        type: "UPDATE_TOAST";
        toast: Partial<Toast>; // Use Partial to allow for partial updates.
    }
    | {
        type: "DISMISS_TOAST";
        toastId?: string;
    }
    | {
        type: "REMOVE_TOAST";
        toastId?: string;
    };

// --- Constants and Global State ---
const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1000000;

let count = 0;

// A simple utility to generate a unique ID for each toast.
function genId(): string {
    count = (count + 1) % Number.MAX_SAFE_INTEGER;
    return count.toString();
}

// A Map to keep track of timeouts for dismissing toasts.
const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

// --- Dispatch and Reducer ---
const listeners: ((state: State) => void)[] = [];
let memoryState: State = { toasts: [] };

function dispatch(action: Action) {
    memoryState = reducer(memoryState, action);
    listeners.forEach((listener) => {
        listener(memoryState);
    });
}

// Function to add a toast to the removal queue after a delay.
const addToRemoveQueue = (toastId: string) => {
    if (toastTimeouts.has(toastId)) {
        return;
    }

    const timeout = setTimeout(() => {
        toastTimeouts.delete(toastId);
        dispatch({
            type: "REMOVE_TOAST",
            toastId: toastId,
        });
    }, TOAST_REMOVE_DELAY);

    toastTimeouts.set(toastId, timeout);
};

// The main reducer function to manage toast state.
const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "ADD_TOAST":
            return {
                ...state,
                toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
            };

        case "UPDATE_TOAST":
            return {
                ...state,
                toasts: state.toasts.map((t) =>
                    t.id === action.toast.id ? { ...t, ...action.toast } : t
                ),
            };

        case "DISMISS_TOAST": {
            const { toastId } = action;

            if (toastId) {
                addToRemoveQueue(toastId);
            } else {
                state.toasts.forEach((toast) => {
                    addToRemoveQueue(toast.id);
                });
            }

            return {
                ...state,
                toasts: state.toasts.map((t) =>
                    t.id === toastId || toastId === undefined
                        ? {
                            ...t,
                            open: false,
                        }
                        : t
                ),
            };
        }
        case "REMOVE_TOAST":
            if (action.toastId === undefined) {
                return {
                    ...state,
                    toasts: [],
                };
            }
            return {
                ...state,
                toasts: state.toasts.filter((t) => t.id !== action.toastId),
            };
    }
};

// --- Public API Functions and Hooks ---
type ToastFn = (props: Omit<Toast, "id" | "open" | "onOpenChange">) => {
    id: string;
    dismiss: () => void;
    update: (props: Partial<Toast>) => void;
};

// The function to create and show a new toast.
const toast: ToastFn = (props) => {
    const id = genId();

    const update = (props: Partial<Toast>) =>
        dispatch({
            type: "UPDATE_TOAST",
            toast: { ...props, id },
        });
    const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });

    dispatch({
        type: "ADD_TOAST",
        toast: {
            ...props,
            id,
            open: true,
            onOpenChange: (open: boolean) => {
                if (!open) dismiss();
            },
        },
    });

    return {
        id: id,
        dismiss,
        update,
    };
};

// The custom React hook to access the toast state.
function useToast() {
    const [state, setState] = React.useState<State>(memoryState);

    React.useEffect(() => {
        // Add the component's setState function to the listeners array.
        listeners.push(setState);

        return () => {
            // Clean up by removing the listener when the component unmounts.
            const index = listeners.indexOf(setState);
            if (index > -1) {
                listeners.splice(index, 1);
            }
        };
    }, [state]); // Note: The dependency array should likely be empty `[]` to prevent re-subscriptions.

    return {
        ...state,
        toast,
        dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
    };
}

export { useToast, toast };