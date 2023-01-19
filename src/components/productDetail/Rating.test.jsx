import { fireEvent, render, screen } from '@testing-library/react';
import Rating from './Rating';

const context = describe;

const changeRate = jest.fn();

describe('Rating', () => {
  const renderRating = () => {
    const review = {
      rate: 5,
      comment: '',
    };

    return render(<Rating
      review={review}
      changeRate={changeRate}
    />);
  };

  it('구매평의 점수를 보여준다', () => {
    const { container } = renderRating();

    const activeStars = container.getElementsByClassName('active-star');

    expect(activeStars).toHaveLength(5);
  });

  context('버튼을 클릭했을 경우', () => {
    it('버튼에 해당하는 점수가 반영된다', () => {
      renderRating();

      const scoreButtons = screen.getAllByRole('button');

      const fourPoints = scoreButtons[3];

      fireEvent.click(fourPoints);

      expect(changeRate).toBeCalledWith(4);
    });
  });
});
