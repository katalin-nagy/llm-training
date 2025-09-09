import React, { useState, useEffect, useMemo } from 'react';
import { getProducts, deleteProduct } from './api';
import { Product } from './types/Product';
import Button from './components/Button';
import AddProductModal from './components/AddProductModal';
import EditProductModal from './components/EditProductModal';
import ProductDetailsModal from './components/ProductDetailsModal';
import DeleteConfirmationModal from './components/DeleteConfirmationModal';
import ProductCard from './components/ProductCard';
import SearchIcon from './components/icons/SearchIcon';
import PlusIcon from './components/icons/PlusIcon';

const ProductListPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [detailsProduct, setDetailsProduct] = useState<Product | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchProducts = async () => {
    try {
      setError(null);
      const products = await getProducts();
      setProducts(products);
    } catch (error) {
      setError('Failed to fetch products. Please try again later.');
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (product: Product) => {
    setDeletingProduct(product);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (deletingProduct) {
      try {
        setError(null);
        await deleteProduct(deletingProduct.id);
        fetchProducts();
        setIsDeleteModalOpen(false);
        setDeletingProduct(null);
      } catch (error) {
        setError('Failed to delete product. Please try again later.');
        console.error(error);
      }
    }
  };

  const handleViewDetails = (product: Product) => {
    setDetailsProduct(product);
    setIsDetailsModalOpen(true);
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Product Management
        </h1>
      </header>

      <div className="flex justify-between items-center mb-6">
        <div className="relative w-full max-w-xs">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search products..."
            className="block w-full bg-gray-100 border-transparent rounded-md pl-10 pr-3 py-2 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2"
        >
          <PlusIcon className="w-4 h-4" />
          Add Product
        </Button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onEdit={handleEdit}
            onDelete={() => handleDeleteClick(product)}
            onView={handleViewDetails}
          />
        ))}
      </div>

      {isModalOpen && (
        <AddProductModal
          onClose={() => setIsModalOpen(false)}
          onProductAdded={() => {
            setIsModalOpen(false);
            fetchProducts();
          }}
        />
      )}

      {isEditModalOpen && editingProduct && (
        <EditProductModal
          product={editingProduct}
          onClose={() => setIsEditModalOpen(false)}
          onProductUpdated={() => {
            setIsEditModalOpen(false);
            fetchProducts();
          }}
        />
      )}

      {isDetailsModalOpen && detailsProduct && (
        <ProductDetailsModal
          product={detailsProduct}
          onClose={() => setIsDetailsModalOpen(false)}
        />
      )}

      {isDeleteModalOpen && deletingProduct && (
        <DeleteConfirmationModal
          productName={deletingProduct.name}
          onConfirm={handleConfirmDelete}
          onCancel={() => {
            setIsDeleteModalOpen(false);
            setDeletingProduct(null);
          }}
        />
      )}
    </div>
  );
};

export default ProductListPage;
