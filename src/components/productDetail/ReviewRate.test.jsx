import { render } from '@testing-library/react';
import ReviewRate from './ReviewRate';

describe('ReviewRate', () => {
  it('Prop으로 들어오는 Rate만큼 점수를 보여준다', () => {
    const rate = 5;

    const { container } = render(<ReviewRate rate={rate} />);

    expect(container.getElementsByClassName('star-active')).toHaveLength(5);
  });
});
