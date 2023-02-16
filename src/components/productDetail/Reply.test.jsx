import { fireEvent, render, screen } from '@testing-library/react';

import { editReplyStore } from '../../stores/reply/EditReplyStore';
import { getUserStore } from '../../stores/user/GetUserStore';

import Reply from './Reply';

const mockDelete = jest.fn();

jest.mock('../../hooks/useDeleteReplyStore', () => () => ({
  delete: mockDelete,
  errors: {
    delete: '다시 시도해보세요',
  },
}));

const context = describe;

describe('Reply', () => {
  const renderFirstReply = () => {
    const reply = {
      id: 1,
      reviewId: 1,
      comment: '좋아보입니다',
      replier: {
        username: 'notTjrxo1234@gmail.com',
        nickname: '김뚜루',
      },
      createdAt: '2023-01-24 14:53',
    };

    const isFirstReply = true;

    render(<Reply
      isFirstReply={isFirstReply}
      reply={reply}
    />);
  };

  const renderMyReply = () => {
    const reply = {
      id: 1,
      reviewId: 1,
      comment: '좋아보입니다',
      replier: {
        username: 'tjrxo1234@gmail.com',
        nickname: '김뚜루',
      },
      createdAt: '2023-01-24 14:53',
    };

    const isFirstReply = true;

    render(<Reply
      isFirstReply={isFirstReply}
      reply={reply}
    />);
  };

  const renderOtherReply = () => {
    const reply = {
      id: 1,
      reviewId: 1,
      comment: '좋아보입니다',
      replier: {
        username: 'tjrxo1234@gmail.com',
        nickname: '김뚜루',
      },
      createdAt: '2023-01-24 14:53',
    };

    const isFirstReply = false;

    render(<Reply
      isFirstReply={isFirstReply}
      reply={reply}
    />);
  };

  beforeEach(() => {
    localStorage.removeItem('accessToken');
    getUserStore.clear();
    editReplyStore.clear();
  });

  describe('댓글 보기', () => {
    context('대댓글인 경우', () => {
      it('댓글의 정보를 볼 수 있고 댓글 아이콘은 볼 수 없다', () => {
        renderFirstReply();

        screen.getByText('김뚜루');
        screen.getByText('2023-01-24 14:53');
        screen.getByText('좋아보입니다');

        expect(screen.queryByText('⏎')).toBeFalsy();
      });
    });

    context('대댓글이 아닌 경우', () => {
      it('댓글의 정보와 대댓글의 댓글이라는 것을 표기하는 아이콘을 볼 수 있다', () => {
        renderOtherReply();

        screen.getByText('김뚜루');
        screen.getByText('2023-01-24 14:53');
        screen.getByText('좋아보입니다');
        screen.getByText('⏎');
      });
    });

    context('로그인을 하지 않았을 경우', () => {
      it('댓글 수정 삭제 어떠한 버튼도 보이지 않는다', () => {
        renderFirstReply();

        expect(screen.queryByRole('button', { name: '댓글' })).toBeFalsy();
        expect(screen.queryByRole('button', { name: '수정' })).toBeFalsy();
        expect(screen.queryByRole('button', { name: '삭제' })).toBeFalsy();
      });
    });

    context('로그인을 했지만 내가 작성한 글이 아닌 경우', () => {
      it('댓글 버튼만 볼 수 있다', async () => {
        localStorage.setItem('accessToken', JSON.stringify('ACCESSTOKEN'));

        await getUserStore.fetchUserInformation();

        renderFirstReply();

        expect(screen.queryByRole('button', { name: '댓글' })).toBeTruthy();
        expect(screen.queryByRole('button', { name: '수정' })).toBeFalsy();
        expect(screen.queryByRole('button', { name: '삭제' })).toBeFalsy();
      });
    });

    context('로그인을 했고 내가 작성한 글일 경우', () => {
      it('댓글 수정 삭제 버튼을 볼 수 있다', async () => {
        localStorage.setItem('accessToken', JSON.stringify('ACCESSTOKEN'));

        await getUserStore.fetchUserInformation();

        renderMyReply();

        expect(screen.queryByRole('button', { name: '댓글' })).toBeTruthy();
        expect(screen.queryByRole('button', { name: '수정' })).toBeTruthy();
        expect(screen.queryByRole('button', { name: '삭제' })).toBeTruthy();
      });
    });
  });

  describe('댓글 달기', () => {
    context('댓글버튼을 클릭했을 경우', () => {
      it('댓글을 입력할 수 있는 폼을 볼 수 있다', async () => {
        localStorage.setItem('accessToken', JSON.stringify('ACCESSTOKEN'));

        await getUserStore.fetchUserInformation();

        renderFirstReply();

        fireEvent.click(screen.getByRole('button', { name: '댓글' }));

        expect(screen.getByPlaceholderText('내용을 입력해주세요'));
      });
    });
  });

  describe('댓글 수정', () => {
    context('수정버튼을 클릭했을 경우', () => {
      it('댓글 수정 폼을 볼 수 있다', async () => {
        localStorage.setItem('accessToken', JSON.stringify('ACCESSTOKEN'));

        await getUserStore.fetchUserInformation();

        renderMyReply();

        fireEvent.click(screen.getByRole('button', { name: '수정' }));

        expect(screen.getByDisplayValue('좋아보입니다'));
        expect(screen.getByRole('button', { name: '취소' }));
        expect(screen.getByRole('button', { name: '작성' }));
      });
    });
  });

  context('취소버튼을 클릭했을 경우', () => {
    it('댓글 수정 폼이 닫힌 것을 볼 수 있다', async () => {
      localStorage.setItem('accessToken', JSON.stringify('ACCESSTOKEN'));

      await getUserStore.fetchUserInformation();

      renderMyReply();

      fireEvent.click(screen.getByRole('button', { name: '수정' }));

      expect(screen.getByDisplayValue('좋아보입니다'));
      expect(screen.getByRole('button', { name: '취소' }));
      expect(screen.getByRole('button', { name: '작성' }));

      fireEvent.click(screen.getByRole('button', { name: '취소' }));

      expect(screen.queryByDisplayValue('좋아보입니다')).toBeFalsy();
      expect(screen.queryByRole('button', { name: '취소' })).toBeFalsy();
      expect(screen.queryByRole('button', { name: '작성' })).toBeFalsy();
    });
  });

  context('댓글을 수정하는 경우', () => {
    it('수정될 내용을 볼 수 있다', async () => {
      localStorage.setItem('accessToken', JSON.stringify('ACCESSTOKEN'));

      await getUserStore.fetchUserInformation();

      renderMyReply();

      fireEvent.click(screen.getByRole('button', { name: '수정' }));
      screen.getByDisplayValue('좋아보입니다');

      fireEvent.change(screen.getByPlaceholderText('내용을 입력해주세요'), {
        target: {
          value: '매우매우 좋아보여요',
        },
      });

      screen.getByDisplayValue('매우매우 좋아보여요');
    });
  });

  context('수정된 댓글이 1글자 미만인 경우', () => {
    it('수정된 댓글은 제출되지 않는 것을 볼 수 있다', async () => {
      localStorage.setItem('accessToken', JSON.stringify('ACCESSTOKEN'));

      await getUserStore.fetchUserInformation();

      renderMyReply();

      fireEvent.click(screen.getByRole('button', { name: '수정' }));
      screen.getByDisplayValue('좋아보입니다');

      fireEvent.change(screen.getByPlaceholderText('내용을 입력해주세요'), {
        target: {
          value: '',
        },
      });

      fireEvent.click(screen.getByRole('button', { name: '작성' }));

      expect(screen.getByDisplayValue(''));
      expect(screen.getByRole('button', { name: '취소' }));
      expect(screen.getByRole('button', { name: '작성' }));
    });
  });

  describe('댓글 삭제', () => {
    window.alert = jest.fn();

    afterEach(() => {
      jest.clearAllMocks();
    });

    context('삭제 버튼을 클릭했을 경우', () => {
      it('해당 댓글을 삭제한다', async () => {
        localStorage.setItem('accessToken', JSON.stringify('ACCESSTOKEN'));

        await getUserStore.fetchUserInformation();

        renderMyReply();

        fireEvent.click(screen.getByRole('button', { name: '삭제' }));

        expect(mockDelete).toHaveBeenCalledWith({ id: 1 });
      });
    });
  });
});
