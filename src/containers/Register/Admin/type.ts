type FieldWithValidation = {
  value: string;
  validated: boolean;
};

export type Phone = {
  areaCode: number;
  number: string;
  formatted: string;
};

export type AdminInfoForm = {
  cpf: FieldWithValidation;
  adminName: string;
  firstName: string;
  lastName: string;
  occupation: string;
  email: FieldWithValidation;
  phone1: Phone;
  phone2: Phone;
};

export type AdminPasswordForm = {
  password: FieldWithValidation;
  passwordConfirmation: FieldWithValidation;
  confirmCheckboxChecked: boolean;
};

export type AdminForm = {
  info: AdminInfoForm;
  password: AdminPasswordForm;
};

// eslint-disable-next-line no-unused-vars
export type handleAdminFormChangeF = (form: "info" | "password", value: AdminPasswordForm | AdminInfoForm) => void;
