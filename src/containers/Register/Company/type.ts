/* eslint-disable camelcase */
export type TZipCodeItemsData = {
  zipCode: string;
  state: string;
  city: string;
  streetName: string;
  number: string;
  extra_info: string;
};

export type itemDescription = {
  id: string;
  description: string;
};

export type DropdownsItems = {
  employee_number: Dropdown;
  main_activity: Dropdown;
  business_budget: Dropdown;
  how_did_you_found_us: Dropdown;
};

export type Dropdown = {
  stateName: keyof InfoForm;
  items: itemDescription[];
};

export type InfoForm = {
  cnpj: string;
  fantasyName: string;
  socialReason: string;
  numberOfEmployees: string;
  mainActivity: string;
  annualBudgetforTravel: string;
  HowMeetedProgram: string;
  relationshipWithGOL: string;
  providedServicesToGol: string;
  providedServicesToOthers: string;
};

export type AddressForm = {
  zipCode: string;
  state: string;
  city: string;
  streetAddress: string;
  streetAddressNumber: string;
  complement: string;
  country: string;
};

export type CompanyForm = {
  info: InfoForm;
  address: AddressForm;
};

// eslint-disable-next-line no-unused-vars
export type handleFormChangeF = (form: "info" | "address", value: InfoForm | AddressForm) => void;

export type YesNoRadios = {
  title: string;
  name: keyof InfoForm;
};
