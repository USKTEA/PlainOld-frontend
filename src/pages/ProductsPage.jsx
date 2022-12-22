import { useEffect } from 'react';

import { useSearchParams } from 'react-router-dom';
import useCategoryStore from '../hooks/useCategoryStore';
import useProductStore from '../hooks/useProductStore';

import Products from '../components/Products';
import Category from '../components/Category';

export default function ProductsPage() {
  const [searchParams] = useSearchParams();

  const category = searchParams.get('category') ?? '';
  const pageNumber = searchParams.get('page') ?? 1;

  const categoryStore = useCategoryStore();
  const productStore = useProductStore();

  useEffect(() => {
    categoryStore.fetchCategories();

    productStore.fetchProducts({ category, pageNumber });
  }, [category, pageNumber]);

  return (
    <div>
      <Category />
      <Products />
    </div>
  );
}
