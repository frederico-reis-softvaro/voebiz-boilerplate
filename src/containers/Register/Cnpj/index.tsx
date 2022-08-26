import React, { useState, useCallback, useMemo } from "react";
import { Link, useHistory } from "react-router-dom";
import { useFlags } from "launchdarkly-react-client-sdk";
import { useTranslation } from "react-i18next";
import { SmlsButton, SmlsInputText } from "@smiles/smiles-ui-kit-react";
import { cnpj } from "cpf-cnpj-validator";
import ReCAPTCHA from "react-google-recaptcha";

import { useUser } from "../../../context/UserContext";

import { RegisterContent, ModalError } from "../../../components";

import { validateCNPJ } from "../../../services/validateCNPJ";

import { removeMask } from "../../../utils/documentUtils";

const Cnpj: React.FC = () => {
  const ldFlags = useFlags();
  const { data, handler } = useUser();
  const [document, setDocument] = useState("");
  const [error, setError] = useState([""]);
  const [errorType, setErrorType] = useState("generic");
  const [isError, setIsError] = useState(false);
  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [recaptchaValue, setRecaptchaValue] = useState("");
  const history = useHistory();
  const { t } = useTranslation("cnpj");
  const path = "/cadastro";
  const handleChangeDocument = (e: React.ChangeEvent<HTMLInputElement>) => {
    const doc = e.target.value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1");
    setDocument(doc);
    setRecaptchaValue("");
  };
  const validateCnpjFormat = useCallback(() => {
    const result = cnpj.isValid(document);
    setValidated(result);
    return result;
  }, [document]);
  const getError = () => {
    if (errorType === "already_registered_CNPJ_error") {
      return {
        errorTitle: t("already_registered_CNPJ_error"),
        idTitle: "lbl_titleCnpjExisting",
        errorMsg: t("already_registered_CNPJ_description"),
        idMessage: "lbl_msgInformativeCnpjExisting_1",
        handleCloseModal: () => {
          setIsError(false);
        },
        onClickPrimary: () => {
          setIsError(false);
        },
        onClickSecondary: () => {
          history.push("/login");
        },
        btnTextPrimary: t("try_again"),
        btnPrimaryColor: "primary",
        btnTextSecondary: t("access_account_link"),
        btnIdPrimary: "btn_retrievePassword",
        btnIdSecondary: "btn_enterMyAccount",
      };
    }
    return {
      errorTitle: t("generic_error"),
      idTitle: "lbl_titleCnpjExisting",
      errorMsg: t("generic_error_description"),
      idMessage: "lbl_msgInformativeCnpjExisting_1",
      handleCloseModal: () => {
        setIsError(false);
      },
      onClickPrimary: () => {
        setIsError(false);
      },
      btnTextPrimary: t("try_to_register"),
      btnPrimaryColor: "primary",
      btnIdPrimary: "btn_retrievePassword",
    };
  };
  const modalErrorData = useMemo(() => getError(), [error]);

  const handleContinue = async () => {
    setIsLoading(true);
    const documentValue = removeMask(document);
    const strDocType = "CNPJ";
    const recResponse = recaptchaValue;
    const { apiDomain } = ldFlags;
    let validateDocumentsResponse;

    try {
      validateDocumentsResponse = await validateCNPJ(strDocType, documentValue, recResponse, apiDomain);
      if (validateDocumentsResponse === 401) {
        throw new Error("generic");
      }
      if (validateDocumentsResponse === 402) {
        throw new Error("already_registered_CNPJ");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorType(err.message);
        setIsError(true);
        setDocument("");
      }
    }

    handler({
      ...data,
      apiDomain,
      documentList: [
        {
          type: "CNPJ",
          preferential: true,
          number: document,
        },
        {
          type: "CPF",
          preferential: false,
          number: "",
        },
        {
          type: "RG",
          preferential: false,
          number: "",
        },
      ],
      smilesToken: validateDocumentsResponse.headers[`x-smiles-token`],
    });
    setIsLoading(false);
    history.push(`${path}/empresa`);
  };

  return (
    <>
      <form className="smls-lf smls-cpf" onSubmit={handleContinue}>
        <div className="voebiz-register-cnpj voebiz-register-cnpj-section-1">
          <h3 className="voebiz-title-wrapper" id="lbl_titleCnpj">
            {t("title")}
          </h3>
          <div className="voebiz-content-wrapper">
            <RegisterContent idMessage="lbl_msgInformativeCnpj_1" text={t("description")} label={t("label")}>
              <div className="voebiz-cnpj">
                <div className="voebiz-cnpj_form_fadeIn-late">
                  <SmlsInputText
                    id="inp_cnpj"
                    data-testid="inp_cnpj"
                    placeholder="Digite o CNPJ"
                    onChange={handleChangeDocument}
                    value={document}
                    maxLength={18}
                    validate={validateCnpjFormat}
                    errorMessage="O CNPJ informado não é válido. Por favor, tente de novo."
                    inputMode="numeric"
                    regex={/[^0-9./-]/gi}
                  />
                </div>
                <div className={`voebiz-cnpj_form_fadeIn-latest recaptcha ${!validated && "disabled"}`}>
                  {validated && ldFlags.recaptchaSiteKey && (
                    <ReCAPTCHA
                      data-testid="recaptcha"
                      onExpired={() => {
                        setRecaptchaValue("");
                      }}
                      sitekey={ldFlags.recaptchaSiteKey}
                      onChange={(value) => {
                        setRecaptchaValue(value || "");
                      }}
                    />
                  )}
                </div>
                <div className="voebiz-cnpj_form_row fadeIn-latest">
                  <SmlsButton
                    id="continueRegistration"
                    className="voebiz-cnpj_form_row_button"
                    color="primary"
                    text={t("continue_register")}
                    onClick={handleContinue}
                    onMouseDown={handleContinue}
                    isLoading={isLoading}
                    disabled={!validated ? true : recaptchaValue === ""}
                  />
                  <div className="voebiz-cnpj_form_row_acess-account">
                    <span className="voebiz-cnpj_form_row_acess-account_text">{t("access_account")}</span>
                    <Link className="voebiz-cnpj_form_row_acess-account_link" to="/login">
                      {t("access_account_link")}
                    </Link>
                  </div>
                </div>
              </div>
            </RegisterContent>
          </div>
        </div>
        <ModalError
          {...modalErrorData}
          isOpen={isError}
          onClosed={() => {
            setDocument("");
            setError([""]);
          }}
          btnPrimaryColor={
            modalErrorData.btnPrimaryColor && modalErrorData.btnPrimaryColor === "secondary" ? "secondary" : "primary"
          }
        />
      </form>
    </>
  );
};
export default Cnpj;
