import React, { useEffect, useState, useMemo } from "react";
import { SmlsModal, SmlsLoadingLogo } from "@smiles/smiles-ui-kit-react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useFlags } from "launchdarkly-react-client-sdk";

import { useUser } from "../../../context/UserContext";

import { ModalError } from "../../../components";

import { createMember } from "../../../services/createMember";

const Loader = () => {
  const ldFlags = useFlags();
  const { data } = useUser();
  const history = useHistory();
  const path = "/cadastro";

  const { t } = useTranslation("register_admin");

  const [error, setError] = useState([""]);
  const [isError, setIsError] = useState(false);

  const createMemberService = async () => {
    const newMember = { ...data };
    delete newMember.smilesToken;
    delete newMember.adminName;
    delete newMember.phoneNumber1;
    delete newMember.phoneNumber2;
    delete newMember.cnpj;
    delete newMember.apiDomain;

    const { apiDomain } = ldFlags;
    const smlToken = data.smilesToken;

    const createMemberServiceResponse = await createMember(newMember, smlToken, apiDomain);
    if (createMemberServiceResponse.status === 200) {
      history.push(`${path}/sucesso`);
    }
    if (createMemberServiceResponse.response.status === 500) {
      setIsError(true);
    }
    if (createMemberServiceResponse.response.status === 401) {
      const errorMessage = createMemberServiceResponse.response.data.data.user_message;
      if (errorMessage === "Este CNPJ ja existe dentro da base") {
        setIsError(true);
      }
      if (errorMessage === "Este CPF ja existe dentro da base") {
        setIsError(true);
      }
      if (errorMessage === "Este EMAIL ja existe dentro da base") {
        setIsError(true);
      }
      if (errorMessage === "Esta faltando token") {
        setIsError(true);
      }
      if (errorMessage === "Token invalido") {
        setIsError(true);
      }
      setIsError(true);
    }
    setIsError(true);
  };

  const getError = () => {
    return {
      errorTitle: t("generic_error"),
      idTitle: "lbl_titleCnpjExisting",
      errorMsg: t("generic_error_description"),
      idMessage: "lbl_msgInformativeCnpjExisting_1",
      handleCloseModal: () => {
        history.push(`${path}/admin`);
      },
      onClickPrimary: () => {
        history.push(`${path}/admin`);
      },
      btnTextPrimary: t("try_again"),
      btnPrimaryColor: "primary",
      btnIdPrimary: "btn_retrievePassword",
    };
  };
  const modalErrorData = useMemo(() => getError(), [error]);

  useEffect(() => {
    createMemberService();
  }, []);
  return (
    <>
      <SmlsModal
        hideHeader
        className="LoadingModal"
        desktopSize="big"
        contentClassName="LoadingModal_content"
        modalColor="light"
        id="idLoading"
        type="full"
        isOpen
      >
        <div className="LoadingModal_wrapper">
          <div className="LoadingModal_wrapper_loader">
            <SmlsLoadingLogo id="loader" />
          </div>
          <span className="LoadingModal_wrapper_text-loading">Um momento </span>
        </div>
      </SmlsModal>
      <ModalError
        isOpen={isError}
        idTitle={modalErrorData.idTitle}
        errorTitle={modalErrorData.errorTitle}
        idMessage={modalErrorData.idMessage}
        errorMsg={modalErrorData.errorMsg}
        handleCloseModal={modalErrorData.handleCloseModal}
        btnIdPrimary={modalErrorData.btnIdPrimary}
        btnPrimaryColor={
          modalErrorData.btnPrimaryColor && modalErrorData.btnPrimaryColor === "secondary" ? "secondary" : "primary"
        }
        btnTextPrimary={modalErrorData.btnTextPrimary}
        onClickPrimary={modalErrorData.onClickPrimary}
        onClosed={() => {
          setError([""]);
        }}
      />
    </>
  );
};

export default Loader;
