import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';

import useProductStore from '../hooks/useProductStore';
import useCartStore from '../hooks/useCartStore';
import useOrderItemStore from '../hooks/useOrderItemStore';
import useGetReviewStore from '../hooks/useGetReviewStore';
import useGetOrderStore from '../hooks/useGetOrderStore';
import useGetReplyStore from '../hooks/useGetReplyStore';
import useGetInquiryStore from '../hooks/useGetInquiryStore';
import useGetAnswerStore from '../hooks/useGetAnswerStore';
import useCreateReviewStore from '../hooks/useCreateReviewStore';
import useCountProductLikeStore from '../hooks/useCountProductLikeStore';
import useGetLikeByUserStore from '../hooks/useGetLikeByUserStore';
import useCreateLikeStore from '../hooks/useCreateLikeStore';
import useDeleteLikeStore from '../hooks/useDeleteLikeStore';

import ProductDetail from '../components/productDetail/ProductDetail';

export default function ProductDetailPage() {
  const { id } = useParams();
  const [accessToken] = useLocalStorage('accessToken', '');

  const productStore = useProductStore();
  const orderItemStore = useOrderItemStore();
  const cartStore = useCartStore();
  const createReviewStore = useCreateReviewStore();
  const getOrderStore = useGetOrderStore();
  const getReviewStore = useGetReviewStore();
  const getReplyStore = useGetReplyStore();
  const getInquiryStore = useGetInquiryStore();
  const getAnswerStore = useGetAnswerStore();
  const getLikeByUserStore = useGetLikeByUserStore();
  const countProductLikeStore = useCountProductLikeStore();
  const createLikeStore = useCreateLikeStore();
  const deleteLikeStore = useDeleteLikeStore();

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

    if (reviews.length) {
      const reviewIds = reviews.reduce((acc, review) => [...acc, review.id], []);

      await fetchReplies({ reviewIds });
    }
  };

  const fetchInquiriesAndAnswers = async () => {
    await getInquiryStore.fetchInquiries({ productId: id, pageNumber: 1 });

    const { inquiries } = getInquiryStore;

    const inquiryIds = inquiries
      .reduce((acc, i) => [...acc, i.id], []);

    if (inquiries.length) {
      await getAnswerStore.fetchAnswers({ inquiryIds });
    }
  };

  const fetchLikeByUser = async () => {
    await getLikeByUserStore.fetchLikes(id);
  };

  const countProductLikes = async () => {
    await countProductLikeStore.countProductLikes({ productId: id });
  };

  useEffect(() => {
    fetchProduct();
    fetchReviewsAndReplies();
    fetchInquiriesAndAnswers();
    countProductLikes();

    if (accessToken) {
      fetchLikeByUser();
    }

    return () => {
      createReviewStore.clear();
      productStore.clear();
      getOrderStore.clear();
      orderItemStore.reset();
      cartStore.clearError();
      getLikeByUserStore.clear();
      createLikeStore.clear();
      deleteLikeStore.clear();
    };
  }, [accessToken]);

  return (<ProductDetail />);
}
