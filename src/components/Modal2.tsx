type ConsentItem = {
  id: string;
  description: string;
};

interface ModalProps {
  term: any;
  acceptedTerms: string[];
  onItemChange: (itemIds: string[]) => void;
  onClose: () => void;
}

const Modal = ({ term, acceptedTerms, onItemChange, onClose }: ModalProps) => {
  const handleCheckboxChange = (itemId: string) => {
    const updatedAcceptedTerms = acceptedTerms.includes(itemId)
      ? acceptedTerms.filter((id) => id !== itemId)
      : [...acceptedTerms, itemId];
    onItemChange(updatedAcceptedTerms);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{term.title}</h2>
        <p>{term.description}</p>
        <div>
          {term.items.map((item: ConsentItem) => (
            <div key={item.id} className="flex items-center">
              <input
                type="checkbox"
                id={item.id}
                checked={acceptedTerms.includes(item.id)}
                onChange={() => handleCheckboxChange(item.id)}
              />
              <label htmlFor={item.id}>{item.description}</label>
            </div>
          ))}
        </div>
        <button onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
};

export default Modal;
