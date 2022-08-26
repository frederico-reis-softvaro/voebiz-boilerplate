import React from "react";
import { render, screen } from "src/tests/utils";

import Loader from ".";

const mockHistoryPush = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe("<Loader/>", () => {
  it("should render component", async () => {
    render(<Loader />, {});
    const title = screen.getByText(/Um momento/);
    expect(title).toBeInTheDocument();
  });
});
