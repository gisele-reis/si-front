import { useState } from 'react';

const Perfil = () => {

    const [Nome] = useState('Fulano');
    const [Email] = useState('fulano@email.com');
    const [Peso] = useState(50);
    const [Altura] = useState(1.70);

    const [editar, setEditar] = useState(false);

    const handleEditar = () => {
        if (!editar) {
            setEditar(true);
        }
    }

    const handleSalvar = () => {
        setEditar(false);
        alert('Informações alteradas com sucesso!');
    }


    return (
        <div className="flex items-center min-h-screen ml-[15rem] bg-[#F2F2F2]">
            <div className='grid w-full h-screen'>
                <div className="justify-items-start mt-8 ml-8">
                    <h1 className="text-4xl font-bold leading-tight text-[#844c81]">Minhas Informações</h1>
                </div>
                <div className='flex flex-col gap-4 place-self-center'>
                    <div className="flex gap-4">
                        <h1 className="font-bold leading-tight">Nome:</h1>
                        <input disabled={!editar} value={Nome} className='bg-[#edddee] p-1 focus:outline-[#844c81]'/>
                    </div>
                    <div className='flex gap-4'>
                        <h1 className="font-bold leading-tight ">E-mail:</h1>
                        <input disabled={!editar} value={Email} className='bg-[#edddee] p-1 focus:outline-[#844c81]' />
                    </div>
                    <div className='flex gap-7'>
                        <h1 className="font-bold leading-tight ">Peso:</h1>
                        <input disabled={!editar} value={Peso} className='bg-[#edddee] p-1 focus:outline-[#844c81]' />
                    </div>
                    <div className='flex gap-4'>
                        <h1 className="font-bold leading-tight ">Altura:</h1>
                        <input disabled={!editar} value={Altura} className='bg-[#edddee] p-1 focus:outline-[#844c81]'/>
                    </div>
                </div>
                <div className='flex gap-4 self-end justify-center mb-8'>
                    <button disabled={!editar} onClick={handleSalvar} className='bg-[#844c81] text-[#edddee] px-4 py-2 rounded-lg mt-8 disabled:opacity-50'>Salvar</button>
                    <button disabled={editar} onClick={handleEditar} className='bg-[#844c81] text-[#edddee] px-4 py-2 rounded-lg mt-8 disabled:opacity-50'>Editar</button>
                    <button className='bg-[#844c81] text-[#edddee] px-4 py-2 rounded-lg mt-8'>Excluir Conta</button>
                </div>
            </div>
        </div>
    );
};

export default Perfil;
