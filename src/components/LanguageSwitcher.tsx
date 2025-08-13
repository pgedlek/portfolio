import { Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

function LanguageSwitcher() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { i18n } = useTranslation();
    const dropdownRef = useRef<HTMLDivElement>(null);

    const changeLanguage = (lang: string) => {
        i18n.changeLanguage(lang);
        setIsDropdownOpen(false);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsDropdownOpen(false); // Close dropdown if clicked outside
        }
    };

    useEffect(() => {
        if (isDropdownOpen) {
            document.addEventListener("click", handleClickOutside);
        } else {
            document.removeEventListener("click", handleClickOutside);
        }

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [isDropdownOpen]);

    return (
        <>
            {/* Desktop version */}
            <div ref={dropdownRef} className="max-sm:hidden relative inline-block">
                {/* Globe Button */}
                <button onClick={() => setIsDropdownOpen(true)}

                    className={cn(
                        "rounded-full transition-colors duration-300",
                        "focus:outline-hidden cursor-pointer"
                    )}
                >
                    <Globe className="h-6 w-6 text-primary" />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                    <div
                        className={cn(
                            "absolute right-0 bg-white dark:bg-gray-800 shadow-lg rounded-md",
                            "py-2 w-32 z-50 border border-gray-200 dark:border-gray-700"
                        )}
                    >
                        <button
                            onClick={() => changeLanguage("en")}
                            className={cn(
                                "block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700",
                                "focus:outline-none"
                            )}
                        >
                            English
                        </button>
                        <button
                            onClick={() => changeLanguage("pl")}
                            className={cn(
                                "block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700",
                                "focus:outline-none"
                            )}
                        >
                            Polski
                        </button>
                    </div>
                )}
            </div>
            {/* Mobile version */}
            <>

            </>
        </>

    );
}

export default LanguageSwitcher;
