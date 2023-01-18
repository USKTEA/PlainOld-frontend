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

  it('해당 상품의 구매평을 보여준다', async () => {
    const productId = 1;

    await productStore.fetchProduct({ id: productId });
    await getReviewStore.fetchReviews({ productId });

    const { container } = render(<Reviews />);

    const rates = container.getElementsByClassName('star-active');

    screen.getByText('좋은 상품입니다');
    expect(rates).toHaveLength(5);
  });

  context('로그인을 하지 않고 구매평을 클릭했을 경우', () => {
    it('로그인이 필요합니다 메시지를 볼 수 있다', async () => {
      const productId = 1;

      await productStore.fetchProduct({ id: productId });
      await getReviewStore.fetchReviews({ productId });

      const { container } = render(<Reviews />);

      const reviews = container.getElementsByClassName('review');
      const firstReview = reviews[0];

      fireEvent.click(firstReview);

      screen.getByText('로그인이 필요합니다');
    });
  });
});
