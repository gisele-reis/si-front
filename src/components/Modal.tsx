import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef } from "react";

export default function Modal({ isOpen, onClose }: any) {
  const modalRef = useRef(null as any);

  const handleOutsideClick = (e: any) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    const handleOutsideClickRef = (e: any) => handleOutsideClick(e);

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClickRef);
      document.body.style.overflow = "hidden";
      if (modalRef.current) modalRef.current.focus();
    } else {
      document.removeEventListener("mousedown", handleOutsideClickRef);
      document.body.style.overflow = "auto";
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClickRef);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center bg-black bg-opacity-45 modal-enter modal-enter-active"
      role="dialog"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div
        className="w-full max-w-screen-sm bg-white rounded-lg pt-4 pb-10 px-8"
        ref={modalRef}
        role="document"
        tabIndex={-1}
      >
        <div className="w-full flex justify-end">
          <FontAwesomeIcon
            icon={faXmark}
            className="mt-2 mr-2 text-gray-600 hover:text-gray-800 text-2xl focus:outline-none"
            onClick={onClose}
            aria-label="Fechar Modal"
          />
        </div>
        <div>
          <h1 id="modal-title" className="text-2xl font-bold">
            Termos de Uso
          </h1>
          <p id="modal-description" className="text-lg mt-4">
            Ao me cadastrar, eu concordo em compartilhar meus dados com a
            plataforma Health Check com as seguintes finalidades:
          </p>
          <ul className="list-disc list-inside mt-3">
            <li>Para calcular meu IMC;</li>
            <li>Para saber a quantidade de água diária recomendada;</li>
            <li>Para monitorar minhas condições de saúde.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
