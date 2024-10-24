import { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function Modal({ isOpen, onClose, setTermsAccepted }: any) {
  const modalRef = useRef(null as any);
  const [terms, setTerms] = useState<any[]>([]);
  const [selectedTerms, setSelectedTerms] = useState<string[]>([]);

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

      axios
        .get("http://localhost:3000/terms")
        .then((response) => {
          setTerms(response.data);
        })
        .catch((error) => {
          console.error("Erro ao obter os termos:", error);
        });
    } else {
      document.removeEventListener("mousedown", handleOutsideClickRef);
      document.body.style.overflow = "auto";
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClickRef);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  const handleCheckboxChange = (id: string) => {
    setSelectedTerms((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((termId) => termId !== id)
        : [...prevSelected, id]
    );
  };

  const handleSubmit = () => {
    setTermsAccepted(selectedTerms);
    onClose();
  };

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
        <div className="w-full flex justify-end"></div>
        <div>
          <h1 id="modal-title" className="text-2xl font-bold">
            Termos de Uso
          </h1>
          <p id="modal-description" className="text-lg mt-4">
            Ao me cadastrar, eu concordo em compartilhar meus dados com a
            plataforma Health Check com as seguintes finalidades:
          </p>
          <ul className="list-disc list-inside mt-3">
            {terms.map((term) => (
              <li key={term.id} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={selectedTerms.includes(term.id)}
                  onChange={() => handleCheckboxChange(term.id)}
                />
                <span>{term.description}</span>
              </li>
            ))}
          </ul>
        </div>
        <button
          type="button"
          className="bg-[#844c81] py-2 px-10 font-semibold rounded-[10px] hover:bg-[#bd80b8] transition duration-300 text-white disabled:opacity w-full"
          onClick={handleSubmit}
        >
          Concluir
        </button>
      </div>
    </div>
  );
}
