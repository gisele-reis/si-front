import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "../components/Modal";

const Perfil = () => {
  const [data, setData] = useState<{
    name: string;
    username: string;
    peso: string;
    altura: string;
    photoUrl: string;
  }>({
    name: "",
    username: "",
    peso: "",
    altura: "",
    photoUrl: "",
  });
  interface Term {
    id: string;
    title: string;
    description: string;
    items: ConsentItem[];
  }

  interface ConsentItem {
    id: string;
    description: string;
    isMandatory: boolean;
  }
  const [erro, setError] = useState("");
  const [fotoPerfil, setFotoPerfil] = useState<File | null>(null);
  const [acceptedTerms, setAcceptedTerms] = useState<string[]>([]); // Agora vai armazenar os IDs dos itens aceitos
  const [modalOpened, setModalOpened] = useState(false);
  const [modalTermDetails, setModalTermDetails] = useState<any>(null);
  const [terms, setTerms] = useState<Term[]>([]);

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

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const response = await fetch("http://localhost:3000/terms");
        if (response.ok) {
          const data = await response.json();
          console.log("Resposta da API (Termos):", data);

          const termsWithItems = data.map((term: any) => ({
            ...term,
            items: term.items || [],
          }));
          setTerms(termsWithItems);
        } else {
          console.error("Falha ao carregar os termos.");
        }
      } catch (error) {
        console.error("Erro ao carregar os termos:", error);
      }
    };

    fetchTerms();
  }, []);

  const openTermsModal = async (term: Term) => {
    try {
      const response = await fetch(`http://localhost:3000/terms/${term.id}/items`);
      const items: ConsentItem[] = await response.json();
      setModalTermDetails({ ...term, items });
      setModalOpened(true);
    } catch (error) {
      console.error("Erro ao carregar os itens de consentimento", error);
    }
  };

  const handleItemChange = (itemIds: string[]) => {
    console.log("Itens aceitos atualizados pelo modal:", itemIds);
    setAcceptedTerms((prev) => {
      const uniqueTerms = [...new Set([...prev, ...itemIds])];
      console.log("Estado final dos itens aceitos:", uniqueTerms);
      return uniqueTerms;
    });
  };

  const [editar, setEditar] = useState(false);
  const [cancelar, setCancelar] = useState(true);

  const handleEditar = () => {
    setEditar(true);
    setCancelar(false);
  };

  const handleCancelar = () => {
    setCancelar(true);
    setEditar(false);
    window.location.reload();
  };

  const handleSalvar = async () => {
    const pesoNumerico = parseFloat(data.peso.replace(",", "."));
    const alturaNumerica = parseFloat(data.altura.replace(",", "."));

    if (!isNaN(pesoNumerico) && !isNaN(alturaNumerica)) {
      try {
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

            const response = await fetch(
              `http://localhost:3000/users/${userId}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                  name: data.name,
                  username: data.username,
                  peso: parseFloat(data.peso.replace(",", ".")),
                  altura: parseFloat(data.altura.replace(",", ".")),
                }),
              }
            );

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
      } catch (error) {
        console.log(error);
        setError("Erro ao alterar informações");
        window.alert(erro);
      }
    } else {
      alert("Valores inválidos para peso ou altura.");
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const parts = token.split(".");
        if (parts.length !== 3) {
          console.error("Token JWT malformado");
          return;
        }
        const payload = parts[1];
        if (window.confirm("Tem certeza que deseja excluir seu dados?")) {
          try {
            const decoded = JSON.parse(atob(payload));
            const userId = decoded.sub;
            const response = await fetch(
              `http://localhost:3000/users/${userId}`,
              {
                method: "DELETE",
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            if (response.ok) {
              const responseData = await response.json();
              console.log("Dados excluídos:", responseData);
              alert("Informações excluídas com sucesso!");
              localStorage.removeItem("token");
              localStorage.removeItem("username");
              window.location.reload();
            } else {
              const responseData = await response.json();
              console.error("Erro ao excluir os dados:", responseData);
              alert("Erro ao excluir os dados. Por favor, tente novamente.");
              window.location.reload();
            }
          } catch (error) {
            console.error("Erro ao decodificar o token", error);
          }
        } else return null;
      }
    } catch (error) {
      console.log(error);
      setError("Erro ao excluir dados");
      window.alert(erro);
    }
  };

  const handlePesoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(",", ".");
    if (/^\d*\.?\d{0,2}$/.test(value)) {
      setData({ ...data, peso: value });
    }
  };

  const handleAlturaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(",", ".");
    if (/^\d*\.?\d{0,2}$/.test(value)) {
      setData({ ...data, altura: value });
    }
  };

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      setFotoPerfil(file);
      const imageUrl = URL.createObjectURL(file);
      setData((prevData) => ({ ...prevData, photoUrl: imageUrl }));
    }
  };

  const handleSavePhoto = async () => {
    if (!fotoPerfil) return;

    const formData = new FormData();
    formData.append("file", fotoPerfil);

    try {
      const token = localStorage.getItem("token");
      if (token) {
        const parts = token.split(".");
        if (parts.length !== 3) {
          console.error("Token JWT malformado");
          return;
        }

        const payload = parts[1];
        const decoded = JSON.parse(atob(payload));
        const userId = decoded.sub;

        const response = await axios.post(
          `http://localhost:3000/users/${userId}/upload-photo`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("Foto de perfil atualizada com sucesso!", response.data);
        alert("Foto de perfil atualizada com sucesso!");
        fetchData();
      }
    } catch (error) {
      console.error("Erro ao atualizar a foto de perfil:", error);
      alert("Erro ao atualizar a foto de perfil. Tente novamente.");
    }
  };

  return (
    <div className="flex items-center min-h-screen bg-[#F2F2F2]">
      <div className="flex flex-col gap-5 h-screen lg:ml-[15rem] w-full ">
        <div className="justify-items-start mt-8 ml-8">
          <h1 className="text-4xl font-bold leading-tight text-[#844c81]">
            Minhas Informações
          </h1>
        </div>

        <div className="flex gap-8 ml-8 mt-4">
          <div className="flex flex-row gap-8 items-center">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#844c81]">
              <img
                src={data.photoUrl || "/path/to/default/image.png"}
                alt="Foto de Perfil"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-row items-center gap-2">
                <h2 className="text-2xl font-bold"> {data.name}</h2>
              </div>
              <div className="flex flex-row items-center gap-2">
                <p className="font-medium ">Email:</p>
                <p className="">{data.username}</p>
              </div>
            </div>
          </div>
        </div>
        <hr className="ml-10 w-[80%]" />

        <div className="flex flex-col gap-4 ml-8 mt-8">
          <h3 className="text-2xl font-bold text-[#844c81]">
            Informações pessoais
          </h3>
          <div className="flex gap-4 items-center">
            <h1 className="font-bold">Peso:</h1>
            <input
              disabled={!editar}
              value={data.peso}
              className="text-xl"
              onChange={handlePesoChange}
            />
          </div>
          <div className="flex gap-4 items-center">
            <h1 className="font-bold">Altura:</h1>
            <input
              disabled={!editar}
              value={data.altura}
              className="text-xl focus:outline-[#844c81]"
              onChange={handleAlturaChange}
            />
          </div>
        </div>
        <div className="flex gap-4 items-center ml-8">
          <h1 className="font-bold">Foto de perfil:</h1>
          <input type="file" accept="image/*" onChange={handleUpload} />
        </div>
        <button
          onClick={handleSavePhoto}
          className="bg-[#844c81] w-[20%] text-[#edddee] px-4 py-2 rounded-lg ml-8"
        >
          Inserir foto de perfil
        </button>
        <div className="flex gap-4 ml-10   mb-8">
          <button
            onClick={!editar ? handleEditar : handleCancelar}
            className="bg-[#844c81] text-[#edddee] px-4 py-2 rounded-lg mt-8"
          >
            {!editar ? "Editar" : "Cancelar"}
          </button>
          <button
            disabled={cancelar}
            onClick={handleSalvar}
            className="bg-[#844c81] text-[#edddee] px-4 py-2 rounded-lg mt-8 disabled:opacity-50"
          >
            Salvar
          </button>
          <button
            onClick={handleDelete}
            className="bg-[#844c81] text-[#edddee] px-4 py-2 rounded-lg mt-8"
          >
            Excluir Conta
          </button>
        </div>
        <div className="flex flex-col w-full ml-8">
          <span className="text-2xl text-[#844c81] font-semibold">Meus termos </span>
          {terms.map((term, index) => (
            <span
              key={term.id}
              className="text-[#4b76db] hover:text-[#304d91] font-semibold"
            >
              <button onClick={() => openTermsModal(term)} type="button">
                {term.title}
              </button>
              {index < terms.length - 1 && ", "}
            </span>
          ))}
        </div>
        {modalOpened && modalTermDetails && (
          <Modal
            isOpen={modalOpened}
            onClose={() => setModalOpened(false)}
            title={modalTermDetails.title}
            description={modalTermDetails.description}
            items={modalTermDetails.items}
            onItemChange={handleItemChange}
            acceptedTerms={acceptedTerms}
          />
        )}
      </div>
    </div>
  );
};

export default Perfil;
