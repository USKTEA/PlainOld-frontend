import { fireEvent, render, screen } from '@testing-library/react';
import Footer from './Footer';

const context = describe;

describe('Footer', () => {
  it('Footer가 렌더링된다', () => {
    render(<Footer />);

    screen.getByText('Developer');
  });

  context('TermsOfUse 버튼을 클릭했을 경우', () => {
    it('이용약관을 볼 수 있다', () => {
      render(<Footer />);

      fireEvent.click(screen.getByRole('button', { name: 'Terms of Use' }));

      screen.getByText('이용약관');
    });
  });

  context('Privacy Policy를 클릭했을 경우', () => {
    it('개인정보처리방침을 볼 수 있다', () => {
      render(<Footer />);

      fireEvent.click(screen.getByRole('button', { name: 'Privacy Policy' }));

      screen.getByText('개인정보처리방침');
    });
  });
});
