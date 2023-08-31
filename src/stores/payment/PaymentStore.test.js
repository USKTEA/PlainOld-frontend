import PaymentStore from './PaymentStore';

const context = describe;

describe('PaymentStore', () => {
  let paymentStore;

  beforeEach(() => {
    paymentStore = new PaymentStore();
  });

  describe('GetReadyPayment', () => {
    context('요청에 실패했을 경우', () => {
      it('redirectUrl을 반환받지 않는다', async () => {
        const provider = 'INVALID';
        const orderItems = [
          {
            id: 1,
            name: 'T-shirt',
            price: 1000,
            productId: 1,
            quantity: 1,
            thumbnailUrl: '1',
            totalPrice: 1000,
            shippingFee: 2500,
            freeShippingAmount: 50000,
            option: {
              color: 'Black',
              size: 'XL',
            },
          },
        ];
        const redirectUrl = await paymentStore.getReadyPayment(
          { provider, orderItems },
        );

        expect(redirectUrl).toBeFalsy();
      });
    });

    context('요청에 성공했을 경우', () => {
      it('redirectUrl을 반환받는다', async () => {
        const provider = 'KAKAOPAY';
        const orderItems = [
          {
            id: 1,
            name: 'T-shirt',
            price: 1000,
            productId: 1,
            quantity: 1,
            thumbnailUrl: '1',
            totalPrice: 1000,
            shippingFee: 2500,
            freeShippingAmount: 50000,
            option: {
              color: 'Black',
              size: 'XL',
            },
          },
        ];
        const redirectUrl = await paymentStore.getReadyPayment(
          { provider, orderItems },
        );

        expect(redirectUrl).toBeTruthy();
      });
    });
  });

  describe('Approve', () => {
    context('결제 승인이 되었을 경우', () => {
      it('approveCode를 반환한다', async () => {
        const provider = 'KAKAOPAY';
        const pgToken = '1';
        const prePaymentId = 1;
        const partnerOrderId = '1';

        const approveCode = await paymentStore.approve(
          {
            provider, pgToken, prePaymentId, partnerOrderId,
          },
        );

        expect(approveCode).toBeTruthy();
      });
    });

    context('결제 승인이 되지 않았을 경우', () => {
      it('approveCode를 반환하지 않는다', async () => {
        const provider = 'KAKAOPAY';
        const pgToken = '1';
        const prePaymentId = 'INVALID';
        const partnerOrderId = '1';

        const approveCode = await paymentStore.approve(
          {
            provider, pgToken, prePaymentId, partnerOrderId,
          },
        );

        expect(approveCode).toBeFalsy();
      });
    });
  });
});
