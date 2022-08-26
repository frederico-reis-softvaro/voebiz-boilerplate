import React, { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { SmlsCheckbox } from "@smiles/smiles-ui-kit-react";

import { usePasswordValidation } from "../../../../hooks/usePasswordValidation";

import { RegisterContent, VoebizInputPassword } from "../../../../components";

import { AdminPasswordForm, handleAdminFormChangeF } from "../type";

interface AdminPasswordProps {
  data: AdminPasswordForm;
  buttons: () => JSX.Element;
  onChange: handleAdminFormChangeF;
}

const AdminPassword: FC<AdminPasswordProps> = ({ data, buttons, onChange }) => {
  const { t } = useTranslation("register_admin");

  const [passwordFormData, setPasswordFormData] = useState<AdminPasswordForm>({ ...data });

  const [errorMessageList] = useState([
    t("password_error.requiredField"),
    t("password_error.hasValidLength"),
    t("password_error.hasUpperCase"),
    t("password_error.hasLowerCase"),
    t("password_error.hasSpecialChar"),
  ]);

  const [errorMessageList2] = useState([
    t("password_error.requiredField"),
    t("password_error.hasValidLength"),
    t("password_error.hasUpperCase"),
    t("password_error.hasLowerCase"),
    t("password_error.hasSpecialChar"),
    t("password_error.passwordNotIdentical"),
  ]);

  const [hasValidLength, hasNumber, hasUpperCase, hasLowerCase, hasSpecialChar, hasNotBarra] = usePasswordValidation(
    passwordFormData.password.value,
    8,
    20,
  );

  const validatePassword = () => {
    const validated = hasValidLength && hasNumber && hasUpperCase && hasLowerCase && hasSpecialChar && hasNotBarra;
    setPasswordFormData((prevState) => ({
      ...prevState,
      password: { value: prevState.password.value, validated },
    }));
  };

  const handleCheckConfirmCheckbox = (): void => {
    setPasswordFormData((prevState) => ({ ...prevState, confirmCheckboxChecked: !prevState.confirmCheckboxChecked }));
  };

  useEffect(() => {
    if (passwordFormData.password.value.length >= 8) {
      const validated = passwordFormData.password.value === passwordFormData.passwordConfirmation.value;
      setPasswordFormData((prevState) => ({
        ...prevState,
        passwordConfirmation: { value: prevState.passwordConfirmation.value, validated },
      }));
    }
  }, [passwordFormData.password.value, passwordFormData.passwordConfirmation.value]);

  useEffect(() => {
    validatePassword();
  }, [hasValidLength, hasNumber, hasUpperCase, hasLowerCase, hasSpecialChar, hasNotBarra]);

  useEffect(() => {
    onChange("password", passwordFormData);
  }, [passwordFormData]);

  return (
    <div className="voebiz-register-cnpj voebiz-register-cnpj-section-2">
      <div className="voebiz-title-wrapper">
        <h3 className="title-wrapper" id="lbl_titleCompany">
          {t("data_title_section_2")}
        </h3>
      </div>

      <div className="voebiz-content-wrapper">
        <RegisterContent idMessage="lbl_msgInformativeCompanyAddress" text={t("data_description_section_2")} label="">
          <VoebizInputPassword
            data-testid="password"
            idInput="password"
            placeholder={t("input.text.password.placeholder")}
            textLabel={t("input.text.password.label")}
            error={!passwordFormData.password.validated && passwordFormData.password.value.length >= 4}
            onBlur={() => !passwordFormData.password.validated}
            onlyNumbers={false}
            errorMessageList={errorMessageList}
            onChange={(e) =>
              setPasswordFormData((prevState) => ({
                ...prevState,
                password: { value: e.target.value, validated: prevState.password.validated },
              }))
            }
          />

          <VoebizInputPassword
            data-testid="password_confirmation"
            idInput="password_confirmation"
            placeholder={t("input.text.confirm_password.placeholder")}
            onChange={(e) =>
              setPasswordFormData((prevState) => ({
                ...prevState,
                passwordConfirmation: { value: e.target.value, validated: prevState.passwordConfirmation.validated },
              }))
            }
            textLabel={t("input.text.confirm_password.label")}
            error={
              !passwordFormData.passwordConfirmation.validated &&
              passwordFormData.password.validated &&
              passwordFormData.passwordConfirmation.value.length > 1
            }
            errorMessageList={errorMessageList2}
          />

          <div className="voebiz-rules-checkbox-wrapper">
            <SmlsCheckbox
              className="voebiz-rules-checkbox-wrapper_check"
              id="use_terms_agreement"
              checked={passwordFormData.confirmCheckboxChecked}
              onClick={handleCheckConfirmCheckbox}
            />
            <span id="use_terms_agreement_label" className="voebiz-rules-checkbox-wrapper_text">
              Li e concordo{" "}
              <a href="https://www.smiles.com.br/cadastro/termos">com o regulamento do programa de fidelidade VoeBiz</a>
            </span>
          </div>

          {buttons()}
        </RegisterContent>
      </div>
    </div>
  );
};

export default AdminPassword;
