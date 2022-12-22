import { useEffect } from 'react';

import useCategoryStore from '../hooks/useCategoryStore';
import useProductStore from '../hooks/useProductStore';

import Products from '../components/products';
import Category from '../components/Category';

export default function ProductsPage() {
  const categoryStore = useCategoryStore();
  const productStore = useProductStore();

  useEffect(() => {
    categoryStore.fetchCategories();
    productStore.fetchProducts();
  }, []);

  return (
    <div>
      <Category />
      <Products />
    </div>
  );
}
