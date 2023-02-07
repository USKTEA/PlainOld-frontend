import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { getOrderStore } from '../../stores/order/GetOrderStore';
import OrderHistory from './OrderHistory';

const context = describe;

describe('Orders', () => {
  beforeEach(() => {
    localStorage.removeItem('accessToken');
    getOrderStore.clear();
  });

  context('주문내역이 없을 경우', () => {
    it('주문 내역이 없습니다 메시지를 볼 수 있다', async () => {
      localStorage.setItem('accessToken', JSON.stringify('NOTHAVEORDER'));

      await getOrderStore.fetchUserOrders();

      render((
        <MemoryRouter>
          <OrderHistory />
        </MemoryRouter>));

      screen.getByText('주문 내역이 없습니다.');
    });
  });

  context('주문내역이 있을 경우', () => {
    it('주문 내역을 볼 수 있다', async () => {
      localStorage.setItem('accessToken', JSON.stringify('ACCESSTOKEN'));

      await getOrderStore.fetchUserOrders();

      render((
        <MemoryRouter>
          <OrderHistory />
        </MemoryRouter>));

      screen.getByText(/주문번호/);
      screen.getByText('T-shirt');
      screen.getByText(/10,000원/);
      screen.getByText(/1 개/);
      screen.getByText('XL / Black');
      screen.getByText('입금대기');
      screen.getByText('주문일자 2022-01-15');
    });
  });
});
