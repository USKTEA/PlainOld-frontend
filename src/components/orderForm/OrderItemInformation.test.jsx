import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Item from '../../models/Item';

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
    it('Item 목록을 보여준다', () => {
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

      renderOrderItemInformation();

      screen.getByText('T-Shirt');
      screen.getByText('Pants');
    });
  });
});
