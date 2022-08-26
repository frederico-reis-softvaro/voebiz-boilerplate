import React from "react";
import { render, screen } from "src/tests/utils";

import PageSuccess from ".";

const mockHistoryPush = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe("PageSuccess:", () => {
  it("should render component", async () => {
    render(<PageSuccess />, {});
    const title = screen.getByText(/Recebemos as informações da sua empresa!/);
    expect(title).toBeInTheDocument();
  });
});
