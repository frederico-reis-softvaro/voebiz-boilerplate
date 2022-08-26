import React from "react";
import { render, screen, waitFor } from "src/tests/utils";
import Company from "src/containers/Register/Company";
import userEvent from "@testing-library/user-event";
import * as mockList from "src/tests/mocks/mockGetList.json";
import * as mockedData from "src/tests/mocks/mockUseUser.json";

import * as mockUseUser from "src/context/UserContext";

import * as mockGetListOfValues from "src/services/listOfValues";
import * as mockGetCheckZipCode from "src/services/checkZipCode";

const mockHistoryPush = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

const stubAddress = {
  StreetName: "Avenida Paulista",
  City: "São Paulo",
  State: "SP",
  Country: "Brazil",
  ErrorDesc: "Success",
};

describe("Company:", () => {
  beforeEach(() => {
    jest.spyOn(mockUseUser, "useUser").mockReturnValue({
      data: {
        ...mockedData,
        organizationName: "",
        fantasyName: "",
        addressList: {
          ...mockedData.addressList,
          zipCode: "",
          streetAddressNumber: "",
          complement: "",
          streetAddress: "",
          city: "",
          state: "",
        },
      },
      handler: jest.fn(),
    });
    jest.spyOn(mockGetListOfValues, "getListOfValues").mockResolvedValue(mockList);
    jest.spyOn(mockGetCheckZipCode, "checkZipCode").mockResolvedValue(stubAddress);
  });
  it("should render the company form", async () => {
    render(<Company />, {});

    const title = screen.getByRole("heading", { name: /quais os dados da sua empresa\?/i });
    expect(title).toBeInTheDocument();
  });
  it("should render options", async () => {
    render(<Company />, {});
    jest.spyOn(mockGetCheckZipCode, "checkZipCode").mockResolvedValue(stubAddress);

    const cnpjInput = screen.getByRole("textbox", {
      name: /cnpj/i,
    });
    expect(cnpjInput).toHaveDisplayValue("56.447.134/0001-00");

    const organizationNameInput = screen.getByRole("textbox", {
      name: /razão social/i,
    });
    expect(organizationNameInput).toBeInTheDocument();
    userEvent.type(organizationNameInput, "Gol Milhas S.A LTDA");
    await waitFor(() => {
      expect(organizationNameInput).toHaveValue("Gol Milhas S.A LTDA");
    });

    const fantasyNameInput = screen.getByRole("textbox", { name: /nome fantasia/i });
    expect(fantasyNameInput).toBeInTheDocument();
    userEvent.type(fantasyNameInput, "Nome Fantasia");
    await waitFor(() => {
      expect(fantasyNameInput).toHaveValue("Nome Fantasia");
    });

    const cepInput = screen.getByRole("textbox", { name: /cep/i });
    expect(cepInput).toBeInTheDocument();
    userEvent.type(cepInput, "21.210-153");
    await waitFor(() => {
      expect(cepInput).toHaveValue("21.210-153");
    });

    const addressNumberInput = screen.getByRole("textbox", { name: /número/i });
    expect(addressNumberInput).toBeInTheDocument();
    userEvent.type(addressNumberInput, "13");
    await waitFor(() => {
      expect(addressNumberInput).toHaveValue("13");
    });

    const addressExtraInfoInput = screen.getByRole("textbox", { name: /complemento/i });
    expect(addressExtraInfoInput).toBeInTheDocument();
    userEvent.type(addressExtraInfoInput, "bloco 2 apt 404");
    await waitFor(() => {
      expect(addressExtraInfoInput).toHaveValue("bloco 2 apt 404");
    });
  });
  it("should complete address after zipcode input", async () => {
    render(<Company />, {});
    const zipCodeInput = screen.getByRole("textbox", { name: /cep/i });
    const stateInput = screen.getByRole("textbox", { name: /estado/i });
    const cityInput = screen.getByRole("textbox", { name: /cidade/i });
    const complementInput = screen.getByRole("textbox", { name: /complemento/i });
    const addressInput = screen.getByRole("textbox", { name: /endereço/i });
    const numberInput = screen.getByRole("textbox", {
      name: /número/i,
    });

    expect(zipCodeInput).toBeInTheDocument();
    expect(stateInput).toBeInTheDocument();
    expect(cityInput).toBeInTheDocument();
    expect(addressInput).toBeInTheDocument();
    expect(numberInput).toBeInTheDocument();

    userEvent.type(zipCodeInput, "21210153");
    await waitFor(() => {
      expect(zipCodeInput).toHaveValue("21.210-153");
      expect(stateInput).toHaveValue("SP");
      expect(cityInput).toHaveValue("São Paulo");
      expect(addressInput).toHaveValue("Avenida Paulista");
    });

    userEvent.type(numberInput, "13");
    userEvent.type(complementInput, "apto 1301");

    await waitFor(() => {
      expect(numberInput).toHaveValue("13");
      expect(complementInput).toHaveValue("apto 1301");
    });
  });
});
