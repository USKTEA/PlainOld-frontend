import { render, screen } from '@testing-library/react';
import Review from './Review';

const context = describe;

describe('Review', () => {
  const renderPhotoReview = () => {
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

    return render(<Review review={review} />);
  };

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
      cratedAt: '2022-01-15 12:45',
    };

    return render(<Review review={review} />);
  };

  context('포토 구매평인 경우', () => {
    it('구매평 사진과 내용이 보인다', () => {
      const { container } = renderPhotoReview();

      screen.getByText('좋은 상품입니다');

      expect(container.getElementsByClassName('star-active')).toHaveLength(5);
      screen.getByAltText('구매평이미지');
    });
  });

  context('일반 리뷰인 경우', () => {
    it('구매평과 댓글의 숫자가 보인다', () => {
      const { container } = renderReview();

      screen.getByText('좋은 상품입니다');

      expect(container.getElementsByClassName('star-active')).toHaveLength(5);
    });
  });
});
