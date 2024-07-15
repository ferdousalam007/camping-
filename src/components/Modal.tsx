import React from 'react';
import { Button } from './ui/button';
import { removeFromWishList } from '@/redux/slice/cartSlice';
import { useDispatch } from 'react-redux';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  id: string;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, message,id }) => {
  const dispatch = useDispatch();
  const handleremoveFromWishList = (id: string) => {
    dispatch(removeFromWishList(id));
  }
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-lg max-w-72">
        <p className="text-base">{message}</p>
        <Button className='mr-4' onClick={() => handleremoveFromWishList(id)}>Remove</Button>
        <Button
          onClick={onClose}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Close
        </Button>
      </div>
    </div>
  );
};

export default Modal;