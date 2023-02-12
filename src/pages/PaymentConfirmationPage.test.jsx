import { render, waitFor } from '@testing-library/react';
import PaymentConfirmationPage from './PaymentConfirmationPage';

const context = describe;

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate() {
    return navigate;
  },
  useSearchParams() {
    return [new URLSearchParams({ pg_token: '1' })];
  },
}));

describe('PaymentConfirmationPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.removeItem('orderInformation');
  });

  context('주문을 성공했을 경우', () => {
    it('주문 결과 페이지로 이동한다', async () => {
      const ordererInformation = {
        paymentProvider: 'KAKAOPAY',
        tidId: '1',
        partnerOrderId: '1',
        orderItems: [
          {
            id: 1,
            productId: 1,
            name: 'T-shirt',
            price: 1_000,
            quantity: 1,
            shippingFee: 2_500,
            thumbnailUrl: '1',
            totalPrice: 1_000,
            freeShippingAmount: 50_000,
            option: {
              size: 'XL',
              color: 'Black',
            },
          },
        ],
        orderer: {
          name: '김뚜루',
          phoneNumber: '010-5237-2189',
          email: 'tjrxo1234@gmail.com',
        },
        shippingInformation: {
          receiver: {
            name: '김뚜루',
            phoneNumber: '010-5237-2189',
          },
          address: {
            zipCode: '623814',
            address1: '서울시 성동구 상원12길 34',
            address2: '에이원지식산업센터 612호',
          },
          message: '조심히 와주세요',
        },
        payment: {
          method: 'CASH',
          payer: '김뚜루',
        },
      };

      localStorage.setItem('orderInformation', JSON.stringify(ordererInformation));

      render(<PaymentConfirmationPage />);

      await waitFor(() => {
        expect(navigate).toBeCalledWith('/order-success');
      });
    });
  });

  context('주문을 실패했을 경우', () => {
    it('주문 실패 페이지로 이동한다', async () => {
      const ordererInformation = {
        paymentProvider: 'KAKAOPAY',
        tidId: 'INVALID',
        partnerOrderId: '1',
        orderItems: [
          {
            id: 1,
            productId: 1,
            name: 'T-shirt',
            price: 1_000,
            quantity: 1,
            shippingFee: 2_500,
            thumbnailUrl: '1',
            totalPrice: 1_000,
            freeShippingAmount: 50_000,
            option: {
              size: 'XL',
              color: 'Black',
            },
          },
        ],
        orderer: {
          name: '김뚜루',
          phoneNumber: '010-5237-2189',
          email: 'tjrxo1234@gmail.com',
        },
        shippingInformation: {
          receiver: {
            name: '김뚜루',
            phoneNumber: '010-5237-2189',
          },
          address: {
            zipCode: '623814',
            address1: '서울시 성동구 상원12길 34',
            address2: '에이원지식산업센터 612호',
          },
          message: '조심히 와주세요',
        },
        payment: {
          method: 'CASH',
          payer: '김뚜루',
        },
      };

      localStorage.setItem('orderInformation', JSON.stringify(ordererInformation));

      render(<PaymentConfirmationPage />);

      await waitFor(() => {
        expect(navigate).toBeCalledWith('/order-failure');
      });
    });
  });
});
