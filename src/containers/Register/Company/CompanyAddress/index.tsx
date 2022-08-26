import React, { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { SmlsInputText } from "@smiles/smiles-ui-kit-react";
import { useUser } from "../../../../context/UserContext";
import { RegisterContent } from "../../../../components";

import { checkZipCode } from "../../../../services/checkZipCode";

import { AddressForm, handleFormChangeF } from "../type";

interface CompanyAddressProps {
  data: AddressForm;
  button: () => JSX.Element;
  onChange: handleFormChangeF;
}

const CompanyAddress: FC<CompanyAddressProps> = ({ data, button, onChange }) => {
  const { t } = useTranslation("register_company");
  const {
    data: { apiDomain },
  } = useUser();

  const [formData, setFormData] = useState<AddressForm>({ ...data });

  async function getZipCode(getValueZipCode: string) {
    const response = await checkZipCode(getValueZipCode, apiDomain);

    if (response) {
      const { State, City, StreetName, Country } = response;
      setFormData((prevState) => ({
        ...prevState,
        state: State,
        city: City,
        streetAddress: StreetName,
        country: Country,
      }));
    }
  }

  const handleChangeZipCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    let doc = e.target.value;
    doc = doc.replace(/\D/g, "");
    doc = doc.replace(/(\d{2})(\d)/, "$1.$2");
    doc = doc.replace(/(\d{3})(\d{1,3})$/, "$1-$2");

    setFormData((prevState) => ({ ...prevState, zipCode: doc, state: "", city: "", streetAddress: "", country: "" }));

    if (doc?.length === 10) {
      getZipCode(doc.replace(/[^0-9]/g, ""));
    }
  };

  const handleChangeAddressNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({ ...prevState, streetAddressNumber: e.target.value }));
  };

  const handleChangeComplement = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({ ...prevState, complement: e.target.value }));
  };

  useEffect(() => {
    onChange("address", formData);
  }, [formData]);

  return (
    <div className="voebiz-register-cnpj voebiz-register-cnpj-section-2">
      <div className="voebiz-title-wrapper-desktop">
        <h3 className="title-wrapper" id="lbl_titleCompany">
          {t("data_titleSection2")}
        </h3>
      </div>
      <div className="voebiz-title-wrapper-mobile">
        <h3 className="title-wrapper" id="lbl_titleCompany">
          {t("data_titleSection2Mobile")}
        </h3>
      </div>
      <div className="voebiz-content-wrapper">
        <RegisterContent
          idMessage="lbl_msgInformativeCompanyAddress"
          text={t("address_description")}
          label={t("address_label")}
        >
          <div className="voebiz-company-container-address-fields">
            <div className="voebiz-company-container-address-fields-right">
              <div className="inputTextContainer">
                <SmlsInputText
                  id="inp_zipCode"
                  placeholder={t("input.text.zipCode.placeholder")}
                  maxLength={10}
                  inputMode="numeric"
                  textLabel={t("input.text.zipCode.label")}
                  errorMessage={t("input.text.zipCode.error")}
                  onChange={handleChangeZipCode}
                  value={formData.zipCode}
                />
              </div>
              <div className="voebiz-company-container-address-fields columns">
                <div className="inputTextContainer">
                  <SmlsInputText
                    id="inp_state_fu"
                    placeholder={t("input.text.state_fu.placeholder")}
                    value={formData.state}
                    disabled
                    textLabel={t("input.text.state_fu.label")}
                  />
                </div>

                <div className="inputTextContainer">
                  <SmlsInputText
                    id="inp_city"
                    placeholder={t("input.text.city.placeholder")}
                    value={formData.city}
                    disabled
                    textLabel={t("input.text.city.label")}
                  />
                </div>
              </div>
              <div className="inputTextContainer">
                <SmlsInputText
                  id="inp_address"
                  placeholder={t("input.text.address.placeholder")}
                  value={formData.streetAddress}
                  disabled
                  textLabel={t("input.text.address.label")}
                />
              </div>

              <div className="voebiz-company-container-address-fields columns">
                <div className="inputTextContainer">
                  <SmlsInputText
                    id="inp_number"
                    placeholder={t("input.text.number.placeholder")}
                    onChange={handleChangeAddressNumber}
                    value={formData.streetAddressNumber}
                    textLabel={t("input.text.number.label")}
                  />
                </div>

                <div className="inputTextContainer">
                  <SmlsInputText
                    id="inp_extra_info"
                    placeholder={t("input.text.extra_info.placeholder")}
                    onChange={handleChangeComplement}
                    value={formData.complement}
                    textLabel={t("input.text.extra_info.label")}
                  />
                </div>
              </div>
              {button()}
            </div>
          </div>
        </RegisterContent>
      </div>
    </div>
  );
};

export default CompanyAddress;
