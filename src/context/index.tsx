import React, { FC } from "react";

import { UserProvider } from "./UserContext";

const AppProvider: FC = ({ children }) => <UserProvider>{children}</UserProvider>;

export default AppProvider;
