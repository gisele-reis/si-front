import React, { useState, useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  items: { id: string; description: string; isMandatory: boolean }[];
  onItemChange: (itemIds: string[]) => void;
  acceptedTerms: string[];
}
const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  items,
  onItemChange,
  acceptedTerms,
}) => {
  if (!isOpen) return null;

  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const initialCheckedItems = items.reduce((acc, item) => {
      // Itens obrigatórios começam sempre marcados
      acc[item.id] = item.isMandatory || acceptedTerms.includes(item.id);
      return acc;
    }, {} as Record<string, boolean>);
    setCheckedItems(initialCheckedItems);
  }, [items, acceptedTerms]);

  const handleCheckboxChange = (id: string, isMandatory: boolean) => {
    if (isMandatory) return;
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleSave = () => {
    const acceptedItemIds = Object.keys(checkedItems).filter(
      (itemId) => checkedItems[itemId]
    );

    const allMandatoryAccepted = items.every((item) => {
      if (item.isMandatory && !checkedItems[item.id]) {
        return false;
      }
      return true;
    });

    if (!allMandatoryAccepted) {
      alert("Você deve aceitar todos os termos obrigatórios.");
      return;
    }

    onItemChange(acceptedItemIds);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-[80%] max-w-xl relative">
        <h2 className="text-2xl font-bold text-[#844c81]">{title}</h2>
        <div className="mt-2 text-gray-600 max-h-[300px] overflow-y-auto">
          <p>{description}</p>
        </div>

        <div className="mt-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center mb-3">
              <input
                type="checkbox"
                id={item.id}
                checked={checkedItems[item.id] || false}
                onChange={() => handleCheckboxChange(item.id, item.isMandatory)}
                className="mr-2"
                disabled={item.isMandatory}
              />
              <label htmlFor={item.id} className="text-lg">
                {item.description}
                {item.isMandatory && <span className="text-red-500"> *</span>}
              </label>
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={handleSave}
            className="bg-[#844c81] hover:bg-[#5f3e61] text-white py-2 px-4 rounded-md"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

