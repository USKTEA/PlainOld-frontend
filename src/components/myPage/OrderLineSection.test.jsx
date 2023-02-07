import { render, screen } from '@testing-library/react';
import OrderLineSection from './OrderLineSection';

describe('OrderLineSection', () => {
  it('주문상품들을 볼 수 있다', () => {
    const orderNumber = 'tjrxo1234-11111111';
    const orderLines = [
      {
        productName: 'T-shirt',
        thumbnailUrl: '1',
        option: {
          color: 'Black',
          size: 'XL',
        },
        totalPrice: 10_000,
        quantity: 1,
      },
    ];
    const shippingFee = 3_500;
    const status = '입금대기';

    render(<OrderLineSection
      orderNumber={orderNumber}
      orderLines={orderLines}
      shippingFee={shippingFee}
      status={status}
    />);

    screen.getByText('상품 정보');
    screen.getByText('배송비');
    screen.getByText('진행상태');
    screen.getByText('T-shirt');
    screen.getByText('3,500원');
    screen.getByText('입금대기');
  });
});
