import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { screen, render, waitFor } from "src/tests/utils";
import userEvent from "@testing-library/user-event";
import * as mockedData from "src/tests/mocks/mockUseUser.json";
import Cnpj from "src/containers/Register/Cnpj";
import { cnpj } from "cpf-cnpj-validator";

import * as mockUseUser from "src/context/UserContext";

import * as mockGetValidateCNPJ from "src/services/validateCNPJ";

const validateCNPJStub = {
  status: 200,
  data: { message: "Validacao ok" },
  headers: { "x-smiles-token": "THISISTOKENSMILES" },
};
const history = createMemoryHistory();

jest.mock("react-google-recaptcha", () => ({
  __esModule: true,
  default: ({ onChange }: any) => <input type="checkbox" data-testid="recaptcha" onChange={onChange} />,
}));

jest.mock("launchdarkly-react-client-sdk", () => ({
  __esModule: true,
  useFlags: () => ({
    recaptchaSiteKey: "value",
  }),
}));

describe("Cnpj:", () => {
  beforeEach(() => {
    jest.spyOn(mockUseUser, "useUser").mockReturnValue({
      data: {
        ...mockedData,
      },
      handler: jest.fn(),
    });
    render(
      <Router history={history}>
        <Cnpj />
      </Router>,
      { route: "/cadastro" },
    );
  });

  it("should render component", async () => {
    const title = screen.getByRole("heading", {
      name: /cadastrar empresa/i,
    });
    expect(title).toBeInTheDocument();
  });

  it("should render captcha when cnpj is valid", async () => {
    const cnpjInput = screen.getByRole("textbox");
    expect(cnpjInput).toBeInTheDocument();
    userEvent.type(cnpjInput, "56.447.134/0001-00");

    jest.spyOn(cnpj, "isValid").mockReturnValue(true);

    await waitFor(() => {
      expect(cnpjInput).toHaveValue("56.447.134/0001-00");
      expect(screen.getByTestId("recaptcha")).toBeInTheDocument();
    });
  });

  it("should show error when cnpj is invalid", async () => {
    const cnpjInput = screen.getByRole("textbox");
    userEvent.type(cnpjInput, "21.321.312/3131-31");

    jest.spyOn(cnpj, "isValid").mockReturnValue(false);

    await waitFor(() => {
      expect(screen.getByText(/O CNPJ informado não é válido. Por favor, tente de novo/i)).toBeInTheDocument();
    });
  });

  it("should redirect to /empresa when submitting", async () => {
    const cnpjInput = screen.getByRole("textbox");
    const submitButton = screen.getByRole("button", { name: /continuar/i });

    jest.spyOn(mockGetValidateCNPJ, "validateCNPJ").mockResolvedValue(validateCNPJStub);
    jest.spyOn(cnpj, "isValid").mockReturnValue(true);

    expect(submitButton).toBeDisabled();

    await userEvent.type(cnpjInput, "56.447.134/0001-00");
    expect(cnpjInput).toHaveValue("56.447.134/0001-00");

    await waitFor(() => {
      const captcha = screen.getByTestId("recaptcha");
      userEvent.click(captcha);
      expect(captcha).toBeChecked();
    });

    expect(submitButton).toBeEnabled();
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(history.location.pathname).toBe("/cadastro/empresa");
    });
  });

  it("should redirect to /login when the user precess in 'Acessar minha conta' link", async () => {
    const accessAccountLink = screen.getByRole("link", { name: /acessar minha conta/i });
    expect(accessAccountLink).toBeInTheDocument();

    userEvent.click(accessAccountLink);

    expect(history.location.pathname).toBe("/login");
  });
});
