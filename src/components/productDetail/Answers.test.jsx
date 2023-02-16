import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import { editAnswerStore } from '../../stores/answer/EditAnswerStore';
import { getUserStore } from '../../stores/user/GetUserStore';

import Answers from './Answers';

const context = describe;

const mockDelete = jest.fn();

jest.mock('../../hooks/useDeleteAnswerStore', () => () => ({
  errors: {
    delete: '',
  },
  delete: mockDelete,
}));

describe('Answers', () => {
  const answers = [
    {
      id: 1,
      inquiryId: 4,
      answerer: {
        username: 'admin@amdin.com',
        nickname: '관리자',
      },
      content: '별로 궁금하진 않습니다',
      createdAt: '2023-02-02 14:59',
    },
  ];

  const renderAnswers = () => {
    render(<Answers answers={answers} />);
  };

  beforeEach(() => {
    localStorage.removeItem('accessToken');
    editAnswerStore.clear();
  });

  it('답변을 볼 수 있다', () => {
    renderAnswers();

    screen.getByText('관리자');
    screen.getByText('별로 궁금하진 않습니다');
    screen.getByText('2023-02-02 14:59');
  });

  context('어드민일 경우', () => {
    it('수정 및 삭제 버튼을 볼 수 있다', async () => {
      localStorage.setItem('accessToken', JSON.stringify('ADMIN'));

      await getUserStore.fetchUserInformation();

      renderAnswers();

      screen.getByRole('button', { name: '수정' });
      screen.getByRole('button', { name: '삭제' });
    });
  });

  context('어드민이 아닐 경우', () => {
    it('수정 및 삭제 버튼을 볼 수 없다', async () => {
      localStorage.setItem('accessToken', JSON.stringify('ACCESSTOKEN'));

      await getUserStore.fetchUserInformation();

      renderAnswers();

      expect(screen.queryByRole('button', { name: '수정' })).toBeFalsy();
      expect(screen.queryByRole('button', { name: '삭제' })).toBeFalsy();
    });
  });

  describe('답변 수정', () => {
    context('수정 버튼을 클릭했을 경우', () => {
      it('답변수정 폼을 볼 수 있다', async () => {
        localStorage.setItem('accessToken', JSON.stringify('ADMIN'));

        await getUserStore.fetchUserInformation();

        renderAnswers();

        fireEvent.click(screen.getByRole('button', { name: '수정' }));

        screen.getByLabelText('editAnswer');
      });
    });

    context('취소 버튼을 클릭했을 경우', () => {
      it('답변수정 폼은 닫힌다', async () => {
        localStorage.setItem('accessToken', JSON.stringify('ADMIN'));

        await getUserStore.fetchUserInformation();

        renderAnswers();

        fireEvent.click(screen.getByRole('button', { name: '수정' }));

        screen.getByLabelText('editAnswer');

        fireEvent.click(screen.getByRole('button', { name: '취소' }));

        expect(screen.queryByLabelText('editAnswer')).toBeFalsy();
      });
    });

    context('답변을 1글자 미만 입력하고 제출 버튼을 클릭했을 경우', () => {
      it('답변을 입력해주세요 메시지를 볼 수 있다', async () => {
        localStorage.setItem('accessToken', JSON.stringify('ADMIN'));

        await getUserStore.fetchUserInformation();

        renderAnswers();

        fireEvent.click(screen.getByRole('button', { name: '수정' }));

        fireEvent.change(screen.getByLabelText('editAnswer'), {
          target: {
            value: '',
          },
        });

        fireEvent.click(screen.getByRole('button', { name: '제출' }));

        screen.getByText('답변을 입력해주세요');
      });
    });

    context('답변이 성공적으로 제출되었을 경우', () => {
      it('답변수정 폼은 닫힌다', async () => {
        localStorage.setItem('accessToken', JSON.stringify('ADMIN'));

        await getUserStore.fetchUserInformation();

        renderAnswers();

        fireEvent.click(screen.getByRole('button', { name: '수정' }));

        fireEvent.change(screen.getByLabelText('editAnswer'), {
          target: {
            value: '이렇게 수정합니다',
          },
        });

        fireEvent.click(screen.getByRole('button', { name: '제출' }));

        await waitFor(() => {
          expect(screen.queryByLabelText('editAnswer')).toBeFalsy();
        });
      });
    });
  });

  describe('답변삭제', () => {
    context('삭제버튼을 클릭했을 경우', () => {
      it('해당 답변은 삭제된다', async () => {
        localStorage.setItem('accessToken', JSON.stringify('ADMIN'));

        await getUserStore.fetchUserInformation();

        renderAnswers();

        fireEvent.click(screen.getByRole('button', { name: '삭제' }));

        expect(mockDelete).toBeCalledWith({ answerId: answers[0].id });
      });
    });
  });
});
