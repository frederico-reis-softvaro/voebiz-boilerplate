import React from "react";
import { screen, render, waitFor } from "src/tests/utils";
import userEvent from "@testing-library/user-event";

import ModalItemList, { IItem } from ".";

const mockedFn = jest.fn();
const mockedList: IItem[] = [
  {
    id: "test",
    labelId: "test",
    key: "123",
    onClick: mockedFn,
    label: "Test Label",
    href: "testlink.com",
    disabled: false,
    value: "",
  },
];

describe("<ModalItemList />", () => {
  it("should render component", async () => {
    render(<ModalItemList list={mockedList} />, {});
    const inputFieldPassword = screen.getByText("Test Label");
    expect(inputFieldPassword).toBeInTheDocument();
  });
  it("should't render component", async () => {
    const noLabelStub = [
      {
        id: "test",
        labelId: "test",
        key: "123",
        onClick: jest.fn(),
        label: undefined,
        href: "testlink.com",
        disabled: false,
        value: "",
      },
    ];
    render(<ModalItemList list={noLabelStub} />, {});
    const inputFieldPassword = screen.getByTestId("modal-list");
    expect(inputFieldPassword).toBeInTheDocument();
  });
  it("should run action on click in component", async () => {
    render(<ModalItemList list={mockedList} />, {});
    const inputFieldPassword = screen.getByText("Test Label");
    expect(inputFieldPassword).toBeInTheDocument();

    userEvent.click(inputFieldPassword);
    await waitFor(() => expect(mockedFn).toBeCalled());
  });
  it("should run action on click and disabled is true in component", async () => {
    const disabledStub = [
      {
        id: "test",
        labelId: "test",
        key: "123",
        onClick: undefined,
        label: "Test Label",
        href: "testlink.com",
        disabled: false,
        value: "",
      },
    ];
    render(<ModalItemList list={disabledStub} />, {});
    const inputFieldPassword = screen.getByText("Test Label");
    expect(inputFieldPassword).toBeInTheDocument();

    userEvent.click(inputFieldPassword);
    await waitFor(() => expect(mockedFn).toBeCalled());
  });
});
