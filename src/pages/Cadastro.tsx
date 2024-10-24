import { useState } from "react";
import Modal from "../components/Modal";
import { useNavigate } from "react-router-dom";

const Cadastro = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [peso, setPeso] = useState<number | null>();
  const [altura, setAltura] = useState<number | null>();
  const [acceptedTerms, setAcceptedTerms] = useState<string[]>([]);
  const [modalOpened, setModalOpened] = useState(false);

  const [error, setError] = useState("");

  const [openModalTerms, setOpenModalTerms] = useState(false);

  const handlePesoChange = (e: any) => {
    let value = e.target.value;
    value = value.replace(",", ".");
    setPeso(parseFloat(value));
  };

  const handleAlturaChange = (e: any) => {
    const value = e.target.value.replace(/\D/g, "");
    setAltura(value ? parseInt(value) : null);
  };

  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("As senhas devem ser iguais.");
      return;
    }
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
          acceptedTerms: acceptedTerms,
        }),
      });

      if (!response.ok) {
        const responseData = await response.json();
        setError(
          responseData.message ||
            "Ocorreu um erro ao processar sua solicitação."
        );
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
      console.log(response);
      navigate("/login");
    } catch (error) {
      setError("Erro na autenticação. Verifique suas credenciais.");
      console.error(error);
    }
  };

  const openTermsModal = () => {
    setOpenModalTerms(true);
    setModalOpened(true);
  };

  return (
    <div className="flex items-center flex-col justify-center min-h-screen h-screen w-screen py-6 gap-10 bg-[#F2F2F2]">
      <h1 className="text-7xl font-bold leading-tight text-[#844c81]">
        Cadastre-se
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-1/2 items-center justify-center px-6 py-10 bg-white rounded-xl shadow-lg border gap-6"
      >
        <div className="grid grid-cols-2 pl-8 w-full">
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
        <div className="flex gap-2 pl-8 w-full" onClick={openTermsModal}>
          <label className="">
            Para continuar você deve aceitar os{" "}
            <button
              type="button"
              onClick={openTermsModal}
              className="text-[#844c81] font-bold"
            >
              Termos de uso
            </button>
          </label>
        </div>
        <button
          type="submit"
          className="bg-[#844c81] py-2 px-10 font-semibold rounded-[10px] hover:bg-[#bd80b8] transition duration-300 text-white w-[60%] disabled:opacity-50"
          disabled={!modalOpened}
        >
          Cadastrar
        </button>
        {error && <p className="text-red-500">{error}</p>}
        <span className="text-[15px]">
          Já possui uma conta?{" "}
          <a href="/login" className="text-[#844c81] font-bold">
            Entrar
          </a>
        </span>
      </form>
      <Modal
        isOpen={openModalTerms}
        onClose={() => setOpenModalTerms(false)}
        setTermsAccepted={setAcceptedTerms}
      />
    </div>
  );
};

export default Cadastro;
