import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import ProductDetail from '../components/productDetail/ProductDetail';

import useProductStore from '../hooks/useProductStore';
import useCartStore from '../hooks/useCartStore';
import useOrderItemStore from '../hooks/useOrderItemStore';
import useGetReviewStore from '../hooks/useGetReviewStore';
import useGetOrderStore from '../hooks/useGetOrderStore';

export default function ProductDetailPage() {
  const { id } = useParams();

  const productStore = useProductStore();
  const orderItemStore = useOrderItemStore();
  const cartStore = useCartStore();
  const getReviewStore = useGetReviewStore();
  const getOrderStore = useGetOrderStore();

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

  const fetchReviews = async () => {
    await getReviewStore.fetchReviews({ productId: id, pageNumber: 1 });
  };

  useEffect(() => {
    fetchProduct();
    fetchReviews();

    return () => {
      productStore.clear();
      getOrderStore.clear();
      orderItemStore.reset();
      cartStore.clearError();
    };
  }, []);

  return (<ProductDetail />);
}
