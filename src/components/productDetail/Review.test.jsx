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

    return render(<Review review={review} replies={[]} />);
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

    return render(<Review review={review} replies={[]} />);
  };

  const renderReviewWithReply = () => {
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

    const replies = [
      {
        id: 1,
        reviewId: 1,
        comment: '좋은 상품이군요',
        replier: {
          username: 'tjrxo1234@gmail.com',
          nickname: '김뚜루',
        },
        createdAt: '2022-01-15 12:46',
      },
    ];

    return render(<Review review={review} replies={replies} />);
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
    it('구매평 내용이 보인다', () => {
      const { container } = renderReview();

      screen.getByText('좋은 상품입니다');

      expect(container.getElementsByClassName('star-active')).toHaveLength(5);
    });
  });

  context('댓글이 있을 경우', () => {
    it('댓글의 갯수가 보인다', () => {
      renderReviewWithReply();

      screen.getByText('좋은 상품입니다');

      screen.getByText('댓글 1');
    });
  });
});
