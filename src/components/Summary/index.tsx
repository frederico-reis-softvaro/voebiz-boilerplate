import React, { useState, useEffect, useCallback } from "react";
import { ModalBody, ModalHeader } from "reactstrap";
import { SmlsModal } from "@smiles/smiles-ui-kit-react";
import { useTranslation } from "react-i18next";

import { useUser } from "../../context/UserContext";

import ModalItemList from "../ModalItemList";

interface ISummary {
  isOpen: boolean;
  // eslint-disable-next-line no-unused-vars
  handleClose: (bol: boolean) => void;
  onExit: () => void;
}

const Summary: React.FC<ISummary> = ({ isOpen = false, handleClose, onExit }) => {
  const { data } = useUser();
  const { t } = useTranslation("summary");
  const adminPagePath = "/cadastro/admin";
  const companyPagePath = "/cadastro/empresa";

  const [completeAddress, setCompleteAddress] = useState("");

  const handleCloseModal = () => {
    handleClose(!isOpen);
  };

  const completeAddressFormatter = useCallback(() => {
    if (data.addressList?.streetAddress && data.addressList?.streetAddressNumber) {
      const completeAddressStr1 = `${data.addressList.streetAddress}, ${data.addressList.streetAddressNumber} - ${data.addressList.complement}, `;
      const completeAddressStr2 = `${data.addressList.city} - ${data.addressList.state}, ${data.addressList.country} `;
      setCompleteAddress(`${completeAddressStr1} ${completeAddressStr2} `);
    }
  }, [data]);

  useEffect(() => {
    completeAddressFormatter();
  }, [completeAddressFormatter]);

  return (
    <>
      <SmlsModal
        className="smls-register"
        isOpen={isOpen}
        type="right"
        toggle={handleCloseModal}
        defaultHeader={false}
        onExit={onExit}
      >
        <ModalHeader>
          <button
            type="button"
            className="smls-btn-close"
            data-dismiss="modal"
            aria-label="Close"
            onClick={handleCloseModal}
          >
            <i className="material-icons">&#xe5cd;</i>
          </button>
        </ModalHeader>
        <ModalBody>
          <div>
            <div className="smls-modal-header">
              <h4>{t("company.title")}</h4>
            </div>
            <ModalItemList
              list={[
                {
                  key: "socialReason",
                  label: "company.organization_name",
                  value: data.socialReason,
                  href: companyPagePath,
                },
                {
                  key: "cnpj",
                  label: "company.cnpj",
                  value: data.documentList?.[0].number,
                  href: "/cadastro",
                },
              ]}
              type="check"
            />
            <div className="smls-modal-header">
              <h4>{t("address.title")}</h4>
            </div>
            <ModalItemList
              list={[
                {
                  key: "organizationName",
                  label: data.addressList?.zipCode,
                  value: completeAddress,
                  href: companyPagePath,
                },
              ]}
              type="check"
            />
            <div className="smls-modal-header">
              <h4>{t("admin.title")}</h4>
            </div>
            <ModalItemList
              list={[
                {
                  key: "adminName",
                  label: "admin.name",
                  value: data.adminName,
                  href: adminPagePath,
                },
                {
                  key: "CPF",
                  label: "admin.cpf",
                  value: data.documentList?.[1].number,
                  href: adminPagePath,
                },
                {
                  key: "occupation",
                  label: "admin.occupation",
                  value: data.occupation,
                  href: adminPagePath,
                },
                {
                  key: "email",
                  label: "admin.email",
                  value: data.electronicAddressList?.[0].address,
                  href: adminPagePath,
                },
                {
                  key: "comercialPhone",
                  label: "admin.comercial_phone",
                  value: `+55 (${data?.phoneList?.[0].areaCode}) ${data?.phoneList?.[0].number}`,
                  href: adminPagePath,
                },
                {
                  key: "mobilePhone",
                  label: "admin.mobile_phone",
                  value: `+55 (${data?.phoneList?.[1].areaCode}) ${data?.phoneList?.[1].number}`,
                  href: adminPagePath,
                },
              ]}
              type="check"
            />
            <div className="smls-modal-header">
              <a href="/cadastro/termos">
                <h4>{t("terms.title")}</h4>
              </a>
            </div>
          </div>
        </ModalBody>
      </SmlsModal>
    </>
  );
};

export default Summary;
