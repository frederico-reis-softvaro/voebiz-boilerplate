import axios from "axios";

const validateCNPJ = async (documentType: string, documentValue: string, recaptchaValue: string, apiDomain: string) => {
  const dataValue = {
    type: documentType,
    value: documentValue,
  };
  const smilesValidadeDocumentUrl = `${apiDomain}${"/members/v1/members/document/validate"}`;
  return axios
    .post(smilesValidadeDocumentUrl, dataValue, {
      headers: {
        "X-Recaptcha": recaptchaValue,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response.data.data.error_code;
    });
};
export { validateCNPJ };
