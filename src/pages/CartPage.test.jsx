import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { cartStore } from '../stores/cart/CartStore';

import Item from '../models/Item';

import CartPage from './CartPage';

const context = describe;

describe('CartPage', () => {
  const item = new Item({
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

  beforeEach(() => {
    cartStore.reset();
  });

  context('장바구니에 상품이 있을 경우', () => {
    it('상품 정보를 보여준다', () => {
      cartStore.addItem([item]);

      render((
        <MemoryRouter>
          <CartPage />
        </MemoryRouter>
      ));

      screen.getByText('장바구니');
      screen.getByText('상품 정보');
      screen.getByText('주문하기');
    });
  });

  context('장바구니에 상품이 없을 경우', () => {
    it('장바구니가 비어있습니다 메시지를 볼 수 있다', () => {
      localStorage.setItem('cartItems', '');

      render((
        <MemoryRouter>
          <CartPage />
        </MemoryRouter>
      ));

      screen.getByText('장바구니가 비어있습니다.');
    });
  });

  context('로그인을 했을 경우', () => {
    it('서버로 부터 회원의 카트 정보를 불러온다', async () => {
      localStorage.setItem('accessToken', JSON.stringify('ACCESSTOKEN'));

      render((
        <MemoryRouter>
          <CartPage />
        </MemoryRouter>
      ));

      await waitFor(() => {
        expect(screen.getAllByText('T-Shirt').length).toBeTruthy();
      });
    });
  });
});
