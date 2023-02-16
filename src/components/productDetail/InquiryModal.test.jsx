import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';

import { getAnswerStore } from '../../stores/answer/GetAnswerStore';
import { editInquiryStore } from '../../stores/inquiry/EditInquiryStore';
import { getUserStore } from '../../stores/user/GetUserStore';

import InquiryModal from './InquiryModal';

const context = describe;

const setInquiry = jest.fn();

describe('InquiryModal', () => {
  const myInquiry = {
    id: 1,
    productId: 1,
    status: 'PENDING',
    type: 'PUBLIC',
    title: '사이즈 문의드립니다',
    content: '이렇게 입으면 클까요',
    querist: {
      username: 'tjrxo1234@gmail.com',
      nickname: '김뚜루',
    },
    createdAt: '2023-01-29 14:32',
  };

  const finishedInquiry = {
    id: 1,
    productId: 1,
    status: 'FINISHED',
    type: 'PUBLIC',
    title: '사이즈 문의드립니다',
    content: '이렇게 입으면 클까요',
    querist: {
      username: 'tjrxo1234@gmail.com',
      nickname: '김뚜루',
    },
    createdAt: '2023-01-29 14:32',
  };

  const othersInquiry = {
    id: 2,
    productId: 1,
    status: 'PENDING',
    type: 'PUBLIC',
    title: '색상 문의드립니다',
    content: '이런 색상인가요',
    querist: {
      username: 'rlatjrxo1234@gmail.com',
      nickname: '안김뚜루',
    },
    createdAt: '2023-01-29 15:32',
  };

  const answeredInquiry = {
    id: 4,
    productId: 1,
    status: 'PENDING',
    type: 'PUBLIC',
    title: '이렇게 입을까요',
    content: '이렇게 입고싶은데요',
    querist: {
      username: 'rlatjrxo1234@gmail.com',
      nickname: '안김뚜루',
    },
    createdAt: '2023-01-29 15:32',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.removeItem('accessToken');
    getUserStore.clear();
    editInquiryStore.clear();
    getAnswerStore.clear();
  });

  it('상품문의를 볼 수 있다', () => {
    render(<InquiryModal
      inquiry={myInquiry}
      setInquiry={setInquiry}
    />);

    screen.getByText('사이즈 문의드립니다');
    screen.getByText('이렇게 입으면 클까요');
    screen.getByText('김뚜루');
    screen.getByText('2023-01-29 14:32');
  });

  describe('상품문의 수정 및 삭제버튼', () => {
    context('내가 작성한 상품문의일 경우', () => {
      it('상품문의 수정 및 삭제버튼을 볼 수 있다', async () => {
        localStorage.setItem('accessToken', JSON.stringify('ACCESSTOKEN'));

        await getUserStore.fetchUserInformation();

        render(<InquiryModal
          inquiry={myInquiry}
          setInquiry={setInquiry}
        />);

        screen.getByRole('button', { name: '수정' });
        screen.getByRole('button', { name: '삭제' });
      });
    });

    context('내가 작성한 상품문의가 아닐 경우', () => {
      it('상품문의 수정 및 삭제버튼을 볼 수 없다', async () => {
        localStorage.setItem('accessToken', JSON.stringify('ACCESSTOKEN'));

        await getUserStore.fetchUserInformation();

        render(<InquiryModal
          inquiry={othersInquiry}
          setInquiry={setInquiry}
        />);

        expect(screen.queryByRole('button', { name: '수정' })).toBeFalsy();
        expect(screen.queryByRole('button', { name: '삭제' })).toBeFalsy();
      });
    });

    context('어드민일 경우', () => {
      it('상품문의 수정 및 삭제버튼을 볼 수 있다', async () => {
        localStorage.setItem('accessToken', JSON.stringify('ADMIN'));

        await getUserStore.fetchUserInformation();

        render(<InquiryModal
          inquiry={othersInquiry}
          setInquiry={setInquiry}
        />);

        screen.getByRole('button', { name: '수정' });
        screen.getByRole('button', { name: '삭제' });
      });
    });

    context('답변완료된 상품문의일 경우', () => {
      it('수정 버튼을 볼 수 없다', async () => {
        localStorage.setItem('accessToken', JSON.stringify('ACCESSTOKEN'));

        await getUserStore.fetchUserInformation();

        render(<InquiryModal
          inquiry={finishedInquiry}
          setInquiry={setInquiry}
        />);

        expect(screen.queryByRole('button', { name: '수정' })).toBeFalsy();
        screen.getByRole('button', { name: '삭제' });
      });
    });
  });

  describe('모달창 닫기 버튼', () => {
    it('모달창을 닫는다', async () => {
      localStorage.setItem('accessToken', JSON.stringify('ADMIN'));

      await getUserStore.fetchUserInformation();

      render(<InquiryModal
        inquiry={othersInquiry}
        setInquiry={setInquiry}
      />);

      fireEvent.click(screen.getByRole('button', { name: '✕' }));

      expect(setInquiry).toBeCalledWith(null);
    });
  });

  describe('상품문의 수정', () => {
    context('수정 버튼을 클릭했을 경우', () => {
      it('상품문의 수정 폼을 볼 수 있다', async () => {
        localStorage.setItem('accessToken', JSON.stringify('ADMIN'));

        await getUserStore.fetchUserInformation();

        render(<InquiryModal
          inquiry={othersInquiry}
          setInquiry={setInquiry}
        />);

        fireEvent.click(screen.getByRole('button', { name: '수정' }));

        screen.getByLabelText('editTitle');
        screen.getByLabelText('editContent');
        expect(screen.getByRole('button', { name: '취소' }));
        expect(screen.getByRole('button', { name: '제출' }));
      });
    });

    context('취소 버튼을 클릭했을 경우', () => {
      it('상품문의 수정 폼은 볼 수 없다', async () => {
        localStorage.setItem('accessToken', JSON.stringify('ADMIN'));

        await getUserStore.fetchUserInformation();

        render(<InquiryModal
          inquiry={othersInquiry}
          setInquiry={setInquiry}
        />);

        fireEvent.click(screen.getByRole('button', { name: '수정' }));

        screen.getByLabelText('editTitle');
        screen.getByLabelText('editContent');

        fireEvent.click(screen.getByRole('button', { name: '취소' }));

        expect(screen.queryByLabelText('editTitle')).toBeFalsy();
        expect(screen.queryByLabelText('editContent')).toBeFalsy();
      });
    });

    context('상뭄문의 제목을 1글자 미만으로 수정하고 제출 버튼을 클릭했을 경우', () => {
      it('문의내용이 정확하지 않습니다 메시지를 볼 수 있다', async () => {
        localStorage.setItem('accessToken', JSON.stringify('ADMIN'));

        await getUserStore.fetchUserInformation();

        render(<InquiryModal
          inquiry={othersInquiry}
          setInquiry={setInquiry}
        />);

        fireEvent.click(screen.getByRole('button', { name: '수정' }));

        fireEvent.change(screen.getByLabelText('editTitle'), {
          target: {
            value: '',
          },
        });

        fireEvent.click(screen.getByRole('button', { name: '제출' }));

        screen.getByText('문의내용이 정확하지 않습니다');
      });
    });

    context('상품문의 내용을 1글자 미만으로 수정하고 제출 버튼을 클릭했을 경우', () => {
      it('문의내용이 정확하지 않습니다 메시지를 볼 수 있다', async () => {
        localStorage.setItem('accessToken', JSON.stringify('ADMIN'));

        await getUserStore.fetchUserInformation();

        render(<InquiryModal
          inquiry={othersInquiry}
          setInquiry={setInquiry}
        />);

        fireEvent.click(screen.getByRole('button', { name: '수정' }));

        fireEvent.change(screen.getByLabelText('editContent'), {
          target: {
            value: '',
          },
        });

        fireEvent.click(screen.getByRole('button', { name: '제출' }));

        screen.getByText('문의내용이 정확하지 않습니다');
      });
    });

    context('상품문의를 1글자 이상으로 수정하고 제출 버튼을 클릭했을 경우', () => {
      it('상품문의가 수정되고 모달창은 닫힌다', async () => {
        localStorage.setItem('accessToken', JSON.stringify('ADMIN'));

        await getUserStore.fetchUserInformation();

        render(<InquiryModal
          inquiry={othersInquiry}
          setInquiry={setInquiry}
        />);

        fireEvent.click(screen.getByRole('button', { name: '수정' }));

        fireEvent.change(screen.getByLabelText('editContent'), {
          target: {
            value: '실은 이렇게 수정하고 싶어요',
          },
        });

        fireEvent.click(screen.getByRole('button', { name: '제출' }));

        await waitFor(() => {
          expect(setInquiry).toBeCalledWith(null);
        });
      });
    });
  });

  describe('상품문의 삭제', () => {
    context('삭제 버튼을 클릭했을 경우', () => {
      it('상품문의는 삭제된다', async () => {
        localStorage.setItem('accessToken', JSON.stringify('ACCESSTOKEN'));

        await getUserStore.fetchUserInformation();

        render(<InquiryModal
          inquiry={myInquiry}
          setInquiry={setInquiry}
        />);

        fireEvent.click(screen.getByRole('button', { name: '삭제' }));

        await waitFor(() => {
          expect(setInquiry).toBeCalledWith(null);
        });
      });
    });
  });

  describe('상품문의 답변', () => {
    context('답변이 있을 경우', () => {
      it('답변을 볼 수 있다', async () => {
        localStorage.setItem('accessToken', JSON.stringify('ACCESSTOKEN'));

        const inquiryIds = [answeredInquiry.id];

        await getAnswerStore.fetchAnswers({ inquiryIds });
        await getUserStore.fetchUserInformation();

        render(<InquiryModal
          inquiry={answeredInquiry}
          setInquiry={setInquiry}
        />);

        screen.getByText('관리자');
        screen.getByText('맞습니다 그렇게 입으시면 됩니다');
      });
    });
  });

  describe('상품문의 답변', () => {
    context('어드민일 경우', () => {
      it('상품문의 답변을 작성할 수 있다', async () => {
        localStorage.setItem('accessToken', JSON.stringify('ADMIN'));

        const inquiryIds = [answeredInquiry.id];

        await getAnswerStore.fetchAnswers({ inquiryIds });
        await getUserStore.fetchUserInformation();

        render(<InquiryModal
          inquiry={answeredInquiry}
          setInquiry={setInquiry}
        />);

        expect(screen.queryByPlaceholderText('관리자만 답글 작성이 가능합니다')).toBeFalsy();
      });
    });
  });
});
