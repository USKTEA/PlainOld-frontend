import { render, screen } from '@testing-library/react';
import Review from './Review';

describe('Review', () => {
  const renderReview = () => {
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

    return render(<Review review={review} />);
  };

  it('Prop으로 전달받은 Review 내용을 보여준다', () => {
    const { container } = renderReview();

    screen.getByText('좋은 상품입니다');

    expect(container.getElementsByClassName('star-active')).toHaveLength(5);
  });
});
