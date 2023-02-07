import CancelOrderStore from './CancelOrderStore';

const context = describe;

describe('CancelOrderStore', () => {
  let cancelOrderStore;

  beforeEach(() => {
    cancelOrderStore = new CancelOrderStore();
  });

  describe('SetOrderNumber', () => {
    it('request에 orderNumber를 설정한다', () => {
      let { request } = cancelOrderStore;

      expect(request.orderNumber).toBeFalsy();

      const orderNumber = 'tjrxo1234-11111111';

      cancelOrderStore.setOrderNumber(orderNumber);

      request = cancelOrderStore.request;

      expect(request).toBeTruthy();
    });
  });

  describe('Cancel', () => {
    context('주문을 성공적으로 취소했을 경우', () => {
      it('취소한 주문의 orderNumber를 반환한다', async () => {
        const orderNumber = 'tjrxo1234-11111111';

        cancelOrderStore.setOrderNumber(orderNumber);

        const canceled = await cancelOrderStore.cancel();

        expect(canceled).toBeTruthy();
      });
    });

    context('주문 취소를 실패했을 경우', () => {
      it('에러를 세팅한다', async () => {
        const orderNumber = 'INVALID';

        cancelOrderStore.setOrderNumber(orderNumber);

        const canceled = await cancelOrderStore.cancel();

        expect(canceled).toBeFalsy();

        const { errors } = cancelOrderStore;

        expect(errors.cancel).toBeTruthy();
      });
    });
  });
});
