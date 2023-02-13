import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer', () => {
  it('Footer가 렌더링된다', () => {
    render(<Footer />);

    screen.getByText('Developer');
  });
});
