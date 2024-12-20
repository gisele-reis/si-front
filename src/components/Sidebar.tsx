import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartPulse } from "@fortawesome/free-solid-svg-icons";

export default function Sidebar() {
  const { logout } = useAuth();

  const links = [
    {
      name: "Home",
      path: "/home",
    },
    {
      name: "Perfil",
      path: "/perfil",
    },
  ];

  const handleLogout = () => {
    if (window.confirm("Tem certeza que deseja sair?")) {
      logout();
    } else return null;
  };

  return (
    <div className="flex lg:flex-col h-16 w-screen lg:h-screen lg:min-w-[15rem] lg:max-w-[15rem] top-0 bg-[#844c81]  items-center lg:py-6 justify-between">
      <div className="flex flex-col gap-10">
        <div className="flex items-center justify-center lg:px-2">
          <FontAwesomeIcon
            icon={faHeartPulse}
            className="text-4xl text-[#edddee]"
          />
          <h1 className="text-center text-3xl font-bold text-[#edddee]">
            HealthCheck
          </h1>
        </div>
        <div className="lg:basis-1/2 flex lg:flex-col lg:justify-start items-center lg:w-full lg:px-3 gap-4 ">
          {links.map((link, index) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                to={link.path}
                key={index}
                className={`flex lg:w-full justify-center lg:justify-start items-center lg:py-4 transition ease-in-out gap-3 px-3 rounded-lg 
                          ${
                            isActive
                              ? "text-[#844c81] bg-[#edddee]"
                              : "text-[#edddee] hover:bg-[#edddee] hover:text-[#844c81]"
                          }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      </div>
      <div className="flex items-center justify-end lg:justify-center">
        <button
          onClick={handleLogout}
          className="flex py-2 px-2 mx-5 lg:m-0 lg:px-5 items-center self-end gap-4 text-[#edddee] hover:text-[#844c81] hover:bg-[#edddee] transition ease-in-out rounded-lg"
        >
          <p className="text-lg self-end lg:flex items-center gap-4 hidden ">
            Sair da conta
          </p>
        </button>
      </div>
    </div>
  );
}
