import i18next from "i18next";

import pt from "./translations/pt-br/translations.json";

i18next.init({
  interpolation: { escapeValue: false },
  lng: "pt",
  resources: {
    pt,
  },
  react: {
    useSuspense: false,
  },
});

export default i18next;
