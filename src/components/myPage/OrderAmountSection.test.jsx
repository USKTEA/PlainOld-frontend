import { render, screen } from '@testing-library/react';
import OrderAmountSection from './OrderAmountSection';

const context = describe;

describe('OrderAmountSection', () => {
  context('배송비가 있을 경우', () => {
    it('배송비를 포함한 전체 금액을 볼 수 있다', () => {
      const cost = 13_500;
      const shippingFee = 3_500;
      const payment = 'CASH';

      render(<OrderAmountSection
        cost={cost}
        shippingFee={shippingFee}
        payment={payment}
      />);

      screen.getByText('주문 금액 상세');
      screen.getByText('주문금액');
      screen.getByText('13,500원');
      screen.getByText('3,500원');
      screen.getByText('무통장입금');
    });
  });

  context('배송비가 없을 경우', () => {
    it('배송비가 무료인 것을 볼 수 있다', () => {
      const cost = 13_500;
      const shippingFee = 0;
      const payment = 'CASH';

      render(<OrderAmountSection
        cost={cost}
        shippingFee={shippingFee}
        payment={payment}
      />);

      screen.getByText('무료');
    });
  });
});
