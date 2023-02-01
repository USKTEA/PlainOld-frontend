import GetOrderStore from './GetOrderStore';

const context = describe;

describe('GetOrderStore', () => {
  let getOrderStore;

  beforeEach(() => {
    getOrderStore = new GetOrderStore();
  });

  describe('GetOrderDoNotHaveReview', () => {
    context('리뷰를 작성하지 않은 주문이 있을 경우', () => {
      it('리뷰를 작성하지 않은 가장 오래된 주문 번호를 반환한다', async () => {
        const productId = 1;

        await getOrderStore.fetchOrderDoNotHaveReview(
          { productId },
        );

        expect(getOrderStore.orderNumber).toBeTruthy();
      });
    });

    context('리뷰를 작성할 수 있는 주문이 없을 경우', () => {
      it('orderNumber를 반환받지 않고 error가 세팅된다 ', async () => {
        const productId = 2;

        const orderNumber = await getOrderStore.fetchOrderDoNotHaveReview(
          { productId },
        );

        expect(orderNumber).toBeFalsy();
        expect(getOrderStore.errors.cantWriteReview).toBeTruthy();
      });
    });
  });
});
