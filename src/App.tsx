import { useLocation } from "react-router-dom";
import "./App.css";
import AuthProvider from "./contexts/AuthContext";
import Sidebar from "./components/Sidebar";
import { Router } from "./routes/routes";

function App() {
  const location = useLocation();
  const isRouteSidebar =
    location.pathname === "/login" || location.pathname === "/cadastro";

  return (
    <AuthProvider>
      <div className="h-full relative">
        {!isRouteSidebar && (
          <div className="h-full lg:flex lg:w-[15rem] lg:flex-col lg:fixed lg:inser-y-0 z-[80] ">
            <Sidebar />
          </div>
        )}
      </div>
      <Router />
    </AuthProvider>
  );
}

export default App;
