import { fireEvent, render, screen } from '@testing-library/react';

import { editReplyStore } from '../../stores/EditReplyStore';

import EditForm from './EditForm';

const context = describe;

describe('EditForm', () => {
  const toEdit = {
    id: 1,
    reviewId: 1,
    comment: '좋습니다',
  };

  beforeEach(() => {
    editReplyStore.clear();
  });

  it('수정할 댓글의 내용을 볼 수 있다', () => {
    editReplyStore.setToEdit({ ...toEdit });

    render(<EditForm />);

    screen.getByDisplayValue('좋습니다');
    screen.getByRole('button', { name: '취소' });
    screen.getByRole('button', { name: '작성' });
  });

  context('댓글 내용을 할 경우', () => {
    it('수정된 내용을 볼 수 있다', () => {
      editReplyStore.setToEdit({ ...toEdit });

      render(<EditForm />);

      fireEvent.change(screen.getByDisplayValue('좋습니다'), {
        target: {
          value: '매우매우 좋아요',
        },
      });

      screen.getByDisplayValue('매우매우 좋아요');
    });
  });
});
