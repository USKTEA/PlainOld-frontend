import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Cart from './Cart';

const context = describe;

describe('Cart', () => {
  const renderCart = () => {
    render((
      <MemoryRouter>
        <Cart />
      </MemoryRouter>));
  };

  // describe('CartItems', () => {
  //   context('Cart에 등록된 상품 없을 경우', () => {
  //     it('장바구니가 비어있습니다 메세지를 보여준다', () => {
  //       renderCart();

  //       screen.getByText('장바구니가 비어있습니다');
  //     });
  //   });

  //   context('Cart에 등록된 상품이 있을 경우', () => {
  //     it('Cart에 등록된 상품 정보를 보여준다', () => {
  //       renderCart();

  //       screen.getByText('T-Shirts');
  //       screen.getByText('Pants');
  //     });
  //   });
  // });

  // describe('CartSummary', () => {
  //   context('Cart에 등록된 상품이 없을 경우', () => {
  //     it('CartSummary가 보이지 않는다', () => {
  //       renderCart();

  //       expect(screen.queryByText(/총 주문 상품/)).toBeFalsy();
  //     });
  //   });
  // });
});
