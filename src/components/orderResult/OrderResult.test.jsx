import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import OrderResult from './OrderResult';

jest.mock('../../hooks/useCreateOrderStore', () => () => ({
  result: {
    cost: 3500,
    orderNumber: 'tjrxo1234-202301011551',
    paymentMethod: 'CASH',
    receiver: {
      name: '김뚜루',
      phoneNumber: '010-1111-1111',
    },
    shippingAddress: {
      zipCode: '111111',
      address1: '서울시 성동구 상원12길 34',
      address2: '에이원지식산업센터',
    },
  },
}));

describe('OrderResult', () => {
  const renderOrderResult = () => {
    render(
      <MemoryRouter>
        <OrderResult />
      </MemoryRouter>,
    );
  };

  it('주문 결과와 주문 내용을 보여준다', async () => {
    renderOrderResult();

    screen.getByText('주문완료');
    screen.getByText('주문번호');
  });

  it('클릭하면 홈으로 이동하는 링크가 보인다', async () => {
    renderOrderResult();

    expect(screen.getByRole('link')).toHaveAttribute('href', '/');
  });
});
