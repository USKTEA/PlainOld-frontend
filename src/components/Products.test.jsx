import { render, screen } from '@testing-library/react';

import { productStore } from '../stores/ProductStore';

import Products from './Products';

const context = describe;

describe('Products', () => {
  context('쇼핑몰에 판매 중이 상품이 없을 경우', () => {
    it('상품이 존재하지 않습니다 메세지를 볼 수 있다', () => {
      render(<Products />);

      screen.getByText('상품이 존재하지 않습니다');
    });
  });

  context('쇼핑몰에 판매 중인 상품이 있을 경우', () => {
    it('판매 중인 상품을 보여준다', async () => {
      await productStore.fetchProducts();

      render(<Products />);

      screen.getByText('T-shirt');
      screen.getByAltText('T-shirt');
    });
  });
});
