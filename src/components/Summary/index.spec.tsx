import React from "react";
import { screen, render } from "src/tests/utils";
import * as mockUseUserData from "src/tests/mocks/mockUseUser.json";
import userEvent from "@testing-library/user-event";

import * as mockUseUser from "src/context/UserContext";

import Summary from "src/components/Summary";

const mockFn = jest.fn();

describe("<Summary />", () => {
  beforeEach(() => {
    jest.spyOn(mockUseUser, "useUser").mockReturnValue({
      data: { ...mockUseUserData },
      handler: jest.fn(),
    });
  });
  it("should render component", async () => {
    render(<Summary handleClose={mockFn} onExit={mockFn} isOpen />, {});
    const inputFieldPassword = screen.getByText("Empresa");
    expect(inputFieldPassword).toBeInTheDocument();
  });
  it("should call function when closing", () => {
    const handleClose = jest.fn();
    const { getByRole } = render(<Summary handleClose={handleClose} onExit={mockFn} isOpen />, {});

    const btnClose = getByRole("button");

    userEvent.click(btnClose);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });
  it("should render address", () => {
    const { getByText } = render(<Summary handleClose={mockFn} onExit={mockFn} isOpen />, {});

    const { streetAddress, streetAddressNumber, complement, city, state, country } = mockUseUserData.addressList;

    const formattedAddress = `${streetAddress}, ${streetAddressNumber} - ${complement}, ${city} - ${state}, ${country}`;
    expect(getByText(formattedAddress)).toBeInTheDocument();
  });
  it("should render admin data", () => {
    const { getByText } = render(<Summary handleClose={mockFn} onExit={mockFn} isOpen />, {});
    const { adminName, occupation } = mockUseUserData;
    const cpf = mockUseUserData.documentList[1].number;
    const email = mockUseUserData.electronicAddressList[0].address;
    const [commercialPhone, mobilePhone] = mockUseUserData.phoneList;

    expect(getByText(adminName)).toBeInTheDocument();
    expect(getByText(cpf)).toBeInTheDocument();
    expect(getByText(occupation)).toBeInTheDocument();
    expect(getByText(email)).toBeInTheDocument();
    expect(getByText(`+55 (${commercialPhone.areaCode}) ${commercialPhone.number}`)).toBeInTheDocument();
    expect(getByText(`+55 (${mobilePhone.areaCode}) ${mobilePhone.number}`)).toBeInTheDocument();
  });
});
