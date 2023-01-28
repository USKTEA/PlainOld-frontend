import {
  cleanup, fireEvent, render, screen, waitFor,
} from '@testing-library/react';

import { userStore } from '../../stores/UserStore';
import { productStore } from '../../stores/ProductStore';
import { getOrderStore } from '../../stores/GetOrderStore';
import { getReviewStore } from '../../stores/GetReviewStore';
import { getReplyStore } from '../../stores/GetReplyStore';

import ReviewSection from './ReviewSection';

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

  describe('구매평', () => {
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

        expect(reviews).toHaveLength(2);

        screen.getByText('좋은 상품입니다');
      });
    });
  });

  describe('구매평 댓글', () => {
    context('구매평에 댓글이 있는 경우', () => {
      it('댓글의 갯수를 볼 수 있다', async () => {
        const productId = 3;

        await productStore.fetchProduct({ id: productId });
        await getReviewStore.fetchReviews({ productId });

        const { reviews } = getReviewStore;

        const reviewIds = reviews.reduce(
          (acc, review) => [...acc, review.id],
          [],
        );

        await getReplyStore.fetchReplies({ reviewIds });

        renderReviewSection();

        expect(reviews).toHaveLength(2);

        screen.getByText('좋은 상품입니다');
        screen.getByText('댓글 1');
      });
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

  describe('포토 구매평만 보기', () => {
    context('포토 구매평만 보기에 체크가 되지 않았을 경우', () => {
      it('모든 구매평을 불러온다', async () => {
        const productId = 1;

        await productStore.fetchProduct({ id: productId });
        await getReviewStore.fetchReviews({ productId });

        renderReviewSection();

        const { reviews } = getReviewStore;

        expect(screen.getByLabelText('포토 구매평만 보기')).not.toBeChecked();
        expect(reviews).toHaveLength(2);
        expect(screen.getAllByAltText('구매평이미지').length).toBe(1);

        cleanup();
      });
    });

    context('포토 구매평만 보기에 체크가 되어있을 경우', () => {
      it('포토 구매평만 불러온다', async () => {
        const productId = 1;

        await productStore.fetchProduct({ id: productId });
        await getReviewStore.fetchReviews({ productId });

        renderReviewSection();

        let { reviews } = getReviewStore;

        expect(screen.getByLabelText('포토 구매평만 보기')).not.toBeChecked();
        expect(reviews).toHaveLength(2);
        expect(screen.getAllByAltText('구매평이미지').length).toBe(1);

        fireEvent.click(screen.getByLabelText('포토 구매평만 보기'));

        await waitFor(() => {
          reviews = getReviewStore.reviews;
          expect(reviews).toHaveLength(1);
        });
      });
    });
  });
});
