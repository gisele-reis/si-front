import { useState, useEffect } from "react";
import Modal from "../components/Modal";
import { useNavigate } from "react-router-dom";

const Cadastro = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [peso, setPeso] = useState<number | null>(null);
  const [altura, setAltura] = useState<number | null>(null);
  const [acceptedTerms, setAcceptedTerms] = useState<string[]>([]); // Agora vai armazenar os IDs dos itens aceitos
  const [modalOpened, setModalOpened] = useState(false);
  const [modalTermDetails, setModalTermDetails] = useState<any>(null);
  const [error, setError] = useState("");
  const [terms, setTerms] = useState<Term[]>([]);

  const navigate = useNavigate();

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


  const handlePesoChange = (e: any) => {
    let value = e.target.value;
    value = value.replace(",", ".");
    setPeso(parseFloat(value));
  };

  const handleAlturaChange = (e: any) => {
    const value = e.target.value.replace(/\D/g, "");
    setAltura(value ? parseInt(value) : null);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!terms || terms.length === 0) {
      alert("Termos não carregados corretamente.");
      return;
    }

    const allMandatoryAccepted = terms.every((term) => {
      if (!term.items || !Array.isArray(term.items)) {
        console.error(`Itens para o termo "${term.title}" não encontrados ou estão em formato errado.`, term);
        return false;
      }

      return term.items.every((item: ConsentItem) => {
        return !item.isMandatory || acceptedTerms.includes(item.id);
      });
    });

    console.log("Resultado da verificação dos termos obrigatórios:", allMandatoryAccepted);
    if (!allMandatoryAccepted) {
      alert("Você deve aceitar todos os termos obrigatórios.");
      return;
    }
    if (password !== confirmPassword) {
      alert("As senhas devem ser iguais.");
      return;
    }
    console.log("Dados a serem enviados:", {
      name,
      username: email,
      password,
      peso,
      altura,
      acceptedItems: acceptedTerms,
    });
    try {
      const response = await fetch("http://localhost:3000/users/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          username: email,
          password: password,
          peso: peso,
          altura: altura,
          acceptedItems: acceptedTerms,
        }),
      });

      if (!response.ok) {
        const responseData = await response.json();
        setError(responseData.message || "Erro ao processar o cadastro.");
        window.alert(error);
        return;
      }
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setPeso(null);
      setAltura(null);
      setAcceptedTerms([]);

      window.alert("Usuário cadastrado com sucesso!");
      navigate("/login");
    } catch (error) {
      setError("Erro na autenticação. Verifique suas credenciais.");
      console.error(error);
    }
  };

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

  const isFormValid = () => {
    return terms.every((term) =>
      term.items.every((item) =>
        !item.isMandatory || acceptedTerms.includes(item.id)
      )
    );
  };


  return (
    <div className="flex items-center flex-col justify-center py-6 gap-10 bg-[#F2F2F2] min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-[80%] items-center justify-center px-2 py-4 bg-white rounded-xl shadow-lg border gap-6"
      >
        <h1 className="text-4xl font-bold text-[#844c81]">Cadastre-se</h1>
        {/* Formulário de Dados Pessoais */}
        <div className="grid grid-cols-2 pl-8 w-full">
          {/* Nome */}
          <div className="flex flex-col w-[95%]">
            <label className="mb-2 text-xl font-medium">
              Nome <a className="text-red-500">*</a>
            </label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="bg-[#eeeeee] shadow-sm rounded focus:outline-[#844c81] px-5 py-2"
            />
          </div>
          {/* Email */}
          <div className="flex flex-col w-[95%]">
            <label className="mb-2 text-xl font-medium">
              E-mail <a className="text-red-500">*</a>
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-[#eeeeee] shadow-sm rounded focus:outline-[#844c81] px-5 py-2"
            />
          </div>
        </div>
        {/* Senha */}
        <div className="grid grid-cols-2 pl-8 w-full">
          <div className="flex flex-col w-[95%]">
            <label className="mb-2 text-xl font-medium">
              Senha <a className="text-red-500">*</a>
            </label>
            <input
              type="password"
              name="senha"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-[#eeeeee] shadow-sm rounded focus:outline-[#844c81] px-5 py-2"
            />
          </div>
          <div className="flex flex-col w-[95%]">
            <label className="mb-2 text-xl font-medium">
              Confirmar Senha <a className="text-red-500">*</a>
            </label>
            <input
              type="password"
              name="confirmPassword"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="bg-[#eeeeee] shadow-sm rounded focus:outline-[#844c81] px-5 py-2"
            />
          </div>
        </div>
        {/* Peso e Altura */}
        <div className="grid grid-cols-2 pl-8 w-full">
          <div className="flex flex-col w-[95%]">
            <label className="mb-2 text-xl font-medium">
              Peso <a className="text-red-500">*</a>
            </label>
            <input
              type="text"
              name="peso"
              required
              value={peso || ""}
              onChange={handlePesoChange}
              className="bg-[#eeeeee] shadow-sm rounded focus:outline-[#844c81] px-5 py-2"
            />
          </div>
          <div className="flex flex-col w-[95%]">
            <label className="mb-2 text-xl font-medium">
              Altura <a className="text-red-500">*</a>
            </label>
            <input
              type="text"
              name="altura"
              required
              value={altura || ""}
              onChange={handleAlturaChange}
              className="bg-[#eeeeee] shadow-sm rounded focus:outline-[#844c81] px-5 py-2"
            />
          </div>
        </div>
        {/* Termos de uso */}
        <div className="flex flex-col w-full ml-16">
          <span>Ao me cadastrar eu declaro li e concordo com os termos: </span>
          {terms.map((term, index) => (
            <span
              key={term.id}
              className="text-[#844c81] hover:text-[#5f3e61] font-semibold"
            >
              <button onClick={() => openTermsModal(term)} type="button">
                {term.title}
              </button>
              {index < terms.length - 1 && ", "}
            </span>
          ))}
        </div>
        <button
          type="submit"
          className="bg-[#844c81] hover:bg-[#5f3e61] text-white w-[90%] py-3 px-6 rounded-md"
          disabled={!isFormValid() || acceptedTerms.length === 0}
          onClick={(e) => {
            if (!(isFormValid() && acceptedTerms.length > 0)) {
              e.preventDefault();
              alert("Você deve ler e aceitar os termos.");
            }
          }}
        >
          Cadastrar
        </button>
      </form>

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
  );
};

export default Cadastro;
