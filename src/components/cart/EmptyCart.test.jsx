import { render, screen } from '@testing-library/react';

import EmptyCart from './EmptyCart';

describe('EmptyCart', () => {
  it('장바구니가 비어있습니다 메시지를 볼 수 있다', () => {
    render(<EmptyCart />);

    screen.getByText('장바구니가 비어있습니다.');
  });
});
