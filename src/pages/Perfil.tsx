import axios from "axios";
import { useEffect, useState } from "react";

const Perfil = () => {
  const [data, setData] = useState<{
    name: string;
    username: string;
    peso: string;
    altura: string;
  }>({
    name: "",
    username: "",
    peso: "",
    altura: "",
  });

  const [erro, setError] = useState("");

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
        setData({
          ...response.data,
          peso: response.data.peso.toString(),
          altura: response.data.altura.toString(),
        });
      }
    } catch (erro) {
      console.log("Erro ao buscar os dados", erro);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [ editar, setEditar ] = useState(false);
  const [ cancelar, setCancelar ] = useState(true);

  const handleEditar = () => {
    setEditar(true);
    setCancelar(false);
  };

  const handleCancelar = () => {
    setCancelar(true);
    setEditar(false);
  }

  const handleSalvar = async () => {
    const pesoNumerico = parseFloat(data.peso.replace(",", "."));
    const alturaNumerica = parseFloat(data.altura.replace(",", "."));

    if (!isNaN(pesoNumerico) && !isNaN(alturaNumerica)) {
      try{
        const token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      const parts = token.split(".");
      if (parts.length !== 3) {
        console.error("Token JWT malformado");
        return;
      }

      const payload = parts[1];
      try {
        const decoded = JSON.parse(atob(payload));
        const userId = decoded.sub;

        const response = await fetch(`http://localhost:3000/users/${userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ 
            name: data.name,
            username: data.username,
            peso: parseFloat(data.peso.replace(",", ".")),
            altura: parseFloat(data.altura.replace(",", ".")),
          }) 
        });
        
        if (response.ok) {
          const responseData = await response.json();
          console.log("Dados atualizados:", responseData);
          alert("Informações atualizadas com sucesso!");
          window.location.reload();
        } else {
          const responseData = await response.json();
          console.error("Erro ao atualizar os dados:", responseData);
          alert("Erro ao atualizar os dados. Por favor, tente novamente.");
          window.location.reload();
        }
      } catch (error) {
        console.error("Erro ao decodificar o token", error);
      }
    }  
      } catch(error){
        console.log(error);
        setError("Erro ao alterar informações");
        window.alert(erro);
      }
    } else {
      alert("Valores inválidos para peso ou altura.");
    }
  };

  return (
    <div className="flex items-center min-h-screen bg-[#F2F2F2]">
      <div className="grid w-full h-screen lg:ml-[15rem]">
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
              required={editar}
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
            <h1 className="font-bold leading-tight">Peso:</h1>
            <input
              disabled={!editar}
              value={data.peso}
              className="bg-[#edddee] p-1 focus:outline-[#844c81]"
              onChange={(e) =>
                setData({ ...data, peso: e.target.value.replace(",", ".") })
              }
            />
          </div>
          <div className="flex gap-4">
            <h1 className="font-bold leading-tight">Altura:</h1>
            <input
              disabled={!editar}
              value={data.altura}
              className="bg-[#edddee] p-1 focus:outline-[#844c81]"
              onChange={(e) =>
                setData({ ...data, altura: e.target.value.replace(",", ".") })
              }
            />
          </div>
        </div>
        <div className="flex gap-4 self-end justify-center mb-8">
          <button
            disabled={cancelar}
            onClick={handleSalvar}
            className="bg-[#844c81] text-[#edddee] px-4 py-2 rounded-lg mt-8 disabled:opacity-50"
          >
            Salvar
          </button>
          <button
            onClick={!editar ? handleEditar : handleCancelar}
            className="bg-[#844c81] text-[#edddee] px-4 py-2 rounded-lg mt-8 disabled:opacity-50"
          >
            {!editar ? "Editar" : "Cancelar"}
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
