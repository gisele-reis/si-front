import axios from "axios";
import { useEffect, useState } from "react";

const Perfil = () => {
  const [data, setData] = useState<{
    name: string;
    username: string;
    peso: number;
    altura: number;
  }>({
    name: "",
    username: "",
    peso: 0,
    altura: 0,
  });

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log(token);
      if (token) {
        const decoded = JSON.parse(atob(token.split(".")[1]));
        console.log(decoded);
        const response = await axios.get(
          "http://localhost:3000/users/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(response.data);
      }
    } catch (erro) {
      console.log("Erro ao buscar os dados", erro);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [editar, setEditar] = useState(false);

  const handleEditar = () => {
    setEditar(true);
  };

  const handleSalvar = () => {
    setEditar(false);
    alert("Informações alteradas com sucesso!");
  };

  return (
    <div className="flex items-center min-h-screen ml-[15rem] bg-[#F2F2F2]">
      <div className="grid w-full h-screen">
        <div className="justify-items-start mt-8 ml-8">
          <h1 className="text-4xl font-bold leading-tight text-[#844c81]">
            Minhas Informações
          </h1>
        </div>
        <div className="flex flex-col gap-4 place-self-center">
          <div className="flex gap-4">
            <h1 className="font-bold leading-tight">Nome:</h1>
            <input
              disabled={!editar}
              value={data.name}
              className="bg-[#edddee] p-1 focus:outline-[#844c81]"
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
          </div>
          <div className="flex gap-4">
            <h1 className="font-bold leading-tight ">E-mail:</h1>
            <input
              disabled={!editar}
              value={data.username}
              className="bg-[#edddee] p-1 focus:outline-[#844c81]"
              onChange={(e) => setData({ ...data, username: e.target.value })}
            />
          </div>
          <div className="flex gap-7">
            <h1 className="font-bold leading-tight ">Peso:</h1>
            <input
              disabled={!editar}
              value={data.peso}
              className="bg-[#edddee] p-1 focus:outline-[#844c81]"
              onChange={(e) =>
                setData({ ...data, peso: Number(e.target.value) })
              }
            />
          </div>
          <div className="flex gap-4">
            <h1 className="font-bold leading-tight ">Altura:</h1>
            <input
              disabled={!editar}
              value={data.altura}
              className="bg-[#edddee] p-1 focus:outline-[#844c81]"
              onChange={(e) =>
                setData({ ...data, altura: Number(e.target.value) })
              }
            />
          </div>
        </div>
        <div className="flex gap-4 self-end justify-center mb-8">
          <button
            disabled={!editar}
            onClick={handleSalvar}
            className="bg-[#844c81] text-[#edddee] px-4 py-2 rounded-lg mt-8 disabled:opacity-50"
          >
            Salvar
          </button>
          <button
            disabled={editar}
            onClick={handleEditar}
            className="bg-[#844c81] text-[#edddee] px-4 py-2 rounded-lg mt-8 disabled:opacity-50"
          >
            Editar
          </button>
          <button className="bg-[#844c81] text-[#edddee] px-4 py-2 rounded-lg mt-8">
            Excluir Conta
          </button>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
