import React from "react";
import { screen, render, waitFor } from "src/tests/utils";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import userEvent from "@testing-library/user-event";
import * as userStub from "src/tests/mocks/mockUseUser.json";
import * as mockList from "src/tests/mocks/mockGetList.json";
import * as mockGetListOfValues from "src/services/listOfValues";
import * as mockValidateEmail from "src/services/validateEmail";
import * as mockValidateCPF from "src/services/validateCPF";
import * as mockCreateMember from "src/services/createMember";
import { cpf } from "cpf-cnpj-validator";

import * as mockUseUser from "../../../context/UserContext";

import Admin from ".";

jest.setTimeout(10000);

jest.mock("launchdarkly-react-client-sdk", () => ({
  __esModule: true,
  useFlags: () => ({
    apiDomain: "value",
  }),
}));

const validatedResponse = {
  status: 200,
  data: { message: "Validacao ok" },
  headers: { "x-smiles-token": "THISISTOKENSMILES" },
};

const history = createMemoryHistory();

describe("Admin:", () => {
  beforeEach(() => {
    jest.spyOn(mockUseUser, "useUser").mockReturnValue({
      data: {
        ...userStub,
        documentList: [
          {
            type: "CNPJ",
            number: "56.447.134/0001-00",
            preferential: true,
          },
          {
            type: "CPF",
            number: "",
            preferential: false,
          },
        ],
        electronicAddressList: [
          {
            type: "Business",
            preferential: true,
            address: "",
          },
        ],
        phoneList: [
          {
            type: "CELLPHONE",
            verified: true,
            internationalCode: 0,
            areaCode: "",
            number: "",
          },
          {
            type: "Work",
            verified: false,
            internationalCode: 0,
            areaCode: "",
            number: "",
          },
        ],
      },
      handler: jest.fn(),
    });
    jest.spyOn(mockGetListOfValues, "getListOfValues").mockResolvedValue(mockList);
    jest.spyOn(mockValidateEmail, "validateEmail").mockResolvedValue(validatedResponse);
    jest.spyOn(mockValidateCPF, "validateCPF").mockResolvedValue(validatedResponse);
    jest.spyOn(mockCreateMember, "createMember").mockResolvedValue(validatedResponse);
    jest.spyOn(cpf, "isValid").mockReturnValue(true);
    render(
      <Router history={history}>
        <Admin />
      </Router>,
      { route: "/cadastro" },
    );
  });

  it("should render component", async () => {
    const cpfInput = screen.getByRole("textbox", {
      name: /cpf/i,
    });
    userEvent.type(cpfInput, "04142835033");
    await waitFor(() => {
      expect(cpfInput).toHaveDisplayValue("041.428.350-33");
    });

    const completeName = screen.getByRole("textbox", {
      name: /nome completo/i,
    });
    expect(completeName).toHaveValue(userStub.adminName);
    userEvent.clear(completeName);
    userEvent.type(completeName, "Pedro Azevedo");
    await waitFor(() => {
      expect(completeName).toHaveDisplayValue("Pedro Azevedo");
    });

    const occupation = screen.getByPlaceholderText("Escolha uma opção");
    userEvent.type(occupation, "Presidência");
    await waitFor(() => {
      expect(occupation).toHaveDisplayValue("Presidência");
    });

    const emailInput = screen.getByRole("textbox", {
      name: /e-mail/i,
    });
    userEvent.type(emailInput, "teste@email.com");
    expect(emailInput).toHaveDisplayValue("teste@email.com");

    userEvent.type(
      screen.getByRole("textbox", {
        name: /telefone 1/i,
      }),
      "21972362574",
    );

    userEvent.type(
      screen.getByRole("textbox", {
        name: /telefone 2/i,
      }),
      "21972362574",
    );
    await waitFor(() => {
      expect(
        screen.getByRole("textbox", {
          name: /telefone 1/i,
        }),
      ).toHaveDisplayValue("(21) 97236-2574");

      expect(
        screen.getByRole("textbox", {
          name: /telefone 2/i,
        }),
      ).toHaveDisplayValue("(21) 97236-2574");
    });

    const passwordInput = screen.getByPlaceholderText(/digite sua senha/i);
    userEvent.type(passwordInput, "4*^4p@Msea");

    const confirmPasswordInput = screen.getByPlaceholderText(/confirme sua senha/i);
    userEvent.type(confirmPasswordInput, "4*^4p@Msea");

    const checkbox = screen.getByRole("checkbox");
    userEvent.click(checkbox);

    await waitFor(() => {
      expect(checkbox).toBeChecked();
    });

    const submitButton = screen.getByText("Continuar");
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeEnabled();
    userEvent.click(submitButton);

    await waitFor(() => {
      expect(history.location.pathname).toBe("/cadastro/processando");
    });
  });
});
