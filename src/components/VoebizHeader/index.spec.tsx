import React from "react";
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { VoebizHeader } from ".";

import { IHeader } from "./types";

describe("Header", () => {
  const mockProps: IHeader = {
    id: "header-id",
    steps: ["Page 1", "Page 2"],
    active: 1,
    shadow: true,
    progress: 0,
    onNavClick: jest.fn(),
  };

  it("Should renders correctly", () => {
    const { container } = render(<VoebizHeader {...mockProps} />);
    expect(container).toBeInTheDocument();
  });

  it("should be able receive a steps property", () => {
    const steps = ["Step 1", "Step 2"];
    const { getByRole } = render(<VoebizHeader {...mockProps} steps={steps} />);

    steps.forEach((step) => {
      const liElement = getByRole("link", { name: step });
      expect(liElement).toBeInTheDocument();
    });
  });

  it("should be able receive an active property", () => {
    const active = 1;
    const { getByRole } = render(<VoebizHeader {...mockProps} active={active} />);

    const liAboutElement = getByRole("button", { name: /Page 2/i });
    expect(liAboutElement).toBeInTheDocument();
  });

  describe("should be able receive a shadow property", () => {
    it("default", () => {
      const { container } = render(<VoebizHeader {...mockProps} shadow={false} />);

      expect(container.getElementsByClassName("shadow")).toHaveLength(0);
    });

    it("with a value", () => {
      const { container } = render(<VoebizHeader {...mockProps} shadow />);

      expect(container.getElementsByClassName("shadow")).toHaveLength(1);
    });
  });

  it("should be able receive an progress property", () => {
    const progress = 75;
    const { container } = render(<VoebizHeader {...mockProps} progress={progress} />);

    const shadowClass = container.getElementsByClassName("progress")[0];
    expect(shadowClass.children[0]).toHaveStyle({
      width: "75%",
    });
  });

  it("should render progress with some width even when progress is undefined", () => {
    const progress = undefined;
    const { container } = render(<VoebizHeader {...mockProps} progress={progress} active={0} />);

    const shadowClass = container.getElementsByClassName("progress")[0];
    expect(shadowClass.children[0]).toHaveStyle({
      width: "50%",
    });
  });

  it("should be able receive an desktop onNavClick property", () => {
    const onNavClick = jest.fn();
    const { getByRole } = render(<VoebizHeader {...mockProps} onNavClick={onNavClick} />);

    const menuElement = getByRole("menuitem", { name: "Page 1" });
    userEvent.click(menuElement);

    expect(menuElement).toBeInTheDocument();
    expect(onNavClick).toBeCalledTimes(1);
  });

  it("should be able receive an mobile onNavClick property", () => {
    waitFor(() => {
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 600,
      });

      window.dispatchEvent(new Event("resize"));
    });

    const onNavClick = jest.fn();
    const { getByRole } = render(<VoebizHeader {...mockProps} onNavClick={onNavClick} />);

    const menuElement = getByRole("menuitem", { name: "Page 1" });
    userEvent.click(menuElement);

    expect(menuElement).toBeInTheDocument();
    expect(onNavClick).toBeCalledTimes(1);
  });

  it("should be able to click on the steps", () => {
    const onNavClick = jest.fn();
    const steps = ["Step 1", "Step 2"];
    const { getByRole } = render(<VoebizHeader {...mockProps} onNavClick={onNavClick} steps={steps} active={2} />);

    const step1 = getByRole("link", { name: /step 1/i });
    const step2 = getByRole("link", { name: /step 2/i });

    userEvent.click(step1);
    expect(onNavClick).toHaveBeenCalledWith(1);

    userEvent.click(step2);
    expect(onNavClick).toHaveBeenCalledWith(2);

    expect(onNavClick).toBeCalledTimes(2);
  });
});
