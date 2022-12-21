import { render, screen } from '@testing-library/react';

import Products from './Products';

const context = describe;

describe('Products', () => {
  context('쇼핑몰에 판매 중이 상품이 없을 경우', () => {
    it('상품이 존재하지 않습니다 메세지를 볼 수 있다', () => {
      render(<Products />);

      screen.getByText('상품이 존재하지 않습니다');
    });
  });
});
