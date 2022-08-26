import React from "react";
import { screen, render, waitFor } from "tests/utils";
import userEvent from "@testing-library/user-event";

import EmptyHeader from ".";

describe("<EmptyHeader />", () => {
  it("should render component", async () => {
    render(<EmptyHeader />, {});
  });
});
