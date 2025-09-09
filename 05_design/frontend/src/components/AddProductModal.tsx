import React, { useState } from 'react';
import Button from './Button';
import InputField from './InputField';
import TextareaField from './TextareaField';
import CloseIcon from './CloseIcon';
import { addProduct } from '../api';

interface AddProductModalProps {
  onClose: () => void;
  onProductAdded: () => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({
  onClose,
  onProductAdded,
}) => {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await addProduct({
        name: productName,
        description,
        price: parseFloat(price),
        stock: parseInt(stock, 10),
      });
      onProductAdded();
      onClose();
    } catch (error) {
      setError('Failed to add product. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="relative mx-auto p-8 border w-full max-w-md shadow-lg rounded-lg bg-white">
        <CloseIcon onClick={onClose} />
        <div className="text-left">
          <h3 className="text-xl leading-6 font-semibold text-gray-900">
            Add New Product
          </h3>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <InputField
              label="Product Name"
              name="productName"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Enter product name"
              required
            />
            <TextareaField
              label="Description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter product description"
              rows={3}
              required
            />
            <div className="flex gap-4">
              <InputField
                label="Price ($)"
                name="price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00"
                required
                className="w-full"
              />
              <InputField
                label="Stock"
                name="stock"
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="0"
                required
                className="w-full"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="flex justify-end gap-4 pt-4">
              <Button type="button" variant="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Add Product
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;
