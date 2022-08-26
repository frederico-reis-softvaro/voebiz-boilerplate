import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { SmlsButton } from "@smiles/smiles-ui-kit-react";
import { useHistory } from "react-router-dom";

import { useUser } from "../../../context/UserContext";

import { VoebizHeader, Summary } from "../../../components";

import { validateCPF } from "../../../services/validateCPF";
import { validateEmail } from "../../../services/validateEmail";

import AdminPassword from "./AdminPassword";
import AdminInfo from "./AdminInfo";
import { AdminForm, handleAdminFormChangeF } from "./type";
import AdminModalError from "./AdminModalError";

const Admin: React.FC = () => {
  const { data, handler } = useUser();
  const history = useHistory();
  const path = "/cadastro";
  const { t } = useTranslation("register_admin");
  const [formData, setFormData] = useState<AdminForm>({
    info: {
      cpf: { value: data.documentList?.[1].number || "", validated: false },
      adminName: data.adminName || "",
      firstName: data.firstName || "",
      lastName: data.lastName || "",
      occupation: data.occupation || "",
      email: { value: data.electronicAddressList?.[0].address || "", validated: false },
      phone1: { areaCode: 0, number: data.phoneNumber1 || "", formatted: "" },
      phone2: { areaCode: 0, number: data.phoneNumber2 || "", formatted: "" },
    },
    password: {
      password: { value: data.password || "", validated: false },
      passwordConfirmation: { value: data.passwordConfirmation || "", validated: false },
      confirmCheckboxChecked: false,
    },
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorType, setErrorType] = useState("generic_error");
  const [isError, setIsError] = useState(false);
  const [formValidated, setFormValidated] = useState(false);
  const enableSendButton = useCallback(() => {
    if (
      formData.info.cpf.validated &&
      formData.info.adminName.length > 5 &&
      formData.info.occupation.length > 1 &&
      formData.info.email.validated &&
      formData.info.phone1.number.length >= 8 &&
      formData.password.password.validated &&
      formData.password.confirmCheckboxChecked
    ) {
      setFormValidated(true);
    } else {
      setFormValidated(false);
    }
  }, [formData]);
  const handleReturn = () => history.push(`${path}/empresa`);
  const goNext = async () => {
    setIsLoading(true);
    try {
      const validateCpfResponse = await validateCPF("CPF", formData.info.cpf.value, data.smilesToken, data.apiDomain);
      const validateEmailResponse = await validateEmail(
        "EMAIL",
        formData.info.email.value,
        data.smilesToken,
        data.apiDomain,
      );
      if (validateCpfResponse === 401 || validateEmailResponse === 401) {
        throw new Error("generic");
      }
      if (validateCpfResponse === 402) {
        throw new Error("already_registered_CPF_error");
      }
      if (validateEmailResponse === 402) {
        throw new Error("already_registered_Email_error");
      }
    } catch (err) {
      if (err instanceof Error) {
        setErrorType(err.message);
        setIsError(true);
        setIsLoading(false);
      } else {
        setErrorType("generic");
      }
      return;
    }
    handler({
      ...data,
      documentList: [
        {
          type: "CNPJ",
          preferential: true,
          number: data?.documentList?.[0].number,
        },
        {
          type: "CPF",
          preferential: false,
          number: formData.info.cpf.value,
        },
        {
          type: "RG",
          preferential: false,
          number: "",
        },
      ],
      adminName: formData.info.adminName,
      firstName: formData.info.firstName,
      lastName: formData.info.lastName,
      occupation: formData.info.occupation,
      electronicAddressList: [
        {
          type: "Business",
          preferential: true,
          address: formData.info.email.value,
        },
        {
          type: "Business",
          preferential: false,
          address: formData.info.email.value,
        },
      ],
      phoneList: [
        {
          type: "CELLULAR",
          internationalCode: 55,
          verified: true,
          areaCode: formData.info.phone2.areaCode,
          number: formData.info.phone2.number,
        },
        {
          type: "WORK",
          internationalCode: 55,
          verified: false,
          areaCode: formData.info.phone1.areaCode,
          number: formData.info.phone1.number,
        },
        {
          type: "HOME",
          internationalCode: 55,
          verified: false,
          areaCode: 11,
          number: "111111111",
        },
      ],
      phoneNumber1: formData.info.phone1.number,
      phoneNumber2: formData.info.phone2.number,
      password: formData.password.password.value,
      passwordConfirmation: formData.password.passwordConfirmation.value,
    });
    history.push(`${path}/processando`);
  };
  const handleOnSubmit = (e: React.MouseEvent | React.FormEvent) => {
    e.preventDefault();
    goNext();
  };
  const toggle = () => setIsOpen(() => !isOpen);
  const pageReturn = () => {
    if (!data?.documentList?.[0].number) {
      history.push(`${path}`);
    }
    if (!data.fantasyName) {
      history.push(`${path}/empresa`);
    }
  };
  useEffect(() => pageReturn(), []);
  useEffect(() => enableSendButton(), [enableSendButton, formValidated]);
  const handleFormChange: handleAdminFormChangeF = (form, value) => {
    setFormData((prevState) => ({ ...prevState, [form]: value }));
  };
  const buttons = () => (
    <div className="button-wrapper fadeIn-latest">
      <SmlsButton
        id="btn_registerAdmin"
        color="primary"
        text={t("input.button.continue.text")}
        isLoading={isLoading}
        disabled={!formValidated}
        onClick={handleOnSubmit}
        onMouseDown={handleOnSubmit}
      />
      <SmlsButton
        id="btn_return"
        color="secondary"
        text={t("input.button.return.text")}
        disabled={false}
        onClick={handleReturn}
      />
    </div>
  );
  return (
    <form className="smls-lf" onSubmit={handleOnSubmit}>
      <div className="voebiz-register-progress-bar">
        <Summary isOpen={isOpen} handleClose={toggle} onExit={() => setIsOpen(false)} />
        <VoebizHeader
          id="drop_menu"
          steps={["Dados da empresa", "Administrador da conta"]}
          active={2}
          onNavClick={toggle}
          progress={100}
          shadow={false}
        />
      </div>
      <AdminInfo data={formData.info} onChange={handleFormChange} />
      <AdminPassword data={formData.password} buttons={buttons} onChange={handleFormChange} />
      <AdminModalError isOpen={isError} onClosed={() => setIsError(false)} errorType={errorType} />
    </form>
  );
};
export default Admin;
