import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import { editReviewStore } from '../../stores/EditReviewStore';

import { getOrderStore } from '../../stores/GetOrderStore';
import { productStore } from '../../stores/ProductStore';

import EditReviewModal from './EditReviewModal';

const setModalOpen = jest.fn();

const context = describe;

describe('EditReviewModal', () => {
  const renderEditReviewModal = () => render(
    <EditReviewModal setModalOpen={setModalOpen} />,
  );

  const review = {
    id: 1,
    rate: 5,
    comment: '아주 좋은 상품',
  };

  beforeEach(() => {
    productStore.clear();
    editReviewStore.clear();
    editReviewStore.setReview(review);
  });

  context('구매평 수정 모달이 열리는 경우', () => {
    it('구매평을 남기고자 하는 상품의 정보를 볼 수 있다', async () => {
      const productId = 1;

      await productStore.fetchProduct({ id: productId });

      renderEditReviewModal();

      expect(screen.getByText('구매평 수정'));
      expect(screen.getByText('T-shirt'));
    });
  });

  context('평점에 해당하는 버튼을 클릭했을 경우', () => {
    it('해당 평점이 구매평에 반영된 것을 볼 수 있다', async () => {
      const productId = 1;

      await productStore.fetchProduct({ id: productId });

      const { container } = renderEditReviewModal();

      const scoreButtons = screen.getAllByRole('button');

      const fivePoint = scoreButtons[4];

      fireEvent.click(fivePoint);

      expect(container.getElementsByClassName('active-star')).toHaveLength(5);
    });
  });

  context('comment를 입력하지 않고 등록을 클릭했을 경우', () => {
    it('구매평이 등록되지 않는 것을 볼 수 있다', async () => {
      const productId = 1;

      await productStore.fetchProduct({ id: productId });

      renderEditReviewModal();

      fireEvent.change(screen.getByLabelText('구매평 수정'), {
        target: {
          value: '',
        },
      });

      fireEvent.click(screen.getByRole('button', { name: '등록' }));

      expect(setModalOpen).not.toBeCalled();
      expect(screen.getByText('구매평 수정'));
    });
  });

  context('comment를 입력하고 등록을 클릭했을 경우', () => {
    it('모달창이 꺼지고 리뷰가 등록된다', async () => {
      const productId = 1;

      await productStore.fetchProduct({ id: productId });
      await getOrderStore.fetchOrderDoNotHaveReview({ productId });

      renderEditReviewModal();

      fireEvent.change(screen.getByLabelText('구매평 수정'), {
        target: {
          value: '좋은 상품입니다!',
        },
      });

      screen.getByText('좋은 상품입니다!');

      fireEvent.click(screen.getByRole('button', { name: '등록' }));

      await waitFor(() => {
        expect(setModalOpen).toBeCalled();
      });
    });
  });
});
