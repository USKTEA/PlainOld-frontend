import { render, screen } from '@testing-library/react';

import OrderItem from '../../models/OrderItem';

import { orderItemStore } from '../../stores/OrderItemStore';

import OrderSummary from './OrderSummary';

describe('OrderSummary', () => {
  const renderOrderSummary = () => {
    render(<OrderSummary />);
  };

  beforeEach(() => {
    orderItemStore.reset();
  });

  it('주문 금액 요약을 보여준다', () => {
    const orderItem = new OrderItem({
      id: 1,
      productId: 1,
      price: 10_000,
      name: 'Pants',
      thumbnailUrl: '2',
      shippingFee: 2_500,
      freeShippingAmount: 50_000,
    });

    orderItemStore.addOrderItem(orderItem);

    renderOrderSummary();

    screen.getByText('10,000원');
    screen.getByText('+2,500원');
    screen.getByText('12,500원');
  });
});
