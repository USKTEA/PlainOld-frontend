import { render, screen } from '@testing-library/react';
import SelectedReview from './SelectedReview';

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
  });

  context('로그인을 하지 않았을 경우', () => {
    it('로그인이 필요합니다 메시지를 볼 수 있다', () => {
      renderSelectedReview();

      screen.getByPlaceholderText('로그인이 필요합니다');
    });
  });
});
