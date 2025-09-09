import React from 'react';
import CloseIcon from './CloseIcon';
import { Product } from '../types/Product';

interface ProductDetailsModalProps {
  product: Product;
  onClose: () => void;
}

const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  product,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="relative mx-auto p-5 border w-full max-w-md shadow-lg rounded-lg bg-white">
        <div className="flex justify-between items-start">
          <h3 className="text-lg leading-6 font-semibold text-gray-900">
            Product Details
          </h3>
          <CloseIcon onClick={onClose} />
        </div>
        <div className="mt-4">
          <h4 className="text-lg font-medium text-gray-900">{product.name}</h4>
          <p className="mt-2 text-base text-gray-700">{product.description}</p>
          <hr className="my-4" />
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-gray-500">Price:</p>
              <p className="text-base font-medium text-gray-900">${product.price.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Stock:</p>
              <p className="text-base font-medium text-gray-900">{product.stock} units</p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-500">Product ID:</p>
            <p className="text-base font-medium text-gray-900">{product.id}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsModal;
