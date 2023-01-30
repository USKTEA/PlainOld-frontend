import { fireEvent, render, screen } from '@testing-library/react';
import ReviewPagination from './ReviewPagination';

const fetchReviews = jest.fn();
jest.mock('../../hooks/useGetReviewStore', () => () => ({
  reviews: [
    {
      reviewId: 1,
      productId: 1,
      reviewer: { username: 'tjrxo1234@gmail.com', nickname: '김뚜루' },
      rate: 5,
      content: '좋은 상품입니다',
      imageUrl: '1',
      replyCounts: '1',
      cratedAt: '2022-01-15 12:45',
    },
  ],
  page: {
    page: 1,
    total: 1,
  },
  fetchReviews,
}));

describe('ReviewPagination', () => {
  it('ReviewStore에 있는 page의 totalPage만큼 페이지를 보여준다', () => {
    const { container } = render(<ReviewPagination />);

    expect(container.getElementsByClassName('page').length).toBe(1);
  });

  it('페이지에 해당하는 버튼을 누르면 해당 페이지에 있는 리뷰목록을 호출하는 함수가 실행된다', () => {
    render(<ReviewPagination />);

    fireEvent.click(screen.getByRole('button', { name: 1 }));

    expect(fetchReviews).toBeCalledWith({ productId: 1, pageNumber: 1 });
  });
});
