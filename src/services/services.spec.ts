import axios from "axios";
import { documentList } from "src/tests/mocks/mockUseUser.json";

import { checkZipCode } from "src/services/checkZipCode";
import { getListOfValues } from "src/services/listOfValues";
import { validateCNPJ } from "src/services/validateCNPJ";
import { validateCPF } from "src/services/validateCPF";

import { validateEmail } from "./validateEmail";
import { createMember } from "./createMember";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Services", () => {
  beforeEach(() => {
    mockedAxios.get.mockClear();
    mockedAxios.post.mockClear();
  });
  describe("checkZipCode", () => {
    it("should return zip code success", async () => {
      const users = { data: { ErrorDesc: "Success" }, status: 200, statusText: "Ok", headers: {}, config: {} };
      const apiDomain = "https://apidomainpath";

      mockedAxios.get.mockResolvedValueOnce(users);
      const service = await checkZipCode("1234123412", apiDomain);
      expect(service).toEqual({ ErrorDesc: "Success" });
    });
    it("should return undefined when zip code is wrong", async () => {
      mockedAxios.get.mockRejectedValueOnce("Zip code incorrect");
      const apiDomain = "https://apidomainpath";
      const service = await checkZipCode("1234123412", apiDomain);
      expect(service).toBeUndefined();
    });
  });
  describe("getListOfValues", () => {
    it("should return list of documents", async () => {
      const response = { data: documentList, status: 200, statusText: "Ok", headers: {}, config: {} };
      const apiDomain = "https://apidomainpath";

      mockedAxios.get.mockResolvedValueOnce(response);
      const service = await getListOfValues(apiDomain);
      expect(service).toEqual(response.data);
    });
    it("should return a empty array when internal server error occurs", async () => {
      mockedAxios.get.mockRejectedValueOnce("Internal server error");
      const apiDomain = "https://apidomainpath";
      const service = await getListOfValues(apiDomain);
      expect(service).toEqual([]);
    });
  });
  describe("validateCNPJ", () => {
    const validateCNPJStub = {
      documentType: "CNPJ",
      documentValue: "123123123/0001-13",
      recaptchaValue: "udahsudahsudhaisduhaisduahsiduah",
      apiDomain: "https://apidomainpath",
    };
    it("should return valid CNPJ", async () => {
      mockedAxios.post.mockResolvedValue({ data: { message: "This CNPJ is valid" } });
      const service = await validateCNPJ(
        validateCNPJStub.documentType,
        validateCNPJStub.documentValue,
        validateCNPJStub.recaptchaValue,
        validateCNPJStub.apiDomain,
      );
      expect(service.data).toEqual({ message: "This CNPJ is valid" });
    });
    describe("validateCPF", () => {
      const validateCPFStub = {
        documentType: "CPF",
        documentValue: "141.288.357-14",
        smlToken: "udahsudahsudhaisduhaisduahsiduah",
        apiDomain: "https://apidomainpath",
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
        const service = await validateCPF(
          validateCPFStub.documentType,
          validateCPFStub.documentValue,
          validateCPFStub.smlToken,
          validateCPFStub.apiDomain,
        );
        expect(service).toEqual("Internal server error");
      });
    });
    describe("validateEmail", () => {
      const validateEmailStub = {
        documentType: "email",
        documentValue: "pedro.azevedo@softvaro.com.br",
        smlToken: "udahsudahsudhaisduhaisduahsiduah",
        apiDomain: "https://apidomainpath",
      };
      it("should return valid CPF", async () => {
        mockedAxios.post.mockResolvedValue({ data: { message: "This Email is valid" } });
        const service = await validateEmail(
          validateEmailStub.documentType,
          validateEmailStub.documentValue,
          validateEmailStub.smlToken,
          validateEmailStub.apiDomain,
        );
        expect(service.data).toEqual({ message: "This Email is valid" });
      });
      it("should return undefined when internal server error occurs", async () => {
        mockedAxios.post.mockRejectedValueOnce({
          response: { data: { data: { error_code: "Internal server error" } } },
        });
        const service = await validateEmail(
          validateEmailStub.documentType,
          validateEmailStub.documentValue,
          validateEmailStub.smlToken,
          validateEmailStub.apiDomain,
        );
        expect(service).toEqual("Internal server error");
      });
    });
    describe("createMember", () => {
      const createMemberStub = {
        newMember: { user: "SML User", email: "smluser@sml.com" },
        smlToken: "udahsudahsudhaisduhaisduahsiduah",
        apiDomain: "https://apidomainpath",
      };
      it("should return valid CPF", async () => {
        mockedAxios.post.mockResolvedValue({ data: { message: "User created" } });
        const service = await createMember(
          createMemberStub.newMember,
          createMemberStub.smlToken,
          createMemberStub.apiDomain,
        );
        expect(service.data).toEqual({ message: "User created" });
      });
    });
  });
});
