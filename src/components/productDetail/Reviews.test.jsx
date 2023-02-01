import { fireEvent, render, screen } from '@testing-library/react';

import { getReplyStore } from '../../stores/reply/GetReplyStore';
import { getReviewStore } from '../../stores/review/GetReviewStore';
import { productStore } from '../../stores/product/ProductStore';

import Reviews from './Reviews';

const context = describe;

describe('Reviews', () => {
  beforeEach(() => {
    productStore.clear();
    getReviewStore.clear();
    localStorage.removeItem('accessToken');
  });

  context('구매평에 댓글이 없을 경우', () => {
    it('구매평 정보만 보이고 댓글 갯수가 보이지 않는다', async () => {
      const productId = 1;

      await productStore.fetchProduct({ id: productId });
      await getReviewStore.fetchReviews({ productId });

      const { reviews } = getReviewStore;

      const reviewIds = reviews.reduce((acc, review) => [...acc, review.id], []);

      await getReplyStore.fetchReplies({ reviewIds });

      render(<Reviews />);

      screen.getByText('좋은 상품입니다');
      screen.getByAltText('구매평이미지');

      expect(screen.queryByText('댓글 0')).toBeFalsy();
    });
  });

  context('구매평에 댓글이 있을 경우', () => {
    it('구매평에 댓글이 몇 개 있는지 볼 수 있다', async () => {
      const productId = 3;

      await productStore.fetchProduct({ id: productId });
      await getReviewStore.fetchReviews({ productId });

      const { reviews } = getReviewStore;

      const reviewIds = reviews.reduce((acc, review) => [...acc, review.id], []);

      await getReplyStore.fetchReplies({ reviewIds });

      render(<Reviews />);

      screen.getByText('좋은 상품입니다');
      screen.getByAltText('구매평이미지');

      screen.getByText('댓글 1');
    });
  });

  context('로그인을 하지 않고 구매평을 클릭했을 경우', () => {
    it('로그인이 필요합니다 메시지를 볼 수 있다', async () => {
      const productId = 1;

      await productStore.fetchProduct({ id: productId });
      await getReviewStore.fetchReviews({ productId });

      const { container } = render(<Reviews />);

      const reviews = container.getElementsByClassName('review-open');
      const firstReview = reviews[0];

      fireEvent.click(firstReview);

      screen.getByPlaceholderText('로그인이 필요합니다');
    });
  });
});
