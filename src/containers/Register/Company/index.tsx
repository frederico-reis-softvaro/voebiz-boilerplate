import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { SmlsButton } from "@smiles/smiles-ui-kit-react";
import { useHistory } from "react-router-dom";

import { useUser } from "../../../context/UserContext";

import { VoebizHeader, Summary } from "../../../components";

import { removeMask } from "../../../utils/documentUtils";
import { CompanyForm, handleFormChangeF } from "./type";
import CompanyAddress from "./CompanyAddress";
import CompanyInfo from "./CompanyInfo";

export default function Company() {
  const { t } = useTranslation("register_company");
  const { data, handler } = useUser();
  const history = useHistory();
  const path = "/cadastro";
  const typeOffice = "HOME";

  const [formData, setFormData] = useState<CompanyForm>({
    info: {
      cnpj: data.documentList?.[0].number || "00.000.000/0000-00",
      fantasyName: data.fantasyName || "",
      socialReason: data.socialReason || "",
      numberOfEmployees: data.numberOfEmployees || "",
      mainActivity: data.mainActivity || "",
      annualBudgetforTravel: data.annualBudgetforTravel || "",
      HowMeetedProgram: data.HowMeetedProgram || "",
      relationshipWithGOL: data.relationshipWithGOL || "N",
      providedServicesToGol: data.providedServicesToGol || "N",
      providedServicesToOthers: data.providedServicesToGol || "N",
    },
    address: {
      zipCode: data.addressList?.zipCode || "",
      state: data.addressList?.state || "",
      city: data.addressList?.city || "",
      streetAddress: data.addressList?.streetAddress || "",
      streetAddressNumber: data.addressList?.streetAddressNumber || "",
      complement: data.addressList?.complement || "",
      country: data.addressList?.country || "",
    },
  });

  const [formValidated, setFormValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const enableSendButton = useCallback(() => {
    const { socialReason, annualBudgetforTravel, numberOfEmployees, HowMeetedProgram } = formData.info;
    const { zipCode, streetAddressNumber } = formData.address;
    if (
      socialReason &&
      annualBudgetforTravel &&
      numberOfEmployees &&
      HowMeetedProgram &&
      zipCode &&
      streetAddressNumber
    ) {
      setFormValidated(true);
    } else {
      setFormValidated(false);
    }
  }, [formData]);

  const goNext = async () => {
    setIsLoading(true);
    handler({
      ...data,
      ...formData.info,
      organizationName: "VB - VRG Linhas Aereas S.A.",
      addressList: {
        ...formData.address,
        type: typeOffice,
        preferential: true,
        zipCode: removeMask(formData.address.zipCode),
      },
    });
    setIsLoading(false);
    history.push(`${path}/admin`);
  };

  const handleContinue = (e: React.MouseEvent | React.FormEvent) => {
    e.preventDefault();
    goNext();
  };

  const toggle = () => setIsOpen(() => !isOpen);

  useEffect(() => {
    enableSendButton();
  }, [enableSendButton, formValidated]);

  const submitButton = () => (
    <div className="fadeIn-latest">
      <SmlsButton
        id="btn_registerCompany"
        color="primary"
        text={t("input.button.continue.text")}
        disabled={!formValidated}
        onClick={handleContinue}
        onMouseDown={handleContinue}
        isLoading={isLoading}
      />
    </div>
  );

  const handleFormChange: handleFormChangeF = (form, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [form]: value,
    }));
  };

  return (
    <>
      <form className="smls-lf">
        <div className="voebiz-register-progress-bar">
          <Summary isOpen={isOpen} handleClose={toggle} onExit={() => setIsOpen(false)} />

          <VoebizHeader
            id="drop_menu"
            steps={["Dados da empresa", "Administrador da conta"]}
            active={1}
            onNavClick={toggle}
            progress={50}
            shadow={false}
          />
        </div>

        <CompanyInfo data={formData.info} returnPath={path} onChange={handleFormChange} />

        <CompanyAddress data={formData.address} button={submitButton} onChange={handleFormChange} />
      </form>
    </>
  );
}
