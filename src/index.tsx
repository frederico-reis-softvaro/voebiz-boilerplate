import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

class WebComponent extends HTMLElement {
  connectedCallback() {
    ReactDOM.render(<App />, this);
  }
}

const ELEMENT_ID = "voebiz-boilerplate";

if (!customElements.get(ELEMENT_ID)) {
  customElements.define(ELEMENT_ID, WebComponent);
}
