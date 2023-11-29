import { createContext } from "react";
import { jwtDecode } from "jwt-decode";

export const UserContext = createContext(null);

export const userDecodeToken = (theToken) => {
    const decoded = jwtDecode(theToken);

    return {
    role: decoded.role,
    name: decoded.name,
    userId: decoded.jti,
    token: theToken}
}