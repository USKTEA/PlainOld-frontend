import { render, screen } from '@testing-library/react';
import { MemoryRouter, Navigate } from 'react-router-dom';

import OrderSpecification from '../models/OrderSpecification';

import CreateOrderStore from '../stores/CreateOrderStore';

import OrderSuccessPage from './OrderSuccessPage';

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate() {
    return navigate;
  },
}));

const context = describe;

describe('OrderSuccessPage', () => {
  let createOrderStore;

  const renderSuccessPage = () => {
    render((
      <OrderSuccessPage />
    ));
  };

  beforeEach(() => {
    createOrderStore = new CreateOrderStore();
  });

  context('주문 결과가 없을 경우', () => {
    it('에러페이지로 이동시킨다', async () => {
      renderSuccessPage();

      expect(navigate).toBeCalledWith('/error');
    });
  });

  context('주문 결과가 있을 경우', () => {
    it('주문 결과를 알려준다', async () => {
      const orderSpecification = OrderSpecification.fake({ productId: 1 });

      await createOrderStore.createOrder(orderSpecification);

      renderSuccessPage();

      screen.getByText('주문완료');
    });
  });
});
