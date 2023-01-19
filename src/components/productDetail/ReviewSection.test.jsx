import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import { getOrderStore } from '../../stores/GetOrderStore';
import { productStore } from '../../stores/ProductStore';
import { getReviewStore } from '../../stores/GetReviewStore';

import ReviewSection from './ReviewSection';
import { userStore } from '../../stores/UserStore';

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate() {
    return navigate;
  },
}));

const context = describe;

const setRef = () => jest.fn();

describe('Review', () => {
  const renderReviewSection = () => render(<ReviewSection setRef={setRef} />);

  beforeEach(() => {
    localStorage.removeItem('accessToken');
    getReviewStore.clear();
    productStore.clear();
    getOrderStore.clear();
  });

  context('상품의 구매평이 없을 경우', () => {
    it('등록된 구매평이 없습니다 메시지를 볼 수 있다', async () => {
      const productId = 2;

      await getReviewStore.fetchReviews({ productId });

      renderReviewSection();

      const { reviews } = getReviewStore;

      expect(reviews).toHaveLength(0);

      screen.getByText('등록된 구매평이 없습니다.');
    });
  });

  context('상품의 구매평이 있을 경우', () => {
    it('등록된 구매평을 볼 수 있다', async () => {
      const productId = 1;

      await productStore.fetchProduct({ id: productId });
      await getReviewStore.fetchReviews({ productId });

      renderReviewSection();

      const { reviews } = getReviewStore;

      expect(reviews).toHaveLength(1);

      screen.getByText('좋은 상품입니다');
    });
  });

  describe('구매평 작성', () => {
    beforeEach(() => {
      localStorage.removeItem('accessToken');
    });

    context('로그인을 하지 않고 구매평 작성 버튼을 클릭했을 경우', () => {
      it('로그인 페이지로 이동시킨다', async () => {
        const productId = 1;

        await productStore.fetchProduct({ id: productId });
        await getReviewStore.fetchReviews({ productId });

        renderReviewSection();

        fireEvent.click(screen.getByRole('button', { name: '구매평 작성' }));

        expect(navigate).toBeCalledWith('/login');
      });
    });

    context('로그인을 했으나 해당 상품을 구매한 기록이 없는 경우', () => {
      it('해당 상품을 구매하신 분들만 리뷰 작성 가능합니다 메시지를 볼 수 있다', async () => {
        localStorage.setItem('accessToken', JSON.stringify('NOTPURCHASE'));

        const productId = 2;

        await productStore.fetchProduct({ id: productId });
        await getReviewStore.fetchReviews({ productId });

        renderReviewSection();

        fireEvent.click(screen.getByRole('button', { name: '구매평 작성' }));

        await waitFor(() => {
          screen.getByText('해당 상품을 구매하신 분들만 리뷰 작성 가능합니다');
        });
      });
    });

    context('로그인을 했고 구매평을 작성할 수 있는 경우', () => {
      it('구매평 작성 모달을 볼 수 있다', async () => {
        localStorage.setItem('accessToken', JSON.stringify('ACCESSTOKEN'));

        const productId = 1;

        await productStore.fetchProduct({ id: productId });
        await getReviewStore.fetchReviews({ productId });

        renderReviewSection();

        fireEvent.click(screen.getByRole('button', { name: '구매평 작성' }));

        await waitFor(() => {
          screen.getByLabelText('구매평 작성');
          screen.getByText('상품은 어떠셨나요?');
        });
      });
    });
  });

  describe('구매평 클릭', () => {
    context('로그인을 하지 않고 구매평을 클릭했을 경우', () => {
      it('로그인이 필요합니다 메시지를 볼 수 있다', async () => {
        const productId = 1;

        await productStore.fetchProduct({ id: productId });
        await getReviewStore.fetchReviews({ productId });

        const { container } = renderReviewSection();

        const reviews = container.getElementsByClassName('review-open');
        const firstReview = reviews[0];

        fireEvent.click(firstReview);

        expect(screen.getByPlaceholderText('로그인이 필요합니다'));
      });
    });

    context('로그인을 하고 내가 작성한 구매평을 클릭했을 경우', () => {
      it('수정과 삭제 버튼을 그리고 댓글을 남기는 폼을 볼 수 있다', async () => {
        localStorage.setItem('accessToken', JSON.stringify('ACCESSTOKEN'));

        await userStore.fetchUserInformation();
        const productId = 1;

        await productStore.fetchProduct({ id: productId });
        await getReviewStore.fetchReviews({ productId });

        const { container } = renderReviewSection();

        const reviews = container.getElementsByClassName('review-open');
        const firstReview = reviews[0];

        fireEvent.click(firstReview);

        screen.getByPlaceholderText('댓글');
        screen.getByRole('button', { name: '삭제' });
        screen.getByRole('button', { name: '수정' });
      });
    });
  });
});
