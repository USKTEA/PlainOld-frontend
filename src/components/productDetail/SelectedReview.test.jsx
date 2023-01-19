import { fireEvent, render, screen } from '@testing-library/react';
import { productStore } from '../../stores/ProductStore';
import { userStore } from '../../stores/UserStore';
import SelectedReview from './SelectedReview';

const mokeDelete = jest.fn();

jest.mock('../../hooks/useDeleteReviewStore', () => () => ({
  delete: mokeDelete,
}));

const context = describe;

describe('SelectedReview', () => {
  const renderSelectedReview = () => {
    const review = {
      id: 1,
      productId: 1,
      reviewer: {
        username: 'tjrxo1234@gmail.com',
        nickname: '김뚜루',
      },
      rate: 5,
      comment: '좋은 상품입니다',
      reviewImageUrl: '1',
      cratedAt: '2022-01-15 12:45',
    };

    render(<SelectedReview review={review} />);
  };

  beforeEach(() => {
    localStorage.removeItem('accessToken');
    userStore.clear();
  });

  context('로그인을 하지 않았을 경우', () => {
    it('로그인이 필요합니다 메시지를 볼 수 있다', () => {
      renderSelectedReview();

      screen.getByPlaceholderText('로그인이 필요합니다');
    });
  });

  context('로그인 중인 사용자의 username과 구매평의 username이 같을 경우', () => {
    it('수정 및 삭제를 할 수 있다', async () => {
      localStorage.setItem('accessToken', JSON.stringify('ACCESSTOKEN'));

      await userStore.fetchUserInformation();

      renderSelectedReview();

      screen.getByRole('button', { name: '수정' });
      screen.getByRole('button', { name: '삭제' });
    });
  });

  context(
    '로그인을 하지 않았거나 사용자의 username과 구매평의 username이 같지 않을 경우',
    () => {
      it('수정 및 삭제를 할 수 없다', () => {
        renderSelectedReview();

        expect(screen.queryByRole('button', { name: '수정' })).toBeFalsy();
        expect(screen.queryByRole('button', { name: '삭제' })).toBeFalsy();
      });
    },
  );

  describe('구매평 수정', () => {
    beforeEach(() => {
      localStorage.setItem('accessToken', JSON.stringify('ACCESSTOKEN'));
    });

    context('구매평 수정 버튼을 클릭했을 경우', () => {
      it('기존 구매평을 수정할 수 있다', async () => {
        await productStore.fetchProduct({ id: 1 });
        await userStore.fetchUserInformation();

        renderSelectedReview();

        fireEvent.click(screen.getByRole('button', { name: '수정' }));

        fireEvent.change(screen.getByLabelText('구매평 수정'), {
          target: {
            value: '아주 좋은 상품입니다',
          },
        });

        screen.getByText('아주 좋은 상품입니다');
      });
    });
  });

  describe('구매평 삭제', () => {
    beforeEach(() => {
      localStorage.setItem('accessToken', JSON.stringify('ACCESSTOKEN'));
    });

    context('구매평 삭제 버튼을 클릭했을 경우', () => {
      it('구매평이 삭제된다', async () => {
        await productStore.fetchProduct({ id: 1 });
        await userStore.fetchUserInformation();

        renderSelectedReview();

        screen.getByText('좋은 상품입니다');

        fireEvent.click(screen.getByRole('button', { name: '삭제' }));

        expect(mokeDelete).toBeCalled();
      });
    });
  });
});
