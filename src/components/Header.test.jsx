import { render, screen } from '@testing-library/react';

import Header from './Header';

jest.mock('react-router-dom', () => ({
  Link({ children, to }) {
    return (
      <a href={to}>
        {children}
      </a>
    );
  },
  useLocation() {
    return {
      pathname: {
        startsWith: jest.fn(),
      },
    };
  },
}));

describe('Header', () => {
  const renderHeader = () => {
    render(<Header />);
  };

  it('링크를 보여준다', () => {
    renderHeader();

    screen.getByRole('link', { name: 'Plain-O' });
    screen.getByRole('link', { name: 'SHOP' });
    screen.getByRole('link', { name: 'ABOUT' });
    screen.getByRole('link', { name: 'Account' });
    screen.getByRole('link', { name: 'Cart' });
    screen.getByRole('link', { name: 'Login' });
  });
});
// 로그인 시 헤더 변경
