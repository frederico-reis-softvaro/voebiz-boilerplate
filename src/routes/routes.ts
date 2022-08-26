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
];
