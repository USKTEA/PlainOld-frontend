import { fireEvent, render, screen } from '@testing-library/react';

import Header from './Header';

const pathName = jest.fn();
const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  Link({ children, to }) {
    return (
      <a href={to}>
        {children}
      </a>
    );
  },
  useNavigate() {
    return navigate;
  },
  useLocation() {
    return {
      pathname: {
        startsWith: pathName,
      },
    };
  },
}));

const context = describe;

describe('Header', () => {
  const renderHeader = () => {
    render(<Header />);
  };

  beforeEach(() => {
    localStorage.removeItem('accessToken');
  });

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
      renderHeader();

      screen.getByRole('link', { name: 'Plain-O' });
      screen.getByRole('link', { name: 'SHOP' });
      screen.getByRole('link', { name: 'ABOUT' });
      screen.getByRole('link', { name: 'Account' });
      screen.getByRole('link', { name: 'Cart' });
      screen.getByRole('link', { name: 'Login' });
    });
  });

  context('로그인을 하지 않으면 Account 링크는', () => {
    it('로그인페이지로 이동한다', () => {
      renderHeader();

      expect(screen.getByRole('link', { name: 'Account' }).getAttribute('href')).toBe('/login');
    });
  });

  context('로그인을 했으면 Account 링크는', () => {
    it('mypage로 이동한다', () => {
      localStorage.setItem('accessToken', JSON.stringify('ACCESSTOKEN'));

      renderHeader();

      expect(screen.getByRole('link', { name: 'Account' }).getAttribute('href')).toBe('/mypage');
    });
  });
  context('로그아웃 버튼을 클릭했을 경우', () => {
    it('메인페이지로 이동한다', () => {
      localStorage.setItem('accessToken', JSON.stringify('ACCESSTOKEN'));

      renderHeader();

      fireEvent.click(screen.getByRole('button', { name: 'Logout' }));

      expect(navigate).toBeCalledWith('/');
    });
  });
});
