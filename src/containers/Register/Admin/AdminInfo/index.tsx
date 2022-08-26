import React, { FC, useCallback, useEffect, useState } from "react";
import * as EmailValidator from "email-validator";
import { useTranslation } from "react-i18next";
import { cpf } from "cpf-cnpj-validator";
import { SmlsInputText, SmlsDropdown } from "@smiles/smiles-ui-kit-react";

import { useUser } from "../../../../context/UserContext";

import { RegisterContent } from "../../../../components";

import { getListOfValues } from "../../../../services/listOfValues";

import { formatCpf, regexPhoneFormatter } from "../../../../utils/documentUtils";
import { AdminInfoForm, handleAdminFormChangeF } from "../type";

type itemsDescription = {
  id: string;
  description: string;
};
type DropdownsItem = {
  occupation: itemsDescription[];
};

interface AdminInfoProps {
  data: AdminInfoForm;
  onChange: handleAdminFormChangeF;
}

const AdminInfo: FC<AdminInfoProps> = ({ data, onChange }) => {
  const { t } = useTranslation("register_admin");
  const {
    data: { apiDomain },
  } = useUser();
  const [infoFormData, setInfoFormData] = useState<AdminInfoForm>({ ...data });
  const [dropdowns, setDropdowns] = useState<DropdownsItem>({
    occupation: [] as itemsDescription[],
  });

  const handleChangePhone = (e: React.ChangeEvent<HTMLInputElement>, type: "phone1" | "phone2") => {
    const formatted = regexPhoneFormatter(e);
    const formattedNumber = formatted.replace(/[^^0-9 ]/g, "");
    const areaCode = parseInt(formattedNumber.substring(0, 2), 10);
    const number = formattedNumber.substring(2).trimStart();
    setInfoFormData((prevState) => ({ ...prevState, [type]: { areaCode, number, formatted } }));
  };

  const formatName = (adminName: string) => {
    const firstName = adminName.split(" ").slice(0, -1).join(" ");
    const lastName = adminName.split(" ").slice(-1).join(" ");
    setInfoFormData((prevState) => ({ ...prevState, firstName, lastName }));
  };

  const validateCpfFormat = useCallback(() => {
    const validated = cpf.isValid(infoFormData.cpf.value);
    setInfoFormData((prevState) => ({ ...prevState, cpf: { value: prevState.cpf.value, validated } }));
    return validated;
  }, [infoFormData.cpf.value]);

  const validateEmailFormat = useCallback(() => {
    const validated = EmailValidator.validate(infoFormData.email.value);
    setInfoFormData((prevState) => ({ ...prevState, email: { value: prevState.email.value, validated } }));
    return validated;
  }, [infoFormData.email.value]);

  const loadListOfValues = async () => {
    await getListOfValues(apiDomain).then((result) => {
      const list = result.data.find(({ lovType }: { lovType: string }) => lovType === "FINS_DRVOCC_DWLOCC_MLOV");
      setDropdowns({ occupation: list.dadosEmpresa });
    });
  };
  useEffect(() => {
    formatName(infoFormData.adminName);
  }, [infoFormData.adminName]);

  useEffect(() => {
    loadListOfValues();
  }, []);

  useEffect(() => {
    onChange("info", infoFormData);
  }, [infoFormData]);

  return (
    <div className="voebiz-register-cnpj voebiz-register-cnpj-section-1">
      <div className="voebiz-title-wrapper">
        <h3 className="title-wrapper" id="lbl_titleCompany">
          {t("data_title")}
        </h3>
      </div>
      <div className="voebiz-content-wrapper">
        <RegisterContent idMessage="lbl_msgInformativeCompanyData" text={t("data_description")} label="">
          <div>
            <div className="voebiz-company-container-data-fields-right">
              <div className="inputTextContainer">
                <SmlsInputText
                  id="input_cpf"
                  placeholder={t("input.text.cpf.placeholder")}
                  maxLength={14}
                  inputMode="numeric"
                  textLabel={t("input.text.cpf.label")}
                  onChange={(e) =>
                    setInfoFormData((prevState) => ({
                      ...prevState,
                      cpf: { value: formatCpf(e), validated: prevState.cpf.validated },
                    }))
                  }
                  value={infoFormData.cpf.value}
                  validate={validateCpfFormat}
                  errorMessage="O CPF informado não é válido. Por favor, tente de novo."
                />
              </div>
              <div className="inputTextContainer">
                <SmlsInputText
                  id="inp_admin_name"
                  placeholder={t("input.text.admin_name.placeholder")}
                  onChange={(e) => setInfoFormData((prevState) => ({ ...prevState, adminName: e.target.value }))}
                  value={infoFormData.adminName}
                  textLabel={t("input.text.admin_name.label")}
                />
              </div>
              <div className="inputTextContainer">
                <SmlsDropdown
                  id="inp_occupation"
                  placeholder={t("input.text.occupation.placeholder")}
                  errorMessage="Selecione a área de atuação vinculada ao seu cargo."
                  actions={dropdowns.occupation.map((item) => ({ name: item.description }))}
                  onClick={(value) => {
                    const result = dropdowns.occupation.find((item) => item.description === value);
                    if (result && result.id) {
                      setInfoFormData((prevState) => ({ ...prevState, occupation: result?.id }));
                    }
                  }}
                  onValid={(isValid) => {
                    if (!isValid) {
                      setInfoFormData((prevState) => ({ ...prevState, occupation: "" }));
                    }
                  }}
                  textLabel={t("input.text.occupation.label")}
                />
              </div>
              <div className="inputTextContainer">
                <SmlsInputText
                  id="inp_email"
                  placeholder={t("input.text.email.placeholder")}
                  onChange={(e) =>
                    setInfoFormData((prevState) => ({
                      ...prevState,
                      email: { value: e.target.value, validated: prevState.email.validated },
                    }))
                  }
                  value={infoFormData.email.value}
                  validate={validateEmailFormat}
                  errorMessage="O e-mail informado não é válido. Por favor, tente de novo."
                  textLabel={t("input.text.email.label")}
                />
              </div>
              <div className="inputTextContainer">
                <SmlsInputText
                  id="inp_phone_number_1"
                  placeholder={t("input.text.phone_number_1.placeholder")}
                  onChange={(e) => handleChangePhone(e, "phone1")}
                  value={infoFormData.phone1.formatted}
                  maxLength={15}
                  inputMode="tel"
                  textLabel={t("input.text.phone_number_1.label")}
                />
              </div>
              <div className="inputTextContainer">
                <SmlsInputText
                  id="inp_phone_number_2"
                  placeholder={t("input.text.phone_number_2.placeholder")}
                  onChange={(e) => handleChangePhone(e, "phone2")}
                  value={infoFormData.phone2.formatted}
                  maxLength={15}
                  inputMode="tel"
                  textLabel={t("input.text.phone_number_2.label")}
                />
              </div>
            </div>
          </div>
        </RegisterContent>
      </div>
    </div>
  );
};

export default AdminInfo;
