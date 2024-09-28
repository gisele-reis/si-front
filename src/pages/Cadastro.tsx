import { useState } from "react";

const Cadastro = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [peso, setPeso] = useState('');
    const [altura, setAltura] = useState('');
    const [termos, setTermos] = useState(false);

    const handlePesoChange = (e:any) => {
        let value = e.target.value.replace(/[^\d,]/g, ''); // Permite apenas números e ponto
        if (value.includes(',')) {
            const parts = value.split(',');
            value = `${parts[0]},${parts[1].slice(0, 2)}`; // Limita a 2 casas decimais
        }
        setPeso(value);
    };

    const handleAlturaChange = (e:any) => {
        let value = e.target.value.replace(/[^\d,]/g, ''); // Permite apenas números e ponto
        if (value.includes(',')) {
            const parts = value.split(',');
            value = `${parts[0]},${parts[1].slice(0, 2)}`; // Limita a 2 casas decimais
        }
        setAltura(value);
    };

    return (
        <div className="flex flex-col items-center justify-start h-screen w-screen py-6 gap-10">
            <h1 className="text-7xl lg:ml-[15rem] font-bold leading-tight text-[#844c81]">Cadastre-se</h1>
            <form className="flex flex-col lg:ml-[15rem] w-1/2 items-start justify-center px-6 py-10 bg-white rounded-xl shadow-lg border gap-6">
                <div className="grid grid-cols-2 pl-8 w-full">
                    <div className="flex flex-col w-2/3">
                        <label className="mb-2 text-xl font-medium">Nome <a className="text-red-500">*</a></label>
                        <input
                            type="text"  
                            name="name" 
                            value={name}
                            onChange={(e) => setName(e.target.value)} 
                            required 
                            className="bg-[#edddee] rounded focus:outline-[#844c81] p-1" 
                        />
                    </div>
                    <div className="flex flex-col w-2/3">
                        <label className="mb-2 text-xl font-medium">E-mail <a className="text-red-500">*</a></label>
                        <input 
                            type="email" 
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                            className="bg-[#edddee] rounded focus:outline-[#844c81] p-1" />
                    </div>
                </div>
                <div className="grid grid-cols-2 pl-8 w-full">
                    <div className="flex flex-col w-2/3">
                        <label className="mb-2 text-xl font-medium">Senha <a className="text-red-500">*</a></label>
                        <input 
                            type="password" 
                            name="senha" 
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} 
                            className="bg-[#edddee] rounded focus:outline-[#844c81] p-1" />
                    </div>
                    <div className="flex flex-col w-2/3">
                        <label className="mb-2 text-xl font-medium">Repita a Senha <a className="text-red-500">*</a></label>
                        <input 
                            type="password" 
                            name="senha2" 
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required 
                            className="bg-[#edddee] rounded focus:outline-[#844c81] p-1" />
                    </div>
                </div>
                <div className="grid grid-cols-2 pl-8 w-full">
                    <div className="flex flex-col w-2/3">
                        <label className="mb-2 text-xl font-medium">Peso (kg) <a className="text-red-500">*</a></label>
                        <input 
                            type="text" 
                            name="peso" 
                            required
                            value={peso}
                            onChange={handlePesoChange} 
                            className="bg-[#edddee] rounded focus:outline-[#844c81] p-1" />
                    </div>
                    <div className="flex flex-col w-2/3">
                        <label className="mb-2 text-xl font-medium">Altura (m) <a className="text-red-500">*</a></label>
                        <input 
                            type="text" 
                            name="altura" 
                            value={altura}
                            onChange={handleAlturaChange}
                            required 
                            className="bg-[#edddee] rounded focus:outline-[#844c81] p-1" />
                    </div>
                </div>
                <div className="flex gap-2 pl-8 w-full">
                    <input required type="checkbox" id="termos" onChange={(e) => setTermos(e.target.checked)} name="termos" className="" />
                    <label className="">Aceito os termos de uso</label>
                </div>
                <div className="flex flex-col w-full items-center gap-2">
                    <button 
                        type="submit"
                        disabled={!termos}
                        className="bg-[#844c81] h-[40px] w-[150px] font-semibold rounded-[10px] hover:bg-[#bd80b8] transition duration-300 text-white disabled:opacity-50"
                    >
                        Cadastrar
                    </button>
                    <span className="text-[15px]">Já possui uma conta? <a href="/login" className="text-[#844c81] font-bold">Entrar</a></span>
                </div>
            </form>
        </div>
    )
}

export default Cadastro;