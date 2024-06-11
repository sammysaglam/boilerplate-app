import React, { useEffect } from "react";
import {
  IntlProvider as OriginalIntlProvider,
  ReactIntlErrorCode,
} from "react-intl";
import { createGlobalState } from "react-use";

import german from "../../translations/de.json";
import spanish from "../../translations/es.json";
import french from "../../translations/fr.json";

type Lang = "en" | "de" | "fr" | "es";

export const useSelectedLanguage = createGlobalState<Lang>(
  (localStorage.getItem("lang") as Lang) ?? "en",
);

const translations: Record<Lang, Record<string, string>> = {
  en: {},
  de: german,
  es: spanish,
  fr: french,
};

const messages = Object.fromEntries(
  Object.entries(translations).map(([lang, messageData]) => [
    lang,
    Object.fromEntries(
      Object.entries(messageData).map(([key, translation]) => [
        key,
        translation,
      ]),
    ),
  ]),
);

type Props = {
  readonly children: React.ReactNode;
};

export const IntlProvider = ({ children }: Props) => {
  const [selectedLanguage] = useSelectedLanguage();

  useEffect(() => {
    localStorage.setItem("lang", selectedLanguage ?? "en");
  }, [selectedLanguage]);

  return (
    <OriginalIntlProvider
      locale={selectedLanguage ?? "en"}
      messages={messages[selectedLanguage ?? "en"] ?? messages["en"]}
      onError={(error) => {
        if (
          error.code === ReactIntlErrorCode.MISSING_TRANSLATION &&
          (selectedLanguage ?? "en") === "en"
        ) {
          return;
        }

        console.error(error);
      }}
    >
      <>{children}</>
    </OriginalIntlProvider>
  );
};
