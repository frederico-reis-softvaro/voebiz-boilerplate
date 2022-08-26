import React from "react";
import { screen, render, waitFor } from "src/tests/utils";
import userEvent from "@testing-library/user-event";

import RegisterContent from ".";

const mockPathname = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    push: mockPathname,
  }),
}));

describe("<RegisterContent />", () => {
  it("should render component", async () => {
    render(<RegisterContent idMessage="123" text="Text test" label="Label Test" />, {});
    const testComponent = screen.getByText("Label Test");

    expect(testComponent).toBeInTheDocument();
  });
});
