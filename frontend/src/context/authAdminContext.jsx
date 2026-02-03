import { createContext, useContext } from "react";

export const AuthAdminContext = createContext(null);

export const useAuthAdminContext = () => useContext(AuthAdminContext)