import React from "react";

interface ModalProps {
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ReloadModal: React.FC<ModalProps> = ({
  title,
  description,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
        <h2 className="text-lg font-bold mb-4">{title}</h2>
        <p className="mb-6">{description}</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 focus:outline-none"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 focus:outline-none"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReloadModal;
