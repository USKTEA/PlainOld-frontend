import { fireEvent, render, screen } from '@testing-library/react';

import { getReviewStore } from '../../stores/GetReviewStore';
import { productStore } from '../../stores/ProductStore';

import Reviews from './Reviews';

const context = describe;

describe('Reviews', () => {
  beforeEach(() => {
    productStore.clear();
    getReviewStore.clear();
    localStorage.removeItem('accessToken');
  });

  it('구매평이 보인다', async () => {
    const productId = 1;

    await productStore.fetchProduct({ id: productId });
    await getReviewStore.fetchReviews({ productId });

    render(<Reviews />);

    screen.getByText('좋은 상품입니다');
    screen.getByAltText('구매평이미지');
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
