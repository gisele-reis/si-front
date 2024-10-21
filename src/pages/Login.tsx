import { useState } from "react";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        username,
        password,
      });

      const { access_token } = response.data;

      login({ token: access_token, username });
    } catch (error) {
      console.error(error);
      setError("Erro na autenticação. Verifique suas credenciais.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F2F2F2]">
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="flex items-center gap-3 ">
          <h1 className="text-6xl font-bold leading-tight tracking-normal text-[#844c81] self-end uppercase">
            Health Check
          </h1>
        </div>
        <div className="flex w-[450px] items-center justify-center px-6 py-8 bg-white rounded-xl shadow-lg border">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-full items-center justify-between gap-8 px-4"
          >
            <div className="flex flex-col w-full gap-6">
              <div className="flex flex-row items-center gap-4 bg-[#eeeeee] shadow-sm w-full px-5 py-2 rounded">
                <FontAwesomeIcon icon={faUser} />
                <input
                  type="username"
                  className="h-[38px] bg-[#eeeeee] w-full text-xs  placeholder:text-[#404040] placeholder:text-sm focus:outline-none"
                  placeholder="E-mail"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-row items-center gap-4 bg-[#eeeeee] shadow-sm w-full px-5 py-2 rounded">
                <FontAwesomeIcon icon={faLock} />
                <input
                  type="password"
                  className="h-[38px] bg-[#eeeeee] w-full text-xs  placeholder:text-[#404040] placeholder:text-sm focus:outline-none"
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <div className="flex flex-col w-full items-center gap-2">
              <button
                type="submit"
                className="bg-[#844c81] h-[40px] w-[100%] font-semibold rounded-[10px] hover:bg-[#bd80b8] transition duration-300 text-white"
              >
                Entrar
              </button>
              <span className="text-[15px] mt-4">
                Ainda não possui uma conta?{" "}
                <a href="/cadastro" className="text-[#844c81] font-bold">
                  Cadastre-se
                </a>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
