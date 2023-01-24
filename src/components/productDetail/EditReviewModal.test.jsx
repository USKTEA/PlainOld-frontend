import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import { editReviewStore } from '../../stores/EditReviewStore';

import { getOrderStore } from '../../stores/GetOrderStore';
import { productStore } from '../../stores/ProductStore';
import { reviewImageFileStore } from '../../stores/ReviewImageFileStore';

import EditReviewModal from './EditReviewModal';

const setModalOpen = jest.fn();

const context = describe;

window.URL.createObjectURL = jest.fn();

describe('EditReviewModal', () => {
  const renderEditReviewModal = () => render(
    <EditReviewModal setModalOpen={setModalOpen} />,
  );

  const reviewWithoutImage = {
    id: 1,
    rate: 5,
    comment: '아주 좋은 상품',
  };

  const reviewWithImage = {
    id: 1,
    rate: 5,
    comment: '아주 좋은 상품',
    imageUrl: '1',
  };

  beforeEach(() => {
    reviewImageFileStore.clear();
    productStore.clear();
    editReviewStore.clear();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('이미지가 없는 구매평', () => {
    context('구매평 수정 모달이 열리는 경우', () => {
      it('구매평을 남기고자 하는 상품의 정보를 볼 수 있다', async () => {
        const productId = 1;

        await productStore.fetchProduct({ id: productId });
        editReviewStore.setReview(reviewWithoutImage);

        renderEditReviewModal();

        expect(screen.getByText('구매평 수정'));
        expect(screen.getByText('T-shirt'));
      });
    });

    context('라벨을 클릭해 이미지를 올렸을 경우', () => {
      it('이미지가 정상적으로 브라우저에 올라간 것을 볼 수 있다', async () => {
        const file = new File(['image'], 'image.png', { type: 'image/png' });

        const productId = 1;

        await productStore.fetchProduct({ id: productId });
        editReviewStore.setReview(reviewWithoutImage);

        renderEditReviewModal();

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
        editReviewStore.setReview(reviewWithoutImage);

        renderEditReviewModal();

        const fileInput = screen.getByLabelText('+');

        fireEvent.change(fileInput, { target: { files: [file] } });

        fireEvent.change(screen.getByLabelText('구매평 수정'), {
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

    context('평점에 해당하는 버튼을 클릭했을 경우', () => {
      it('해당 평점이 구매평에 반영된 것을 볼 수 있다', async () => {
        const productId = 1;

        editReviewStore.setReview(reviewWithoutImage);
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
        editReviewStore.setReview(reviewWithoutImage);

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
        editReviewStore.setReview(reviewWithoutImage);

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

  describe('포토 구매평', () => {
    context('포토 구매평인 경우', () => {
      it('이미지와 이미지를 삭제하는 버튼을 볼 수 있다', async () => {
        const productId = 1;

        await productStore.fetchProduct({ id: productId });
        editReviewStore.setReview(reviewWithImage);

        renderEditReviewModal();

        screen.getByAltText('이미지 미리보기');
        screen.getByRole('button', { name: 'x' });
      });
    });

    context('등록된 이미지를 삭제했을 경우', () => {
      it('새로운 이미지를 등록할 수 있다', async () => {
        const productId = 1;

        await productStore.fetchProduct({ id: productId });
        editReviewStore.setReview(reviewWithImage);

        renderEditReviewModal();

        screen.getByAltText('이미지 미리보기');

        fireEvent.click(screen.getByRole('button', { name: 'x' }));

        screen.getByLabelText('+');
      });
    });
  });
});
