import React from "react";
import { screen, render, waitFor } from "tests/utils";
import userEvent from "@testing-library/user-event";

import { VoebizInputPassword } from ".";

const mockFn = jest.fn();

describe("<VoebizInputPassword />", () => {
  it("should render component", async () => {
    render(<VoebizInputPassword textLabel="password" onBlur={mockFn} onChange={mockFn} />, {});
    const inputFieldPassword = screen.getByTestId("password");
    expect(inputFieldPassword).toBeInTheDocument();

    userEvent.type(inputFieldPassword, "Teste1234560$$");
    await waitFor(() => {
      expect(inputFieldPassword).toHaveValue("Teste1234560$$");
      expect(mockFn).toBeCalled();
    });
  });
  it("should render component without some props ", async () => {
    render(<VoebizInputPassword onBlur={mockFn} onChange={mockFn} />, {});
  });
  it("should render component without some props ", async () => {
    render(<VoebizInputPassword onBlur={mockFn} onChange={mockFn} placeholder="placeholder de teste" />, {});
    const inputFieldPassword = screen.getByPlaceholderText(/placeholder de teste/i);
    expect(inputFieldPassword).toBeInTheDocument();
    await waitFor(() => {
      userEvent.type(inputFieldPassword, "Teste1234560$$");
    });
    await waitFor(() => {
      userEvent.click(document.body);
    });
  });
  it("should show password after clicking in eye icon  ", async () => {
    render(<VoebizInputPassword />, {});
    const eyeIcon = screen.getByText(//i);
    expect(eyeIcon).toBeInTheDocument();
    await waitFor(() => {
      userEvent.click(eyeIcon);
    });
  });
});
