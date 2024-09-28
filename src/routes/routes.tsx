import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Cadastro from "../pages/Cadastro";
import IsLogged from "./IsLogged";
import PrivateRoutes from "./PrivateRoutes";
import Home from "../pages/Home";
import Perfil from "../pages/Perfil";

export function Router() {
    return (
        <Routes>
            <Route element={<IsLogged />}>
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro" element={<Cadastro />} />

            </Route>
            <Route element={<PrivateRoutes />}>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/perfil" element={<Perfil />} />
            </Route>
        </Routes>
    )
}