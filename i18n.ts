import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import translation files
import en from "./locales/en.json";
import pl from "./locales/pl.json";

i18n
    .use(LanguageDetector) // Detects user language
    .use(initReactI18next) // Passes i18n instance to react-i18next
    .init({
        resources: {
            en: { translation: en },
            pl: { translation: pl },
        },
        fallbackLng: "en", // Default language
        interpolation: {
            escapeValue: false, // React already escapes values
        },
    });

export default i18n;