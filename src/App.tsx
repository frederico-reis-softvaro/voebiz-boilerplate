import React from "react";
import { I18nextProvider } from "react-i18next";
import { withLDProvider } from "launchdarkly-react-client-sdk";

import AppProvider from "./context/index";

import Routes from "./routes/index";
import i18next from "./i18n/index";

const clientSideId = "62baf3989195871574e35e6c";

function App() {
  return (
    <AppProvider>
      <I18nextProvider i18n={i18next}>
        <Routes />
      </I18nextProvider>
    </AppProvider>
  );
}

export default withLDProvider({
  clientSideID: clientSideId,
  reactOptions: {
    useCamelCaseFlagKeys: false,
  },
  options: {
    baseUrl: `https://ldrelay.dev1.smiles.com.br`,
  },
})(App);
