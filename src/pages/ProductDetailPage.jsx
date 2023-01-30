import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import ProductDetail from '../components/productDetail/ProductDetail';

import useProductStore from '../hooks/useProductStore';
import useCartStore from '../hooks/useCartStore';
import useOrderItemStore from '../hooks/useOrderItemStore';
import useGetReviewStore from '../hooks/useGetReviewStore';
import useGetOrderStore from '../hooks/useGetOrderStore';
import useGetReplyStore from '../hooks/useGetReplyStore';
import useGetInquiryStore from '../hooks/useGetInquiryStore';

export default function ProductDetailPage() {
  const { id } = useParams();

  const productStore = useProductStore();
  const orderItemStore = useOrderItemStore();
  const cartStore = useCartStore();
  const getOrderStore = useGetOrderStore();
  const getReviewStore = useGetReviewStore();
  const getReplyStore = useGetReplyStore();
  const getInquiryStore = useGetInquiryStore();

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

  const fetchReplies = async ({ reviewIds }) => {
    await getReplyStore.fetchReplies({ reviewIds });
  };

  const fetchReviewsAndReplies = async () => {
    await getReviewStore.fetchReviews({ productId: id, pageNumber: 1 });

    const { reviews } = getReviewStore;
    const reviewIds = reviews.reduce((acc, review) => [...acc, review.id], []);

    await fetchReplies({ reviewIds });
  };

  const fetchInquiries = async () => {
    await getInquiryStore.fetchInquiries({ productId: id, pageNumber: 1 });
  };

  useEffect(() => {
    fetchProduct();
    fetchReviewsAndReplies();
    fetchInquiries();

    return () => {
      productStore.clear();
      getOrderStore.clear();
      orderItemStore.reset();
      cartStore.clearError();
    };
  }, []);

  return (<ProductDetail />);
}
