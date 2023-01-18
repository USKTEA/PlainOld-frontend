import { fireEvent, render, screen } from '@testing-library/react';
import Rating from './Rating';

const context = describe;

describe('Rateing', () => {
  it('초기값으로 5점이 세팅된다', () => {
    const { container } = render(<Rating />);

    const activeStars = container.getElementsByClassName('active-star');

    expect(activeStars).toHaveLength(5);
  });

  context('버튼을 클릭했을 경우', () => {
    it('버튼에 해당하는 점수가 반영된다', () => {
      const { container } = render(<Rating />);

      const activeStars = container.getElementsByClassName('active-star');

      expect(activeStars).toHaveLength(5);

      const scoreButtons = screen.getAllByRole('button');

      const fourPoints = scoreButtons[3];

      fireEvent.click(fourPoints);

      expect(activeStars).toHaveLength(4);
    });
  });
});
