import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';

import { orderFormStore } from '../../stores/order/OrderFormStore';
import { orderItemStore } from '../../stores/order/OrderItemStore';

import Agreements from './Agreements';

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate() {
    return navigate;
  },
}));

const context = describe;

describe('Agreements', () => {
  const renderAgreements = () => {
    render((
      <Agreements />
    ));
  };

  beforeEach(() => {
    orderItemStore.reset();
    orderFormStore.reset();
  });

  describe('약관 동의', () => {
    context('전체 동의를 클릭했을 경우', () => {
      it('전체 동의를 포함해 모든 체크박스가 체크되어 있는 것을 볼 수 있다', () => {
        renderAgreements();

        fireEvent.click(screen.getByLabelText('전체 동의'));

        expect(screen.getByLabelText('전체 동의')).toBeChecked();
        expect(screen.getByLabelText('개인정보 수집 및 이용 동의 약관보기')).toBeChecked();
        expect(screen.getByLabelText('구매조건 확인 및 결제진행에 동의')).toBeChecked();
      });
    });

    context('개인정보 수집 약관 동의를 클랙했을 경우', () => {
      it('개인정보 수집 약관 동의가 체크되어 있는 것을 볼 수 있다', () => {
        renderAgreements();

        fireEvent.click(screen.getByLabelText('개인정보 수집 및 이용 동의 약관보기'));

        expect(screen.getByLabelText('개인정보 수집 및 이용 동의 약관보기')).toBeChecked();
      });
    });

    context('구매조건 확인 및 결제진행에 동의를 클랙했을 경우', () => {
      it('구매조건 확인 및 결제진행에 동의가 체크되어 있는 것을 볼 수 있다', () => {
        renderAgreements();

        fireEvent.click(screen.getByLabelText('구매조건 확인 및 결제진행에 동의'));

        expect(screen.getByLabelText('구매조건 확인 및 결제진행에 동의')).toBeChecked();
      });
    });

    context('구매조건 확인 및 결제진행에 동의 및 개인정보 수집 약관 동의를 모두 클랙했을 경우', () => {
      it('구매조건 및 개인정보 수집 약관과 전체 동의가 체크되어 있는 것을 볼 수 있다', () => {
        renderAgreements();

        fireEvent.click(screen.getByLabelText('구매조건 확인 및 결제진행에 동의'));

        expect(screen.getByLabelText('구매조건 확인 및 결제진행에 동의')).toBeChecked();
      });
    });

    context('전체 동의를 한 상태에서 약관 하나를 거절하는 경우', () => {
      it('전체 동의 체크가 해제되어 있는 것을 볼 수 있다', () => {
        renderAgreements();

        fireEvent.click(screen.getByLabelText('전체 동의'));

        expect(screen.getByLabelText('전체 동의')).toBeChecked();
        expect(screen.getByLabelText('개인정보 수집 및 이용 동의 약관보기')).toBeChecked();
        expect(screen.getByLabelText('구매조건 확인 및 결제진행에 동의')).toBeChecked();

        fireEvent.click(screen.getByLabelText('개인정보 수집 및 이용 동의 약관보기'));

        expect(screen.getByLabelText('전체 동의')).not.toBeChecked();
      });
    });
  });

  describe('결제하기', () => {
    context('모든 form이 정확한 내용으로 채워졌을 경우', () => {
      it('결제하기를 클릭하면 주문완료 결과가 보인다', async () => {
        const product = {
          id: 1,
          name: 'T-Shirt',
          price: 10000,
          description: {
            productDetail: 'Very Good', productSummary: 'Good',
          },
          image: {
            thumbnailUrl: 'http://url.com',
            productImageUrls: ['http://url.com'],
          },
          shipping: {
            shippingMethod: '택배',
            shippingFee: 2500,
            freeShippingAmount: 50000,
          },
          status: 'ON_SALE',
          categoryId: 1,
        };

        orderItemStore.addOrderItem({ product });

        orderFormStore.changeField({ ordererName: '김뚜루' });
        orderFormStore.changeField({ ordererPhoneNumber: '010-5237-2189' });
        orderFormStore.changeField({ ordererEmail: 'tjrxo1234@gmail.com' });
        orderFormStore.changeField({ receiverName: '김뚜루' });
        orderFormStore.changeField({ receiverPhoneNumber: '010-5237-2189' });
        orderFormStore.changeField({ zipCode: '623814' });
        orderFormStore.changeField({ address1: '서울시 성동구 상원12길 34' });
        orderFormStore.changeField({ address2: '에이원지식산업센터 612호' });
        orderFormStore.changeField({ paymentMethod: 'CASH' });

        renderAgreements();

        fireEvent.click(screen.getByLabelText('전체 동의'));

        fireEvent.click(screen.getByRole('button', { name: '결제하기' }));

        await waitFor(() => {
          expect(navigate).toBeCalledWith('/order-success');
        });
      });
    });
  });
});
