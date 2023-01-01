import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import OrderItem from '../../models/OrderItem';

import { orderItemStore } from '../../stores/OrderItemStore';

import OrderItemInformation from './OrderItemInformation';

const context = describe;

describe('OrderItemInformation', () => {
  const renderOrderItemInformation = () => {
    render((
      <MemoryRouter>
        <OrderItemInformation />
      </MemoryRouter>
    ));
  };

  beforeEach(() => {
    orderItemStore.reset();
  });

  context('OrderItem이 있을 경우', () => {
    it('OrderItem 목록을 보여준다', () => {
      const orderItem1 = new OrderItem({
        id: 1,
        productId: 1,
        price: 10_000,
        name: 'T-Shirt',
        thumbnailUrl: '1',
        shippingFee: 2_500,
        freeShippingAmount: 50_000,
      });

      const orderItem2 = new OrderItem({
        id: 2,
        productId: 2,
        price: 10_000,
        name: 'Pants',
        thumbnailUrl: '2',
        shippingFee: 2_500,
        freeShippingAmount: 50_000,
      });

      orderItemStore.addOrderItem(orderItem1);
      orderItemStore.addOrderItem(orderItem2);

      renderOrderItemInformation();

      screen.getByText('T-Shirt');
      screen.getByText('Pants');
    });
  });
});
