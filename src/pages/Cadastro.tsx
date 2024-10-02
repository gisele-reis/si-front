import { useState } from "react";

const Cadastro = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [peso, setPeso] = useState<number | null>();
    const [altura, setAltura] = useState<number | null>();
    const [termos, setTermos] = useState(false);

    const [error, setError] = useState('');

    const handlePesoChange = (e: any) => {
        let value = e.target.value;
        value = value.replace(',', '.'); 
        setPeso(parseFloat(value)); 
    };

    const handleAlturaChange = (e: any) => {
        let value = e.target.value;
        value = value.replace(',', '.'); 
        setAltura(parseFloat(value)); 
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert('As senhas devem ser iguais.');
            return;
        }
        try {
            const response = await fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    name: name, 
                    username: email, 
                    password: password, 
                    peso: peso, 
                    altura: altura, 
                    termos: termos, 
                })   
            });

            if(!response.ok){
                const responseData = await response.json();
                setError(responseData.message || 'Ocorreu um erro ao processar sua solicitação.');
                window.alert(error);
                return;
            }

            setName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setPeso(null);
            setAltura(null);
            setTermos(false);

            window.alert('usuário cadastrado com sucesso!');
            console.log(response);

        } catch (error) {
            setError('Erro na autenticação. Verifique suas credenciais.')
            console.error(error);
        }
    
    }

    return (
        <div className="flex flex-col items-center justify-start h-screen w-screen py-6 gap-10">
            <h1 className="text-7xl font-bold leading-tight text-[#844c81]">Cadastre-se</h1>
            <form onSubmit={handleSubmit} className="flex flex-col w-1/2 items-start justify-center px-6 py-10 bg-white rounded-xl shadow-lg border gap-6">
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
                            type="number" 
                            name="peso" 
                            required
                            value={peso || ''}
                            onChange={handlePesoChange} 
                            className="bg-[#edddee] rounded focus:outline-[#844c81] p-1" />
                    </div>
                    <div className="flex flex-col w-2/3">
                        <label className="mb-2 text-xl font-medium">Altura (m) <a className="text-red-500">*</a></label>
                        <input 
                            type="number" 
                            name="altura" 
                            required 
                            value={altura || ''}
                            onChange={handleAlturaChange}
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