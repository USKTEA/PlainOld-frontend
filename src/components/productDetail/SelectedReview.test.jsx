import { fireEvent, render, screen } from '@testing-library/react';

import { createReplyStore } from '../../stores/CreateReplyStore';
import { productStore } from '../../stores/ProductStore';
import { userStore } from '../../stores/UserStore';

import SelectedReview from './SelectedReview';

const mokeDelete = jest.fn();

jest.mock('../../hooks/useDeleteReviewStore', () => () => ({
  delete: mokeDelete,
}));

const mockCreate = jest.fn();
const mockChange = jest.fn();
const mockValidate = jest.fn();
const mockClear = jest.fn();

jest.mock('../../hooks/useCreateReplyStore', () => () => ({
  reply: {
    comment: '',
  },
  errors: {
    create: '',
  },
  create: mockCreate,
  validate: mockValidate,
  change: mockChange,
  clear: mockClear,
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
      imageUrl: '1',
      cratedAt: '2022-01-15 12:45',
    };

    const replies = [];

    render(<SelectedReview review={review} replies={replies} />);
  };

  const renderSelectedReviewWithReply = () => {
    const review = {
      id: 1,
      productId: 1,
      reviewer: {
        username: 'tjrxo1234@gmail.com',
        nickname: '김뚜루',
      },
      rate: 5,
      comment: '좋은 상품입니다',
      imageUrl: '1',
      cratedAt: '2022-01-15 12:45',
    };

    const replies = [
      [{
        id: 1,
        reviewId: 1,
        parent: null,
        comment: '좋아보이네요',
        replier: {
          username: 'notTjrxo1234@gmail.com',
          nickname: '안김뚜루',
        },
        createdAt: '2022-01-15 12:46',
      }],
    ];
    render(<SelectedReview review={review} replies={replies} />);
  };

  beforeEach(() => {
    localStorage.removeItem('accessToken');
    createReplyStore.clear();
    userStore.clear();
  });

  context('포토 구매평인 경우', () => {
    it('이미지를 볼 수 있다', () => {
      renderSelectedReview();

      screen.getByAltText('구매평이미지');
    });
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

  describe('댓글', () => {
    it('댓글의 갯수와 댓글 내용을 볼 수 있다', () => {
      renderSelectedReviewWithReply();

      screen.getByText('댓글 1');
      screen.getByText('안김뚜루');
      screen.getByText('2022-01-15 12:46');
      screen.getByText('좋아보이네요');
    });
  });

  describe('댓글 작성', () => {
    beforeEach(() => {
      localStorage.removeItem('accessToken');
    });

    context('로그인을 하지 않았을 경우', () => {
      it('댓글 작성을 할 수 없다', () => {
        renderSelectedReviewWithReply();

        screen.getByPlaceholderText('로그인이 필요합니다');

        fireEvent.click(screen.getByRole('button', { name: '작성' }));

        expect(mockCreate).not.toBeCalled();
      });
    });

    context('글을 작성하지 않았을 경우', () => {
      it('댓글은 제출되지 않는다', async () => {
        localStorage.setItem('accessToken', JSON.stringify('ACCESSTOKEN'));

        await userStore.fetchUserInformation();

        renderSelectedReviewWithReply();

        screen.getByPlaceholderText('댓글');

        mockValidate.mockReturnValue(false);

        fireEvent.click(screen.getByRole('button', { name: '작성' }));

        expect(mockCreate).not.toBeCalled();
      });
    });

    context('1글자라도 댓글을 작성했을 경우 경우', () => {
      it('댓글은 제출된다', async () => {
        localStorage.setItem('accessToken', JSON.stringify('ACCESSTOKEN'));

        await userStore.fetchUserInformation();

        renderSelectedReviewWithReply();

        const comment = '댓글입니다';

        fireEvent.change(screen.getByPlaceholderText('댓글'), {
          target: {
            value: comment,
          },
        });

        expect(mockChange).toBeCalledWith(comment);

        mockValidate.mockReturnValue(true);

        fireEvent.click(screen.getByRole('button', { name: '작성' }));

        expect(mockCreate).toBeCalled();
      });
    });
  });
});
