import axios from "axios";
import { useEffect, useState } from "react";

const Home = () => {
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

  const imc = parseFloat(data.peso) / (parseFloat(data.altura) / 100) ** 2;
  const imcRounded = imc.toFixed(2);
  const getIMCCategory = (imc: number) => {
    if (imc < 18.5) return "Abaixo do Peso";
    if (imc >= 18.5 && imc < 24.9) return "Peso Normal";
    if (imc >= 25 && imc < 29.9) return "Sobrepeso";
    if (imc >= 30 && imc < 34.9) return "Obesidade";
    if (imc >= 35 && imc < 39.9) return "Obesidade Grau II";
    return "Obesidade Grau III ou obesidade mórbida";
  };

  const imcCategory = getIMCCategory(imc);
  return (
    <div className="flex items-center min-h-screen bg-[#F2F2F2]">
      <div className="flex flex-col gap-5 h-screen lg:ml-[15rem] w-full ">
        <div className="justify-items-start mt-8 ml-8">
          <h1 className="text-4xl font-bold leading-tight text-[#844c81]">
            Monitor de saúde
          </h1>
        </div>
        <div className="justify-items-start mt-8 ml-8">
          <h1 className="text-4xl font-bold leading-tight text-[#844c81]">
            Cáculo de IMC
          </h1>
          <hr className="mt-2    w-[90%]" />

          <div className="flex flex-col mt-6 gap-4">
            <div className="flex flex-row items-center gap-2">
              <p className="font-medium text-[#844c81] text-2xl">Seu IMC é:</p>
              <p className="text-2xl font-light">{imcRounded}</p>
            </div>
            <div className="flex flex-row items-center gap-2">
              <p className="font-medium text-[#844c81] text-2xl">
                Seu IMC está:
              </p>
              <p className="text-2xl font-light">{imcCategory}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
