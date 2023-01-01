import OrderSpecification from '../models/OrderSpecification';
import CreateOrderStore from './CreateOrderStore';

const context = describe;

describe('createOrderStore', () => {
  let createOrderStore;

  beforeEach(() => {
    createOrderStore = new CreateOrderStore();
  });

  describe('CreateOrder', () => {
    context('주문이 성공적으로 처리되었을 경우', () => {
      it('생성된 주문의 정보를 반환한다', async () => {
        const orderSpecification = OrderSpecification.fake({ productId: 1 });

        await createOrderStore.createOrder(orderSpecification);

        const { result } = createOrderStore;

        expect(result).not.toBeFalsy();
      });
    });

    context('주문이 성공적으로 처리되지 않았을 경우', () => {
      it('반환되는 정보가 없다', async () => {
        const orderSpecification = OrderSpecification.fake(
          { productId: 9_999_999 },
        );

        await createOrderStore.createOrder(orderSpecification);

        const { result } = createOrderStore;

        expect(result).toBeFalsy();
      });
    });
  });

  describe('Clear', () => {
    it('Result와 error 정보를 초기화한다', async () => {
      const orderSpecification = OrderSpecification.fake(
        { productId: 1 },
      );

      await createOrderStore.createOrder(orderSpecification);

      expect(createOrderStore.result).toBeTruthy();

      createOrderStore.clear();

      expect(createOrderStore.result).toBeFalsy();
      expect(createOrderStore.errors.createOrder).toBeFalsy();
    });
  });
});
