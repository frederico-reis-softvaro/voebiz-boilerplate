export interface RoutesState {
  id?: string;
  labelId?: string;
  progress?: number;
  traductionKey: string;
  path: string;
  algorítmos: any;
  fieldKey: string;
  subFieldKey?: string;
  hide?: boolean;
  parent?: string;
}

export const routes = [
  {
    labelId: "lbl_organizationName",
    progress: 0,
    traductionKey: "organization_name",
    path: "/company",
    fieldKey: "organizationName",
    subFieldKey: "",
    parent: "company",
  },
  {
    labelId: "lbl_cnpj",
    progress: 0,
    traductionKey: "cnpj",
    path: "/company",
    fieldKey: "organizationName",
    parent: "company",
  },
  {
    labelId: "email",
    progress: 0,
    traductionKey: "email",
    path: "/email",
    fieldKey: "email",
    parent: "about",
  },
  {
    labelId: "address",
    progress: 1,
    traductionKey: "search_address",
    path: "/company",
    fieldKey: "zipCode",
    parent: "address",
    hide: true,
  },
  {
    labelId: "address",
    progress: 1,
    traductionKey: "zipCode",
    path: "/endereco",
    fieldKey: "dynamic_address",
    parent: "address",
    hide: false,
  },
  {
    progress: 2,
    traductionKey: "password",
    path: "/senha",
    fieldKey: "password",
    parent: "security",
  },
  {
    progress: 2,
    traductionKey: "phone",
    path: "/telefone",
    fieldKey: "phoneMasked",
    parent: "security",
  },
  {
    progress: 3,
    traductionKey: "",
    path: "/regulamentos",
    fieldKey: "",
    subFieldKey: "",
    private: true,
    parent: "terms",
  },
  {
    progress: 3,
    traductionKey: "feedback",
    path: "/finalizacao",
    fieldKey: "feedback",
    subFieldKey: "document",
    private: true,
    parent: "address",
    hide: true,
  },
];
