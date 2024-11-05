import React from "react";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  details: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, details }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-1/2">
        <h2 className="text-2xl font-bold mb-4">Detalhes do Termo</h2>
        <p>{details}</p>
        <button
          onClick={onClose}
          className="mt-4 bg-[#844c81] text-white px-4 py-2 rounded"
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

export default Modal;
