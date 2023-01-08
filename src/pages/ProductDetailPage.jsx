import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { productStore } from '../stores/ProductStore';
import { orderItemStore } from '../stores/OrderItemStore';

import ProductDetail from '../components/productDetail/ProductDetail';
import { cartStore } from '../stores/CartStore';

export default function ProductDetailPage() {
  const { id } = useParams();

  const fetchProduct = async () => {
    await productStore.fetchProduct({ id });

    const { product } = productStore;

    if (!product.optionData) {
      orderItemStore.addOrderItem({ product });
    }

    if (product.optionData) {
      orderItemStore.setProductToChoiceOption({ product });
    }
  };

  useEffect(() => {
    fetchProduct();

    return () => {
      productStore.clear();
      orderItemStore.reset();
      cartStore.clearError();
    };
  }, []);

  return (<ProductDetail />);
}
