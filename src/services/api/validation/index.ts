import axios from "axios";

const validateCPF = async (documentType: string, documentValue: string, smlToken: string, apiDomain: string) => {
  const dataValue = {
    type: documentType,
    value: documentValue,
  };

  const smilesValidadeDocumentUrl = `${apiDomain}/members/v1/members/document/validate`;

  return axios
    .post(smilesValidadeDocumentUrl, dataValue, {
      headers: {
        "X-Smiles-Token": smlToken,
        "Content-Type": "application/json",
      },
    })
    .then((response) => response)
    .catch((error) => error.response.data.data.error_code);
};

const validateCNPJ = async (documentType: string, documentValue: string, recaptchaValue: string, apiDomain: string) => {
  const dataValue = {
    type: documentType,
    value: documentValue,
  };

  const smilesValidadeDocumentUrl = `${apiDomain}/members/v1/members/document/validate`;

  return axios
    .post(smilesValidadeDocumentUrl, dataValue, {
      headers: {
        "X-Recaptcha": recaptchaValue,
        "Content-Type": "application/json",
      },
    })
    .then((response) => response)
    .catch((error) => error.response.data.data.error_code);
};

export { validateCPF, validateCNPJ };
