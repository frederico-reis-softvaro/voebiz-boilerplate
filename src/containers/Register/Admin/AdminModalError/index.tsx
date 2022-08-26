import React, { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import { ModalError } from "../../../../components";

interface AdminModalErrorProps {
  isOpen: boolean;
  onClosed: () => void;
  errorType: string;
}

const AdminModalError: FC<AdminModalErrorProps> = ({ isOpen, onClosed, errorType }) => {
  const history = useHistory();
  const { t } = useTranslation("register_admin");
  const getError = () => {
    interface IerrorsList {
      [key: string]: any;
    }
    const errorsList: IerrorsList = {
      already_registered_CNPJ_error: {
        errorTitle: t("already_registered_CNPJ_error"),
        errorMsg: t("already_registered_CNPJ_description"),
        onClickSecondary: () => history.push("/login"),
        btnTextPrimary: t("try_again"),
        btnTextSecondary: t("access_account_link"),
        btnIdSecondary: "btn_enterMyAccount",
      },
      renew_session_error: {
        errorTitle: t("renew_session_error"),
        errorMsg: t("renew_session_description"),
        onClickSecondary: () => history.push("/"),
        btnTextPrimary: t("renew_session"),
        btnTextSecondary: t("exit"),
        btnIdSecondary: "btn_enterMyAccount",
      },
      unable_to_access_account_error: {
        errorTitle: t("unable_to_access_account_error"),
        errorMsg: t("unable_to_access_account_description"),
        onClickSecondary: () => history.push("/login"),
        btnTextPrimary: t("try_again"),
        btnTextSecondary: t("exit"),
        btnIdSecondary: "btn_enterMyAccount",
      },
      already_registered_email_error: {
        errorTitle: t("already_registered_email_error"),
        errorMsg: t("already_registered_email_description"),
        onClickSecondary: () => history.push("/login"),
        btnTextPrimary: t("try_again"),
        btnTextSecondary: t("access_my_account"),
        btnIdSecondary: "btn_enterMyAccount",
      },
      already_registered_CPF_error: {
        errorTitle: t("already_registered_CPF_error"),
        errorMsg: t("already_registered_CPF_description"),
        onClickSecondary: () => history.push("/login"),
        btnTextPrimary: t("try_again"),
        btnTextSecondary: t("access_my_account"),
        btnIdSecondary: "btn_enterMyAccount",
      },
      generic_error: {
        errorTitle: t("generic_error"),
        errorMsg: t("generic_error_description"),
        btnTextPrimary: t("try_again"),
      },
    };

    return {
      idTitle: "lbl_titleCnpjExisting",
      idMessage: "lbl_msgInformativeCnpjExisting_1",
      handleCloseModal: () => onClosed(),
      onClickPrimary: () => onClosed(),
      btnPrimaryColor: "primary",
      btnIdPrimary: "btn_retrievePassword",
      ...errorsList[errorType],
    };
  };

  const modalErrorData = useMemo(() => getError(), [errorType]);

  return (
    <ModalError
      {...modalErrorData}
      isOpen={isOpen}
      onClosed={onClosed}
      btnPrimaryColor={
        modalErrorData.btnPrimaryColor && modalErrorData.btnPrimaryColor === "secondary" ? "secondary" : "primary"
      }
    />
  );
};

export default AdminModalError;
