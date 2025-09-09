import React from 'react';
import { Product } from '../types/Product';
import Button from './Button';
import DeleteIcon from './icons/DeleteIcon';
import EditIcon from './icons/EditIcon';
import ViewIcon from './icons/ViewIcon';

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
  onView: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onEdit, onDelete, onView }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col justify-between">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">{product.name}</h2>
        <p className="text-sm text-gray-500 mt-2">{product.description}</p>
      </div>
      <div className="mt-4">
        <div className="flex justify-between items-center">
          <p className="text-base font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-sm text-gray-500">Stock: {product.stock}</p>
        </div>
        <div className="flex items-center justify-end gap-2 mt-4">
          <Button
            variant="secondary"
            className="flex items-center gap-2"
            onClick={() => onView(product)}
          >
            <ViewIcon className="w-4 h-4" />
            View
          </Button>
          <Button
            variant="secondary"
            className="flex items-center gap-2"
            onClick={() => onEdit(product)}
          >
            <EditIcon className="w-4 h-4" />
            Edit
          </Button>
          <Button
            variant="primary"
            className="bg-red-600 hover:bg-red-700"
            onClick={() => onDelete(product)}
          >
            <DeleteIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
