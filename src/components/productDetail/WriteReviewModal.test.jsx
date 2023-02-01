import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';

import { createReviewStore } from '../../stores/review/CreateReviewStore';
import { fileStore } from '../../stores/file/FileStore';
import { getOrderStore } from '../../stores/order/GetOrderStore';
import { productStore } from '../../stores/product/ProductStore';

import WriteReviewModal from './WriteReviewModal';

const setModalOpen = jest.fn();

const context = describe;

describe('WriteReviewModal', () => {
  const renderWriteReviewModal = () => render(
    <WriteReviewModal setModalOpen={setModalOpen} />,
  );

  beforeEach(() => {
    productStore.clear();
    createReviewStore.clear();
    fileStore.clear();
  });

  context('구매평 작성 모달이 열리는 경우', () => {
    it('구매평을 남기고자 하는 상품의 정보를 볼 수 있다', async () => {
      const productId = 1;

      await productStore.fetchProduct({ id: productId });

      renderWriteReviewModal();

      expect(screen.getByText('구매평 작성'));
      expect(screen.getByText('T-shirt'));
    });
  });

  context('평점에 해당하는 버튼을 클릭했을 경우', () => {
    it('해당 평점이 구매평에 반영된 것을 볼 수 있다', async () => {
      const productId = 1;

      await productStore.fetchProduct({ id: productId });

      const { container } = renderWriteReviewModal();

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

      renderWriteReviewModal();

      fireEvent.click(screen.getByRole('button', { name: '등록' }));

      expect(setModalOpen).not.toBeCalled();
      expect(screen.getByText('구매평 작성'));
    });
  });

  context('comment를 입력하고 등록을 클릭했을 경우', () => {
    it('모달창이 꺼지고 리뷰가 등록된다', async () => {
      const productId = 1;

      await productStore.fetchProduct({ id: productId });
      await getOrderStore.fetchOrderDoNotHaveReview({ productId });

      renderWriteReviewModal();

      fireEvent.change(screen.getByLabelText('구매평 작성'), {
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

  describe('포토 구매평', () => {
    window.URL.createObjectURL = jest.fn();

    afterEach(() => {
      jest.clearAllMocks();
    });

    context('라벨을 클릭해 이미지를 올렸을 경우', () => {
      it('이미지가 정상적으로 브라우저에 올라간 것을 볼 수 있다', async () => {
        const file = new File(['image'], 'image.png', { type: 'image/png' });

        const productId = 1;

        await productStore.fetchProduct({ id: productId });

        renderWriteReviewModal();

        const fileInput = screen.getByLabelText('+');

        fireEvent.change(fileInput, { target: { files: [file] } });

        expect(fileInput.files).toEqual([file]);
        expect(fileInput.files[0]).toStrictEqual(file);
      });
    });

    context('이미지가 정상적으로 업로드되지 않았을 경우', () => {
      it('잠시 후 다시 시도해주세요 메세지를 볼 수 있다', async () => {
        const file = new File(['image'], 'shouldNotUploaded.png', { type: 'image/png' });

        const productId = 1;

        await productStore.fetchProduct({ id: productId });
        await getOrderStore.fetchOrderDoNotHaveReview({ productId });

        renderWriteReviewModal();

        const fileInput = screen.getByLabelText('+');

        fireEvent.change(fileInput, { target: { files: [file] } });

        fireEvent.change(screen.getByLabelText('구매평 작성'), {
          target: {
            value: '좋은 상품입니다!',
          },
        });

        fireEvent.click(screen.getByRole('button', { name: '등록' }));

        await waitFor(() => {
          screen.getByText('잠시 후 다시 시도해주세요');
        });
      });
    });
  });
});
