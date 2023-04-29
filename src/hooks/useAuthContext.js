import { useContext } from "react";
import { AuthContext } from "../context/userContex";

export const useAuthContext = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw Error('useAuthContext must be used inside an Authcontextprovider')
    }

    return context
}