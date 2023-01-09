import { render, screen } from '@testing-library/react';

import { cartStore } from '../../stores/CartStore';

import Item from '../../models/Item';

import CartSummary from './CartSummary';

describe('CartSummary', () => {
  beforeEach(() => {
    cartStore.reset();
  });

  it('장바구니에서 선택된 아이템을 토대로 주문 요약을 보여준다', () => {
    const largeBlack = new Item({
      id: 1,
      productId: 1,
      price: 10_000,
      name: 'T-Shirt',
      thumbnailUrl: '1',
      shippingFee: 2_500,
      freeShippingAmount: 50_000,
      option: {
        size: 'L',
        color: 'Black',
      },
    });

    const xlBlack = new Item({
      id: 1,
      productId: 1,
      price: 10_000,
      name: 'T-Shirt',
      thumbnailUrl: '1',
      shippingFee: 2_500,
      freeShippingAmount: 50_000,
      option: {
        size: 'XL',
        color: 'Black',
      },
    });

    cartStore.addItem([largeBlack, xlBlack]);

    render(<CartSummary />);

    expect(screen.getByText('총 주문 상품 0개'));
    expect(screen.getAllByText('0원').length).toBeTruthy();
  });
});
