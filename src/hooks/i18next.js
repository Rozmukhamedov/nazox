import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from '../assets/locales/en/translation.json';
import translationRU from '../assets/locales/ru/translation.json';
import translationUFR from '../assets/locales/fr/translation.json';

const resources = {
    en: {
        translation: translationEN
    },
    ru: {
        translation: translationRU
    },
    uz: {
        translation: translationUFR
    }
};

i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)

    .init({
        resources,
        lng: "en",
        // debug: true,
        detection: {
            order: ["localStorage", "cookie"],
            caches: ["localStorage", "cookie"],
        },
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n; 