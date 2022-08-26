import React from "react";
import { SmlsModal, SmlsButton } from "@smiles/smiles-ui-kit-react";
import { ModalHeader, ModalBody } from "reactstrap";

type BtnPrimaryColorType = "primary" | "secondary" | "hyperlink" | "pills";
interface ModalErrorInterface {
  id?: string;
  isOpen?: boolean;
  errorTitle?: string;
  idTitle?: string;
  errorMsg?: string;
  idMessage?: string;
  handleCloseModal?: (e: React.MouseEvent) => void;
  onClickPrimary?: (e: React.MouseEvent | React.FormEvent) => void;
  onClickSecondary?: (e: React.MouseEvent) => void;
  onClosed?: () => void;
  btnTextPrimary?: string;
  btnTextSecondary?: string;
  btnIdPrimary?: string;
  btnPrimaryColor?: BtnPrimaryColorType;
  btnIdSecondary?: string;
  labelIdPrimary?: string;
  labelIdSecondary?: string;
}

const ModalError: React.FC<ModalErrorInterface> = ({
  id = "",
  isOpen,
  errorTitle = "",
  idTitle,
  errorMsg = "",
  idMessage,
  handleCloseModal,
  onClickPrimary,
  onClickSecondary,
  btnTextPrimary = "",
  btnPrimaryColor = "primary",
  btnTextSecondary = "",
  btnIdPrimary,
  btnIdSecondary,
}) => {
  return (
    <SmlsModal
      id={id}
      isOpen={isOpen}
      type="right"
      defaultHeader={false}
      className="smls-register-error-modal"
      toggle={handleCloseModal}
    >
      <ModalHeader>
        <button
          id="btn_close"
          type="button"
          className="smls-btn-close"
          data-dismiss="modal"
          aria-label="Close"
          onClick={handleCloseModal}
        >
          <i className="material-icons">&#xe5cd;</i>
        </button>
      </ModalHeader>

      <ModalBody>
        <div className="smls-modal-header">
          <h4 id={idTitle}>{errorTitle}</h4>
        </div>
        <div className="smls-modal-text">
          <p id={idMessage}>{errorMsg}</p>
        </div>
        <form onSubmit={onClickPrimary}>
          <SmlsButton
            id={btnIdPrimary}
            className="smls-register-cpf"
            color={btnPrimaryColor}
            text={btnTextPrimary}
            onClick={onClickPrimary}
          />
          {btnIdSecondary && (
            <SmlsButton
              id={btnIdSecondary}
              className="smls-register-hyperlink"
              color="hyperlink"
              text={btnTextSecondary}
              onClick={onClickSecondary}
            />
          )}
        </form>
      </ModalBody>
    </SmlsModal>
  );
};

export default ModalError;
