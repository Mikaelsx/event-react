import { Navigate } from "react-router-dom";

export const PrivateRoute = ({children, redirectTo = "/" }) => {
    const iaAuthenticated = localStorage.getItem("token") !== null;
    
    return iaAuthenticated ? children : <Navigate to={redirectTo} />
}