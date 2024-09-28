import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import IAuthContextType from "../interfaces/IAuthContextType";

export default function useAuth(): IAuthContextType {
    const context = useContext(AuthContext);
    if(context === undefined) {
        throw new Error("useAuth deve ser usado dentro de um AuthProvider")
    }
    return context;
}