import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { productStore } from '../stores/ProductStore';

import ProductDetail from '../components/ProductDetail';

export default function ProductDetailPage() {
  const { id } = useParams();

  useEffect(() => {
    productStore.fetchProduct({ id });

    return () => productStore.clearError();
  }, []);

  return (<ProductDetail />);
}
