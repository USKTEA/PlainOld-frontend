import { render, screen } from '@testing-library/react';
import OrderCancelPage from './OrderCancelPage';

describe('OrderCancelPage', () => {
  it('주문취소 메시지를 볼 수 있다', () => {
    render(<OrderCancelPage />);

    screen.getByText('주문취소');
  });
});
