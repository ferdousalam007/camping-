import React, { FC, ReactNode } from "react";

interface CategoryModalProps {
  onClose: () => void;
  children: ReactNode;
}

const CategoryModal: FC<CategoryModalProps> = ({ onClose, children }) => {
  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  return (
    <div
      onClick={handleBackgroundClick}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div className="bg-white p-8 rounded-lg max-w-lg w-full">
        {children}
      </div>
    </div>
  );
};

export default CategoryModal;
