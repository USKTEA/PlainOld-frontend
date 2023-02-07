import GetOrderStore from './GetOrderStore';

const context = describe;

describe('GetOrderStore', () => {
  let getOrderStore;

  beforeEach(() => {
    localStorage.removeItem('accessToken');
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

  describe('GetUserOrder', () => {
    context('사용자 주문내역이 없을 경우', () => {
      it('빈 배열을 반환한다', async () => {
        localStorage.setItem('accessToken', JSON.stringify('NOTHAVEORDER'));

        await getOrderStore.fetchUserOrders();

        const { orders } = getOrderStore;

        expect(orders).toHaveLength(0);
      });
    });

    context('사용자 주문내역이 있을 경우', () => {
      it('주문내역들을 반환한다', async () => {
        localStorage.setItem('accessToken', JSON.stringify('ACCESSTOKEN'));

        await getOrderStore.fetchUserOrders();

        const { orders } = getOrderStore;

        expect(orders).toHaveLength(1);
      });
    });
  });

  describe('FetchOrder', () => {
    context('주문번호가 정확한 경우', () => {
      it('주문상세 내역을 가져온다', async () => {
        const orderNumber = 'tjrxo1234-11111111';

        let { order } = getOrderStore;

        expect(order).toBeFalsy();

        await getOrderStore.fetchOrder({ orderNumber });

        order = getOrderStore.order;

        expect(order).toBeTruthy();
      });
    });

    context('주문번호가 정확하지 않은 경우', () => {
      it('주문상세 내역을 가져오지 않고 에러가 세팅된다', async () => {
        const orderNumber = 'INVALID';

        let { order } = getOrderStore;

        expect(order).toBeFalsy();

        await getOrderStore.fetchOrder({ orderNumber });

        order = getOrderStore.order;

        expect(order).toBeFalsy();
        expect(getOrderStore.errors.orderDetail).toBeTruthy();
      });
    });
  });
});
