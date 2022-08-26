import React, { createContext, FC, useState, useContext } from "react";

import SessionStorage from "../config/sessionStorage";

type DocumentType = {
  preferential: boolean;
  type: string;
  number: string;
};
type PhoneType = {
  type: string;
  verified: boolean;
  internationalCode: number;
  areaCode: number | string;
  number: string;
};
type ElectronicAddressType = {
  type: string;
  preferential: boolean;
  address: string;
};
export type AddressType = {
  type?: string;
  preferential: boolean;
  streetAddress?: string;
  streetAddressNumber?: string;
  complement?: string;
  zipCode: string;
  city?: string;
  state?: string;
  country?: string;
};
export type UserState = {
  apiDomain?: any;
  cnpj?: string;
  fantasyName: string;
  organizationName: string;
  mainActivity: string;
  adminName?: string;
  firstName?: string;
  lastName?: string;
  occupation?: string;
  socialReason?: string;
  password: string;
  passwordConfirmation: string;
  numberOfEmployees: string;
  annualBudgetforTravel: string;
  relationshipWithGOL: string;
  providedServicesToGol?: string;
  providedServicesToOthers?: string;
  HowMeetedProgram: string;
  smilesToken?: any;
  addressList?: AddressType;
  documentList: DocumentType[];
  phoneList?: PhoneType[];
  phoneNumber1?: string;
  phoneNumber2?: string;
  electronicAddressList?: ElectronicAddressType[];
};
interface IUserContext {
  data: UserState;
  handler(state: UserState): void;
}
const INITIAL_STATE = {};
const UserContext = createContext<IUserContext>({} as IUserContext);

const UserProvider: FC = ({ children }) => {
  const [data, setData] = useState<UserState>(() => {
    const dataStorage = sessionStorage.getItem(SessionStorage.key) as any;
    if (dataStorage) {
      return JSON.parse(dataStorage);
    }
    const storage = INITIAL_STATE;
    sessionStorage.setItem(SessionStorage.key, JSON.stringify(storage));
    return storage;
  });
  const handler = (state: UserState) => {
    sessionStorage.setItem(SessionStorage.key, JSON.stringify({ ...data, ...state }));
    setData({ ...data, ...state });
  };

  return <UserContext.Provider value={{ data, handler }}>{children}</UserContext.Provider>;
};

const useUser = (): IUserContext => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("Context 'UserContext' does not exist");
  }
  return context;
};
export { UserProvider, useUser };
