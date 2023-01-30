import { fireEvent, render, screen } from '@testing-library/react';
import InquiryPagination from './InquiryPagination';

const fetchInquiries = jest.fn();

jest.mock('../../hooks/useGetInquiryStore', () => () => ({
  inquiries: [
    {
      id: 1,
      productId: 1,
      status: '처리대기',
      type: 'PUBLIC',
      title: '사이즈 문의드립니다',
      content: '이렇게 입으면 클까요',
      querist: {
        username: 'tjrxo1234@gmail.com',
        nickname: '김뚜루',
      },
      createdAt: '2023-01-29 14:32',
    },
    {
      id: 2,
      productId: 1,
      status: '답변완료',
      type: 'SECRET',
      title: '비밀글입니다.',
      content: '비밀글입니다.',
      querist: {
        username: 'rlatjrxo1234@gmail.com',
        nickname: '안김뚜루',
      },
      createdAt: '2023-01-30 14:32',
    },
  ],
  page: {
    page: 1,
    total: 1,
  },
  fetchInquiries,
}));

describe('InquiryPagination', () => {
  it('GetInquiryStore 있는 page의 totalPage만큼 페이지를 보여준다', () => {
    const { container } = render(<InquiryPagination />);

    expect(container.getElementsByClassName('page').length).toBe(1);
  });

  it('페이지에 해당하는 버튼을 누르면 해당 페이지에 있는 리뷰목록을 호출하는 함수가 실행된다', () => {
    render(<InquiryPagination />);

    fireEvent.click(screen.getByRole('button', { name: 1 }));

    expect(fetchInquiries).toBeCalledWith({ productId: 1, pageNumber: 1 });
  });
});
