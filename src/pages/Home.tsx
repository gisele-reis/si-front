import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import useAuth from "../hooks/useAuth";

const Home = () => {
  const [data, setData] = useState<{
    id: string;
    name: string;
    username: string;
    peso: string;
    altura: string;
  }>({
    id: "",
    name: "",
    username: "",
    peso: "",
    altura: "",
  });

  const [pendingTerms, setPendingTerms] = useState<
    { id: string; description: string; details: string; isMandatory: boolean }[]
  >([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [detailModalContent, setDetailModalContent] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState<string[]>([]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await axios.get(
          "http://localhost:3000/users/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setData({
          ...response.data,
          peso: response.data.peso.toString(),
          altura: response.data.altura.toString(),
        });
        fetchPendingTerms(token, response.data.id);
      }
    } catch (error) {
      console.log("Erro ao buscar os dados", error);
    }
  };

  const fetchPendingTerms = async (token: string, userId: string) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/users/${userId}/pending-terms`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.data.length > 0) {
        setPendingTerms(response.data);
        setIsModalOpen(true);
      }
    } catch (error) {
      console.log("Erro ao buscar termos pendentes", error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const { logout } = useAuth();

  const handleLogout = () => {
    if (
      window.confirm(
        "Você deve aceitar os termos obrigatórios para continuar na aplicação, caso feche você será redirecionado para tela de login!"
      )
    ) {
      logout();
    } else return null;
  };

  const handleOpenDetailModal = (details: string) => {
    setDetailModalContent(details);
    setIsDetailModalOpen(true);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setDetailModalContent("");
  };

  const handleRemovePendingTerm = async (termId: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token não encontrado");

      const response = await axios.delete(
        `http://localhost:3000/users/${data.id}/pending-terms/${termId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        setPendingTerms((prevTerms) => {
          const updatedTerms = prevTerms.filter((term) => term.id !== termId);

          if (updatedTerms.length === 0) {
            handleCloseModal();
          }

          return updatedTerms;
        });
        console.log("Termo pendente removido com sucesso.");
      }
    } catch (error) {
      console.error("Erro ao remover termo pendente:", error);
    }
  };

  const handleAcceptTerms = async () => {
    const mandatoryTermsIds = pendingTerms
      .filter((term) => term.isMandatory)
      .map((term) => term.id);

    const allMandatoryAccepted = mandatoryTermsIds.every((id) =>
      acceptedTerms.includes(id)
    );

    if (!allMandatoryAccepted) {
      alert("Você deve aceitar todos os termos obrigatórios para continuar.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const userId = data.id;

      const response = await axios.post(
        "http://localhost:3000/terms/accept",
        {
          userId: userId,
          termIds: acceptedTerms,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        console.log("Termos aceitos com sucesso!");
        handleCloseModal();
      }
    } catch (error) {
      console.error("Erro ao aceitar os termos:", error);
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

  const water = parseFloat(data.peso) * 35;

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
            Cálculo de IMC
          </h1>
          <hr className="mt-2 w-[90%]" />

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
            <div className="flex flex-row items-center gap-2">
              <p className="font-medium text-[#844c81] text-2xl">
                Quantidade de água recomendada por dia:
              </p>
              <p className="text-2xl font-light">{water} ml</p>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded shadow-lg">
            <h2 className="text-lg font-bold">Novos Termos para Aceitar</h2>
            <div className="mt-4">
              {pendingTerms.map((term, index) => (
                <div key={index} className=" flex flex-col items-center mb-2">
                  <div>
                    <input
                      type="checkbox"
                      id={`term-${index}`}
                      value={term.id}
                      required={term.isMandatory}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setAcceptedTerms((prev) => [...prev, term.id]);
                        } else {
                          setAcceptedTerms((prev) =>
                            prev.filter((id) => id !== term.id)
                          );
                        }
                      }}
                    />
                    <label htmlFor={`term-${index}`} className="ml-2">
                      {term.description}
                      {term.isMandatory && (
                        <span className="text-gray-500 ml-1">
                          (obrigatório)
                        </span>
                      )}
                      {!term.isMandatory && (
                        <span className="text-gray-500 ml-1">(opcional)</span>
                      )}
                      <button
                        type="button"
                        onClick={() => handleOpenDetailModal(term.details)}
                        className="text-[#844c81] ml-2 font-bold"
                      >
                        Mais informações
                      </button>
                    </label>
                  </div>
                  <div className="mt-4">
                    <button
                      onClick={handleAcceptTerms}
                      className="bg-[#844c81] text-white px-4 py-2 rounded"
                    >
                      Aceitar Termos
                    </button>
                    {term.isMandatory && (
                      <button
                        onClick={handleLogout}
                        className="ml-2 bg-gray-300 px-4 py-2 rounded"
                      >
                        Fechar
                      </button>
                    )}
                    {!term.isMandatory && (
                      <button
                        onClick={() => handleRemovePendingTerm(term.id)}
                        className="ml-2 bg-gray-300 px-4 py-2 rounded"
                      >
                        Fechar
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Home;
