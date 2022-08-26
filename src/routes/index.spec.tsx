import React from "react";
import { render } from "tests/utils";

import Routes from ".";

import { routes } from "./routes";

jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom");

  return {
    __esModule: true,
    ...originalModule,
    useParams: jest.fn(),
    useHistory: jest.fn(),
  };
});

describe("PageSuccess:", () => {
  it("should render component", async () => {
    render(<Routes />, {});
    expect(routes).toStrictEqual(routes);
  });
});
