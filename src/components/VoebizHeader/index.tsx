import React, { useState } from "react";
import { Navbar, NavItem, NavLink, Progress, Dropdown, DropdownToggle, DropdownItem } from "reactstrap";

import { IHeader } from "./types";

export const VoebizHeader = ({ id, steps, active, shadow = true, progress, onNavClick = () => undefined }: IHeader) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const getProgress = () => {
    if (!progress && progress !== 0) {
      return ((active + 1) / steps.length) * 100;
    }
    return progress;
  };

  return (
    <div id={id} className="navbar-container">
      <Navbar className={`navbar-expand-lg ${shadow ? "shadow" : ""}`}>
        <Dropdown isOpen={isOpen} toggle={() => setIsOpen((prevState) => !prevState)}>
          <DropdownToggle>{steps[active]}</DropdownToggle>

          <div className="dropdown-menu">
            {steps.map((step, i) => (
              <DropdownItem key={step} onClick={() => onNavClick(i)}>
                {step}
              </DropdownItem>
            ))}
          </div>
        </Dropdown>

        <div className="steps">
          <div className="full-progress-bar">
            <span className="circleOrange">1</span>
            {steps.length > 1 && (
              <div className="progress">
                <Progress bar value={getProgress()} />
              </div>
            )}
            <span className={active === 1 ? "circleGray" : "circleOrange"}>2</span>
          </div>

          <ul className="navbar-nav">
            <NavItem key={1} onClick={() => onNavClick(1)}>
              <NavLink className={active === 1 ? "" : "hide-mobile"} href="#">
                {steps[0]}
              </NavLink>
            </NavItem>
            <NavItem key={2} onClick={() => onNavClick(2)}>
              <NavLink className={active === 2 ? "" : "hide-mobile"} href="#">
                {steps[1]}
              </NavLink>
            </NavItem>
          </ul>
        </div>
      </Navbar>
    </div>
  );
};
