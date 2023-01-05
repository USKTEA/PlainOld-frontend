import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { ThemeProvider } from 'styled-components';

import { orderItemStore } from '../../stores/OrderItemStore';

import OrderForm from './OrderForm';

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
      const product1 = {
        id: 1,
        name: 'T-Shirt',
        price: 10000,
        description: {
          productDetail: 'Very Good', productSummary: 'Good',
        },
        image: {
          thumbnailUrl: 'http://url.com',
          productImageUrls: ['http://url.com'],
        },
        shipping: {
          shippingMethod: '택배',
          shippingFee: 2500,
          freeShippingAmount: 50000,
        },
        status: 'ON_SALE',
        categoryId: 1,
      };

      const product2 = {
        id: 2,
        name: 'Pants',
        price: 10000,
        description: { productDetail: 'Very Good', productSummary: 'Good' },
        image: {
          thumbnailUrl: 'http://url.com',
          productImageUrls: ['http://url.com'],
        },
        shipping: {
          shippingMethod: '택배',
          shippingFee: 2500,
          freeShippingAmount: 50000,
        },
        status: 'ON_SALE',
        categoryId: 2,
      };

      orderItemStore.addOrderItem({ product: product1 });
      orderItemStore.addOrderItem({ product: product2 });

      renderOrderForm();

      screen.getByText('T-Shirt');
      screen.getByText('Pants');
    },
  );
});
