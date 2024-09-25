import { useState } from "react";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#F2F2F2]">
            <div className="flex flex-col items-center justify-center gap-2">
                <div className="flex items-center gap-3 ">
                    <h1 className="text-6xl font-bold leading-tight tracking-normal text-[#844c81] self-end uppercase">Health Check</h1>
                </div>
                <div className="flex w-[450px] items-center justify-center px-6 py-8 bg-white rounded-xl shadow-lg border">
                    <form className="flex flex-col w-full items-center justify-between gap-8 px-4" >
                        <div className="flex flex-col w-full gap-6">
                        <input 
                                type="email"  
                                className="bg-[#edddee] h-[44px] p-2 w-full text-xs rounded placeholder:text-[#404040] placeholder:text-sm focus:outline-[#844c81]" 
                                placeholder="Insira seu e-mail" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <input 
                                type="password" 
                                className="bg-[#edddee] h-[44px] p-2 w-full text-xs rounded placeholder:text-[#404040] placeholder:text-sm focus:outline-[#844c81]" 
                                placeholder="Insira sua senha" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            /> 
                        </div>
                        <div className="flex flex-col w-full items-center gap-2">
                            <button type="submit" className="bg-[#844c81] h-[40px] w-[150px] font-semibold rounded-[10px] hover:bg-[#bd80b8] transition duration-300 text-white">Entrar</button>
                            <span className="text-[15px]">Ainda não possui uma conta? <a href="/register" className="text-[#844c81] font-bold">Cadastre-se</a></span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;