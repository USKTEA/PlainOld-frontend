import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { ThemeProvider } from 'styled-components';

import { orderItemStore } from '../../stores/OrderItemStore';

import OrderForm from './OrderForm';

import Item from '../../models/Item';

import defaultTheme from '../../styles/defaultTheme';

const context = describe;

describe('OrderForm', () => {
  const renderOrderForm = () => {
    render((
      <ThemeProvider theme={defaultTheme}>
        <MemoryRouter initialEntries={['/order']}>
          <OrderForm />
        </MemoryRouter>
      </ThemeProvider>));
  };

  beforeEach(() => {
    orderItemStore.reset();
  });

  context('주문화면에 진입했을 경우', () => {
    it('사용자는 주문화면에서 주문에 필요한 정보를 볼 수 있다', () => {
      renderOrderForm();

      screen.getByText('주문 상품 정보');
      screen.getByText('주문자 정보');
      screen.getByText('배송 정보');
      screen.getByText('주문 요약');
      screen.getByText('결제수단');
      screen.getByRole('button', { name: '결제하기' });
    });
  });

  it(
    '사용자는 OrderItems을 OrderForm에서 확인할 수 있다',
    () => {
      const item1 = new Item({
        id: 1,
        productId: 1,
        price: 10_000,
        name: 'T-Shirt',
        thumbnailUrl: '1',
        shippingFee: 2_500,
        freeShippingAmount: 50_000,
      });

      const item2 = new Item({
        id: 2,
        productId: 2,
        price: 10_000,
        name: 'Pants',
        thumbnailUrl: '2',
        shippingFee: 2_500,
        freeShippingAmount: 50_000,
      });

      orderItemStore.addOrderItem(item1);
      orderItemStore.addOrderItem(item2);

      renderOrderForm();

      screen.getByText('T-Shirt');
      screen.getByText('Pants');
    },
  );
});
