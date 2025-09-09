import React from 'react';
import Button from './Button';
import CloseIcon from './CloseIcon';

interface DeleteConfirmationModalProps {
  productName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  productName,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="relative mx-auto p-8 border w-full max-w-md shadow-lg rounded-lg bg-white">
        <CloseIcon onClick={onCancel} />
        <div className="text-left">
          <h3 className="text-xl leading-6 font-semibold text-gray-900">
            Delete Product
          </h3>
          <div className="mt-4">
            <p className="text-sm text-gray-600">
              Are you sure you want to delete "{productName}"? This action
              cannot be undone.
            </p>
          </div>
          <div className="flex justify-end gap-4 pt-4">
            <Button type="button" variant="secondary" onClick={onCancel}>
              Cancel
            </Button>
            <Button
              type="button"
              variant="primary"
              className="bg-red-600 hover:bg-red-700"
              onClick={onConfirm}
            >
              Delete Product
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
