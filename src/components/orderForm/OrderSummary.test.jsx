import { render, screen } from '@testing-library/react';

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
    const product = {
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

    orderItemStore.addOrderItem({ product });

    renderOrderSummary();

    screen.getByText('10,000원');
    screen.getByText('+2,500원');
    screen.getByText('12,500원');
  });
});
