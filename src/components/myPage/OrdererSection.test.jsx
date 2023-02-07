import { render, screen } from '@testing-library/react';
import OrdererSection from './OrdererSection';

describe('OrdererSection', () => {
  it('Orderer정보를 볼 수 있다', () => {
    const orderer = {
      name: '김뚜루',
      phoneNumber: '010-1111-1111',
      email: 'tjrxo1234@gmail.coms',
    };

    render(<OrdererSection orderer={orderer} />);

    screen.getByText('구매자 정보');
    screen.getByText('주문자');
    screen.getByText('연락처');
    screen.getByText('이메일');
  });
});
