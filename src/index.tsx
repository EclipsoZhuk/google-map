import React from "react";
import { createRoot } from "react-dom/client";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import translationEN from "./locales/en.json";
import translationUA from "./locales/ua.json";
import "./index.css";
import App from "./App";

const lngDetector = new LanguageDetector(null, {
  order: ["localStorage", "cookie"],
  lookupCookie: "i18next",
  lookupLocalStorage: "i18next",
  caches: ["localStorage", "cookie"],
});

console.log(localStorage.getItem("i18next"));

i18n
  .use(lngDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: translationEN,
      },
      ua: {
        translation: translationUA,
      },
    },
    lng: localStorage.getItem("i18next") || "en",
    fallbackLng: "en",

    interpolation: {
      escapeValue: false,
    },
  });

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
