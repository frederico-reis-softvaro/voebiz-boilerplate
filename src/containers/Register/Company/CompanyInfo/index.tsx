import React, { FC, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SmlsDropdown, SmlsInputText, SmlsRadio } from "@smiles/smiles-ui-kit-react";
import { useUser } from "../../../../context/UserContext";

import { RegisterContent, IconLockOutline } from "../../../../components";

import { getListOfValues } from "../../../../services/listOfValues";

import { DropdownsItems, handleFormChangeF, InfoForm, itemDescription, YesNoRadios } from "../type";

interface CompanyInfoProps {
  data: InfoForm;
  returnPath: string;
  onChange: handleFormChangeF;
}

const CompanyInfo: FC<CompanyInfoProps> = ({ data, returnPath, onChange }) => {
  const { t } = useTranslation("register_company");
  const {
    data: { apiDomain },
  } = useUser();
  const history = useHistory();
  const [formData, setFormData] = useState<InfoForm>({ ...data });
  const [dropdowns, setDropdowns] = useState<DropdownsItems>({
    employee_number: { stateName: "numberOfEmployees", items: [] },
    main_activity: { stateName: "mainActivity", items: [] },
    business_budget: { stateName: "annualBudgetforTravel", items: [] },
    how_did_you_found_us: { stateName: "HowMeetedProgram", items: [] },
  });
  const sortItems = (arr: itemDescription[]) =>
    [...arr].sort((a: itemDescription, b: itemDescription) => {
      if (a.id.indexOf("Até") > -1) {
        return -1;
      }
      const regex = /([0-9]{1,3}){1}/gm;
      const resultA = a.id.match(regex);
      const resultB = b.id.match(regex);
      if (resultA && resultB) {
        return parseInt(resultA[0], 10) - parseInt(resultB[0], 10);
      }
      return 0;
    });
  const loadListOfValues = async () => {
    const result = await getListOfValues(apiDomain);
    const findElement = (el: string) => result.data.find(({ lovType }: { lovType: string }) => lovType === el);
    const { dadosEmpresa: employees } = findElement("GOL_VB_NUM_EMPLOYEES");
    const { dadosEmpresa: golMainActivity } = findElement("GOL_VB_MAIN_ACTIVITY");
    const { dadosEmpresa: golBusinessBudget } = findElement("GOL_VB_ANNUAL_TRV_BUDGET");
    const { dadosEmpresa: howToMetProgram } = findElement("GOL_VB_HOW_MET_PROGRAM");
    const sortedEmployees = sortItems(employees);
    const sortedBusinessBudget = sortItems(golBusinessBudget);
    const { mainActivity, annualBudgetforTravel, HowMeetedProgram, numberOfEmployees } = result.data;
    setFormData((prevState) => ({
      ...prevState,
      mainActivity,
      annualBudgetforTravel,
      HowMeetedProgram,
      numberOfEmployees,
    }));
    /* eslint-disable camelcase */
    setDropdowns(({ employee_number, main_activity, business_budget, how_did_you_found_us }) => ({
      employee_number: { ...employee_number, items: sortedEmployees },
      main_activity: { ...main_activity, items: golMainActivity },
      business_budget: { ...business_budget, items: sortedBusinessBudget },
      how_did_you_found_us: { ...how_did_you_found_us, items: howToMetProgram },
    }));
  };
  const pageReturn = () => {
    if (!formData.cnpj) {
      history.push(returnPath);
    }
  };
  useEffect(() => {
    loadListOfValues();
    pageReturn();
  }, []);
  useEffect(() => onChange("info", formData), [formData]);
  const renderYesNoRadios = ({ title, name }: YesNoRadios) => (
    <div className="inputTextContainer">
      <legend className="voebiz-register_content_default_description">{t(title)}</legend>
      <div className="voebiz-relationship_with_gol_container">
        <SmlsRadio
          id={`${name}Positive`}
          name={name}
          label="Sim"
          onChange={() => setFormData((prevState) => ({ ...prevState, [name]: "Y" }))}
          checked={formData[name] === "Y" ?? false}
        />
        <SmlsRadio
          id={`${name}Negative`}
          name={name}
          label="Não"
          onChange={() => setFormData((prevState) => ({ ...prevState, [name]: "N" }))}
          checked={formData[name] === "N" && formData[name] !== null}
        />
      </div>
    </div>
  );
  const renderDropdowns = () => {
    return Object.keys(dropdowns).map((key) => {
      const { stateName, items } = dropdowns[key as keyof DropdownsItems];
      return (
        <div className="inputTextContainer" key={stateName}>
          <SmlsDropdown
            id={`inp_${key}`}
            placeholder={t(`input.dropdown.${key}.placeholder`)}
            textMobile={t(`input.dropdown.${key}.placeholder`)}
            openWhenTyping
            textLabel={t(`input.dropdown.${key}.label`)}
            errorMessage={t(`input.dropdown.${key}.error`)}
            onValid={(isValid) => {
              if (!isValid) {
                setFormData((prevState) => ({ ...prevState, [stateName]: "" }));
              }
            }}
            onClick={(value) => {
              const result = items.find((item) => item.description === value);
              if (result && result.id) {
                setFormData((prevState) => ({
                  ...prevState,
                  [stateName]: stateName === "mainActivity" ? result.description : result.id,
                }));
              }
            }}
            actions={items.map((item) => ({ name: item.description }))}
            value={formData[stateName]}
          />
        </div>
      );
    });
  };

  return (
    <div className="voebiz-register-cnpj voebiz-register-cnpj-section-1">
      <div className="voebiz-title-wrapper">
        <h3 className="title-wrapper" id="lbl_titleCompany">
          {t("data_title")}
        </h3>
      </div>
      <div className="voebiz-content-wrapper">
        <RegisterContent idMessage="lbl_msgInformativeCompanyData" text={t("data_description")} label={t("data_label")}>
          <div className="voebiz-company-container-data-fields">
            <div className="voebiz-company-container-data-fields-right">
              <div className="inputTextContainer">
                <SmlsInputText
                  id="input_cnpj"
                  value={formData.cnpj}
                  maxLength={18}
                  disabled
                  inputMode="numeric"
                  regex={/[^0-9./-]/gi}
                  icon={<IconLockOutline />}
                  textLabel={t("input.text.cnpj.label")}
                />
              </div>
              <div className="inputTextContainer">
                <SmlsInputText
                  id="inp_company_name"
                  placeholder={t("input.text.company_name.placeholder")}
                  onChange={(e) => setFormData((prevState) => ({ ...prevState, socialReason: e.target.value }))}
                  value={formData.socialReason}
                  textLabel={t("input.text.company_name.label")}
                />
              </div>
              <div className="inputTextContainer">
                <SmlsInputText
                  id="inp_fantasy_name"
                  placeholder={t("input.text.fantasy_name.placeholder")}
                  onChange={(e) => setFormData((prevState) => ({ ...prevState, fantasyName: e.target.value }))}
                  value={formData.fantasyName}
                  textLabel={t("input.text.fantasy_name.label")}
                />
              </div>
              {renderDropdowns()}
              {renderYesNoRadios({
                title: "input.radio.radio_relationship_with_gol.label",
                name: "relationshipWithGOL",
              })}
              {formData.relationshipWithGOL === "Y" && (
                <>
                  {renderYesNoRadios({
                    title: "input.radio.has_provided_services_to_gol.label",
                    name: "providedServicesToGol",
                  })}
                  {renderYesNoRadios({
                    title: "input.radio.has_provided_services_to_others.label",
                    name: "providedServicesToOthers",
                  })}
                </>
              )}
            </div>
          </div>
        </RegisterContent>
      </div>
    </div>
  );
};

export default CompanyInfo;
