import React from "react";
import { render } from "src/tests/utils";

import Routes from ".";

import { routes } from "./routes";

jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom");

  return {
    __esModule: true,
    ...originalModule,
    useParams: jest.fn(),
    useHistory: jest.fn(),
  };
});

describe("PageSuccess:", () => {
  it("should render component", async () => {
    render(<Routes />, {});
    expect(routes).toStrictEqual([
      {
        fieldKey: "organizationName",
        labelId: "lbl_organizationName",
        parent: "company",
        path: "/company",
        progress: 0,
        subFieldKey: "",
        traductionKey: "organization_name",
      },
      {
        fieldKey: "organizationName",
        labelId: "lbl_cnpj",
        parent: "company",
        path: "/company",
        progress: 0,
        traductionKey: "cnpj",
      },
      { fieldKey: "email", labelId: "email", parent: "about", path: "/email", progress: 0, traductionKey: "email" },
      {
        fieldKey: "zipCode",
        hide: true,
        labelId: "address",
        parent: "address",
        path: "/company",
        progress: 1,
        traductionKey: "search_address",
      },
      {
        fieldKey: "dynamic_address",
        hide: false,
        labelId: "address",
        parent: "address",
        path: "/endereco",
        progress: 1,
        traductionKey: "zipCode",
      },
      { fieldKey: "password", parent: "security", path: "/senha", progress: 2, traductionKey: "password" },
      { fieldKey: "phoneMasked", parent: "security", path: "/telefone", progress: 2, traductionKey: "phone" },
      {
        fieldKey: "",
        parent: "terms",
        path: "/regulamentos",
        private: true,
        progress: 3,
        subFieldKey: "",
        traductionKey: "",
      },
      {
        fieldKey: "feedback",
        hide: true,
        parent: "address",
        path: "/finalizacao",
        private: true,
        progress: 3,
        subFieldKey: "document",
        traductionKey: "feedback",
      },
    ]);
  });
});
