import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import OrderPage from './OrderPage';

import defaultTheme from '../styles/defaultTheme';

const context = describe;

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate() {
    return navigate;
  },
}));

describe('OrderPage', () => {
  const renderOrderPage = () => {
    render((
      <ThemeProvider theme={defaultTheme}>
        <OrderPage />
      </ThemeProvider>));
  };

  context('주문 정보가 있을 경우', () => {
    it('주문 화면이 보인다', () => {
      renderOrderPage();

      screen.getByRole('heading', { name: '결제하기' });
    });
  });

  context('로그인을 했을 경우', () => {
    it('주문 화면이 보인다', () => {
      localStorage.setItem('accessToken', JSON.stringify('ACCESSTOKEN'));

      renderOrderPage();

      screen.getByRole('heading', { name: '결제하기' });
    });
  });

  // context('로그인을 하지 않았을 경우', () => {
  //   it('로그인 화면으로 이동한다', () => {
  //     localStorage.setItem('accessToken', JSON.stringify(''));

  //     renderOrderPage();

  //     expect(navigate).toBeCalledWith('/login');
  //   });
  // });
});
