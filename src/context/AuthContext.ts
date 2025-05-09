import { createContext } from "react";
import { AuthContextType } from "../hooks/useAuth";

const AuthContext = createContext<AuthContextType | null>(null);

export default AuthContext;