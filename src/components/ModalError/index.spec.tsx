import React from "react";
import { screen, render } from "src/tests/utils";

import ModalError from ".";

describe("<ModalError />", () => {
  it("should render component", async () => {
    const { container } = render(<ModalError isOpen btnTextPrimary="Test" />, {});
    expect(screen.getByText("Test")).toBeInTheDocument();
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div
        class="smls-register-error-modal modal fade show redesign backdrop trap"
        id=""
        role="dialog"
        style="z-index: 1050; display: block;"
        tabindex="-1"
      >
        <div
          class="modal-dialog right small"
        >
          <div
            class="modal-content light"
          >
            <div
              class="modal-header"
            >
              <h5
                class="modal-title"
              >
                <button
                  aria-label="Close"
                  class="smls-btn-close"
                  data-dismiss="modal"
                  id="btn_close"
                  type="button"
                >
                  <i
                    class="material-icons"
                  >
                    
                  </i>
                </button>
              </h5>
            </div>
            <div
              class="modal-body"
            >
              <div
                class="smls-modal-header"
              >
                <h4 />
              </div>
              <div
                class="smls-modal-text"
              >
                <p />
              </div>
              <form>
                <button
                  class="smls-register-cpf animation btn btn-primary"
                  text="Test"
                  type="button"
                >
                  <span
                    tabindex="-1"
                  >
                    Test
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    `);
  });
});
