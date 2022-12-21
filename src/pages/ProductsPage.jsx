import { useEffect } from 'react';
import Products from '../components/products';
import Category from '../components/Category';
import useCategoryStore from '../hooks/useCategoryStore';

export default function ProductsPage() {
  const categoryStore = useCategoryStore();

  useEffect(() => {
    categoryStore.fetchCategories();
  }, []);

  return (
    <div>
      <Category />
      <Products />
    </div>
  );
}
