import React from "react";
import { useTranslation } from "react-i18next";

import LogoVoebiz from "../../../assets/voebiz.svg";

const PageSuccess = () => {
  const { t } = useTranslation("page_success");

  return (
    <>
      <div className="voebiz-page-success smls-lf">
        <div className="voebiz-page-success_logo">
          <img className="voebiz-page-success_logo_img" src={LogoVoebiz} alt={t("alt")} />
        </div>
        <div className="voebiz-page-success_title">
          <span className="voebiz-page-success_title_text" id="lbl_titleCompany">
            {t("title")}
          </span>
        </div>
        <div className="voebiz-page-success_text">
          <p className="voebiz-page-success_text_info">
            {t("status")}
            <strong>{t("information")}</strong>
          </p>
        </div>
      </div>
    </>
  );
};

export default PageSuccess;
