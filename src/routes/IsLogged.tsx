import useAuth from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

export default function IsLogged() {
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />
}