import { useEffect, useRef } from "react";

export default function Modal({ isOpen, onClose}: any) {
    const modalRef = useRef(null as any);

  const handleOutsideClick = (e:any) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    const handleOutsideClickRef = (e : any) => handleOutsideClick(e);

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClickRef);
    } else {
      document.removeEventListener("mousedown", handleOutsideClickRef);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClickRef);
    };
  }, [isOpen, onClose, handleOutsideClick]);

  if (!isOpen) return null;

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center bg-black bg-opacity-45 ">
      <div
        className=" border border-black w-[80%] lg:w-[35%]  bg-white rounded-lg p-4"
        ref={modalRef}
        role="dialog"
      >
        <div className="w-full flex justify-end">

            <button
            className="mt-2 mr-2 text-gray-600 hover:text-gray-800 focus:outline-none"
            onClick={onClose}
            >
            X
            </button>
        </div>
            <div>
                <h1 className="text-2xl font-bold">Termos de Uso</h1>
                <p className="text-lg mt-4">Ao me cadastrar, eu concordo em compartilhar meus dados com a plataforma Health Check com as seguintes finalidades:</p>
                <ul className="list-disc list-inside mt-3">
                    <li>Para calcular meu IMC;</li>
                    <li>Para saber a quantidade de água diária recomendada;</li>
                    <li>Para monitorar minhas condições de saúde.</li>
                </ul>
            </div>
      </div>
    </div>
  );

}