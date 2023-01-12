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

const context = describe;

describe('Header', () => {
  const renderHeader = () => {
    render(<Header />);
  };

  context('로그인을 했을 경우', () => {
    it('로그인 링크는 보이지 않고 로그아웃을 버튼을 보여준다', () => {
      localStorage.setItem('accessToken', JSON.stringify('ACCESSTOKEN'));

      renderHeader();

      screen.getByRole('link', { name: 'Plain-O' });
      screen.getByRole('link', { name: 'SHOP' });
      screen.getByRole('link', { name: 'ABOUT' });
      screen.getByRole('link', { name: 'Account' });
      screen.getByRole('link', { name: 'Cart' });
      screen.getByRole('button', { name: 'Logout' });
    });
  });

  context('로그인을 하지 않았을 경우', () => {
    it('로그아웃은 보이지 않고 로그인 링크가 보인다', () => {
      localStorage.removeItem('accessToken');

      renderHeader();

      screen.getByRole('link', { name: 'Plain-O' });
      screen.getByRole('link', { name: 'SHOP' });
      screen.getByRole('link', { name: 'ABOUT' });
      screen.getByRole('link', { name: 'Account' });
      screen.getByRole('link', { name: 'Cart' });
      screen.getByRole('link', { name: 'Login' });
    });
  });
});
