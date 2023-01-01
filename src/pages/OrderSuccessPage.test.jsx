import { render, screen, waitFor } from '@testing-library/react';

import OrderSpecification from '../models/OrderSpecification';

import CreateOrderStore from '../stores/CreateOrderStore';

import OrderSuccessPage from './OrderSuccessPage';

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate() {
    return navigate;
  },
  Link({ children, to, style }) {
    return (
      <a href={to} style={style}>
        {children}
      </a>
    );
  },
}));

jest.mock('../hooks/useCreateOrderStore', () => () => ({
  result: {
    cost: 3500,
    orderNumber: 'tjrxo1234-202301011551',
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

const context = describe;

describe('OrderSuccessPage', () => {
  const renderSuccessPage = () => {
    render((
      <OrderSuccessPage />
    ));
  };

  context('주문 결과가 있을 경우', () => {
    it('주문 결과를 알려준다', async () => {
      renderSuccessPage();

      screen.getByText('주문완료');
    });
  });
});
