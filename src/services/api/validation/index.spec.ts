import axios from "axios";

import { validateCNPJ, validateCPF } from ".";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Validation", () => {
  describe("CPF", () => {
    const validateCPFStub = {
      documentType: "CPF",
      documentValue: "141.288.357-14",
      smlToken: "token",
      apiDomain: "domain",
    };

    it("should return valid CPF", async () => {
      mockedAxios.post.mockResolvedValue({ data: { message: "This CPF is valid" } });
      const service = await validateCPF(
        validateCPFStub.documentType,
        validateCPFStub.documentValue,
        validateCPFStub.smlToken,
        validateCPFStub.apiDomain,
      );
      expect(service.data).toEqual({ message: "This CPF is valid" });
    });

    it("should return undefined when internal server error occurs", async () => {
      mockedAxios.post.mockRejectedValueOnce({
        response: { data: { data: { error_code: "Internal server error" } } },
      });
      const response = await validateCPF(
        validateCPFStub.documentType,
        validateCPFStub.documentValue,
        validateCPFStub.smlToken,
        validateCPFStub.apiDomain,
      );

      expect(response).toEqual("Internal server error");
    });
  });

  describe("CNPJ", () => {
    const validateCNPJStub = {
      documentType: "CNPJ",
      documentValue: "123123123/0001-13",
      recaptchaValue: "recaptcha",
      apiDomain: "domain",
    };

    it("should return valid CNPJ", async () => {
      mockedAxios.post.mockResolvedValue({ data: { message: "This CNPJ is valid" } });
      const response = await validateCNPJ(
        validateCNPJStub.documentType,
        validateCNPJStub.documentValue,
        validateCNPJStub.recaptchaValue,
        validateCNPJStub.apiDomain,
      );

      expect(response.data).toEqual({ message: "This CNPJ is valid" });
    });
  });
});
