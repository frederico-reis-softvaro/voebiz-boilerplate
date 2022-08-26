import React, { ReactElement } from "react";
import { render } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import { MemoryRouter } from "react-router-dom";

import AppProvider from "../context";

import i18next from "../i18n";

const routesPath = "/cadastro";
const customRender = (ui: ReactElement, { route = "/cadastro", ...renderOptions }) => {
  window.history.pushState({}, "Test Page", route);
  return render(
    <AppProvider>
      <I18nextProvider i18n={i18next}>
        <MemoryRouter initialEntries={[routesPath]}>{ui}</MemoryRouter>
      </I18nextProvider>
    </AppProvider>,
    renderOptions,
  );
};
export * from "@testing-library/react";

export { customRender as render };
