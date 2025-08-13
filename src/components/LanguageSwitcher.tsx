import { useTranslation } from "react-i18next";

function LanguageSwitcher() {
    const { i18n } = useTranslation();

    const changeLanguage = (lang: string) => {
        i18n.changeLanguage(lang);
    };

    return (
        <div className="fixed top-5 left-5 z-50">
            <button
                onClick={() => changeLanguage("en")}
                className="px-4 py-2 mr-2 rounded bg-primary text-primary-foreground"
            >
                English
            </button>
            <button
                onClick={() => changeLanguage("pl")}
                className="px-4 py-2 rounded bg-primary text-primary-foreground"
            >
                Polski
            </button>
        </div>
    );
}

export default LanguageSwitcher;