import React from 'react';
import { Product } from '../types/Product';
import Button from './Button';
import DeleteIcon from './icons/DeleteIcon';
import EditIcon from './icons/EditIcon';
import ViewIcon from './icons/ViewIcon';
import PlusIcon from './icons/PlusIcon';

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
  onView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onEdit,
  onDelete,
  onView,
  onAddToCart,
}) => {
  const outOfStock = typeof product.stock === 'number' && product.stock <= 0;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col justify-between overflow-hidden">
      {/* header row: title + add-to-cart */}
      <div className="flex items-start justify-between mb-2">
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <Button
          variant="primary"
            className="p-2 rounded-full bg-green-500 hover:bg-green-600 text-white shadow"
              onClick={() => onAddToCart(product)}
        >
          <PlusIcon className="w-4 h-4" />
        </Button>
      </div>

      {/* description & price/stock */}
      {product.description && (
        <p className="text-gray-600 text-sm mb-2">{product.description}</p>
      )}
      <div className="flex items-center justify-between">
        <p className="text-gray-800 font-medium">${product.price.toFixed(2)}</p>
        <p
          className={`text-sm ${outOfStock ? 'text-red-600' : 'text-gray-500'}`}
        >
          Stock: {product.stock ?? '—'}
        </p>
      </div>

      {/* footer actions */}
      <div className="flex items-center justify-end gap-2 mt-4 flex-wrap">
        <Button
          variant="secondary"
          className="flex items-center gap-2 shrink-0"
          onClick={() => onView(product)}
        >
          <ViewIcon className="w-4 h-4" />
          View
        </Button>

        <Button
          variant="secondary"
          className="flex items-center gap-2 shrink-0"
          onClick={() => onEdit(product)}
        >
          <EditIcon className="w-4 h-4" />
          Edit
        </Button>

        <Button
          variant="primary"
          className="bg-red-600 hover:bg-red-700 shrink-0"
          onClick={() => onDelete(product)}
        >
          <DeleteIcon className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
