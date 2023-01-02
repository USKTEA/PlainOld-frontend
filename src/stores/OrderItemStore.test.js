import OrderItemStore from './OrderItemStore';
import Item from '../models/Item';

const context = describe;

describe('OrderItemStore', () => {
  let orderItemStore;

  beforeEach(() => {
    orderItemStore = new OrderItemStore();
  });

  context('OrderItems 생성하는 경우', () => {
    it('전달받은 상품 정보를 이용해 orderItems 생성한다', () => {
      expect(orderItemStore.numberOfOrderItems()).toBe(0);

      const item = new Item({
        id: 1,
        price: 10_000,
        name: 'T-Shirt',
        thumbnailUrl: '1',
        shippingFee: 2_500,
        freeShippingAmount: 50_000,
      });

      orderItemStore.addOrderItem(item);

      expect(orderItemStore.numberOfOrderItems()).toBe(1);
    });
  });

  context('OrderItems에 있는 product의 id를 확인하는 경우', () => {
    it('index 값을 통해 orderItems에서 product를 찾아 id를 반환한다', () => {
      const index = 0;

      const item = new Item({
        id: 1,
        productId: 2,
        price: 10_000,
        name: 'T-Shirt',
        thumbnailUrl: '1',
        shippingFee: 2_500,
        freeShippingAmount: 50_000,
      });

      orderItemStore.addOrderItem(item);

      expect(orderItemStore.numberOfOrderItems()).toBe(1);
      expect(orderItemStore.productId(index)).toBe(2);
    });
  });

  context('OrderItems에 있는 orderItem의 quantity를 확인하는 경우', () => {
    it('index 값을 통해 orderItems에서 product을 찾아 quantity를 반환한다', () => {
      const index = 0;

      const item = new Item({
        id: 2,
        price: 10_000,
        name: 'T-Shirt',
        thumbnailUrl: '1',
        shippingFee: 2_500,
        freeShippingAmount: 50_000,
      });

      orderItemStore.addOrderItem(item);

      expect(orderItemStore.quantityOfOrderItem(index)).toBe(1);
    });
  });

  context('OrderItems에 있는 orderItem의 totalPrice를 확인하는 경우', () => {
    it('index 값을 통해 orderItems에서 product을 찾아 totalPrice를 반환한다', () => {
      const index = 0;

      const item = new Item({
        id: 2,
        price: 10_000,
        name: 'T-Shirt',
        thumbnailUrl: '1',
        shippingFee: 2_500,
        freeShippingAmount: 50_000,
        quantity: 2,
      });

      orderItemStore.addOrderItem(item);

      expect(orderItemStore.orderItemPrice(index)).toBe(20_000);
    });
  });

  context('TotalQuantity가 호출된 경우', () => {
    it(
      'orderItems에 있는 모든 orderItem의 quantity합을 반환한다',
      () => {
        expect(orderItemStore.totalQuantity()).toBe(0);

        const item = new Item({
          id: 2,
          price: 10_000,
          name: 'T-Shirt',
          thumbnailUrl: '1',
          shippingFee: 2_500,
          freeShippingAmount: 50_000,
          quantity: 1,
        });

        orderItemStore.addOrderItem(item);

        expect(orderItemStore.totalQuantity()).toBe(1);
      },
    );
  });

  context('TotalCost가 호출된 경우', () => {
    it('OrderItems에 있는 모든 orderItem의 totalPrice합을 반환한다', () => {
      expect(orderItemStore.totalCost()).toBe(0);

      const item = new Item({
        id: 2,
        price: 10_000,
        name: 'T-Shirt',
        thumbnailUrl: '1',
        shippingFee: 2_500,
        freeShippingAmount: 50_000,
        quantity: 1,
      });

      orderItemStore.addOrderItem(item);

      expect(orderItemStore.totalCost()).toBe(10_000);
    });
  });

  describe('Item 수량 변경', () => {
    context('Item 수량을 증가시키는 경우', () => {
      it('totalQuantity와 totalCost가 증가한다', () => {
        const index = 0;

        const item = new Item({
          id: 2,
          price: 10_000,
          name: 'T-Shirt',
          thumbnailUrl: '1',
          shippingFee: 2_500,
          freeShippingAmount: 50_000,
          quantity: 1,
        });

        orderItemStore.addOrderItem(item);

        expect(orderItemStore.numberOfOrderItems()).toBe(1);
        expect(orderItemStore.totalQuantity()).toBe(1);
        expect(orderItemStore.totalCost()).toBe(10_000);

        orderItemStore.increaseQuantity({ index, amount: 1 });

        expect(orderItemStore.totalQuantity()).toBe(2);
        expect(orderItemStore.totalCost()).toBe(20_000);
      });
    });

    context('Item 수량을 감소시키는 경우', () => {
      it('totalQuantity와 totalCost가 감소한다', () => {
        const index = 0;

        const item = new Item({
          id: 2,
          price: 10_000,
          name: 'T-Shirt',
          thumbnailUrl: '1',
          shippingFee: 2_500,
          freeShippingAmount: 50_000,
          quantity: 1,
        });

        orderItemStore.addOrderItem(item);

        orderItemStore.increaseQuantity({ index, amount: 1 });

        expect(orderItemStore.totalQuantity()).toBe(2);
        expect(orderItemStore.totalCost()).toBe(20_000);

        orderItemStore.decreaseQuantity({ index, amount: -1 });

        expect(orderItemStore.totalQuantity()).toBe(1);
        expect(orderItemStore.totalCost()).toBe(10_000);
      });
    });

    context('Item 수량을 1개 이하로 감소시키는 경우', () => {
      it('Item 수량은 1개 미만으로 감소되지 않는다', () => {
        const index = 0;

        const item = new Item({
          id: 2,
          price: 10_000,
          name: 'T-Shirt',
          thumbnailUrl: '1',
          shippingFee: 2_500,
          freeShippingAmount: 50_000,
          quantity: 1,
        });

        orderItemStore.addOrderItem(item);

        orderItemStore.increaseQuantity({ index, amount: 1 });

        expect(orderItemStore.totalQuantity()).toBe(2);
        expect(orderItemStore.totalCost()).toBe(20_000);

        orderItemStore.decreaseQuantity({ index, amount: -1 });

        expect(orderItemStore.totalQuantity()).toBe(1);
        expect(orderItemStore.totalCost()).toBe(10_000);

        orderItemStore.decreaseQuantity({ index, amount: -1 });

        expect(orderItemStore.totalQuantity()).toBe(1);
        expect(orderItemStore.totalCost()).toBe(10_000);
      });
    });

    context('직접 상품 수량을 변경 시키는 경우', () => {
      it('상품 수량은 입력 값으로 변경된다', () => {
        const index = 0;

        const item = new Item({
          id: 2,
          price: 10_000,
          name: 'T-Shirt',
          thumbnailUrl: '1',
          shippingFee: 2_500,
          freeShippingAmount: 50_000,
          quantity: 1,
        });

        orderItemStore.addOrderItem(item);

        expect(orderItemStore.totalQuantity()).toBe(1);
        expect(orderItemStore.totalCost()).toBe(10_000);

        orderItemStore.updateQuantity({ index, amount: 10 });

        expect(orderItemStore.totalQuantity()).toBe(10);
        expect(orderItemStore.totalCost()).toBe(100_000);
      });
    });
  });
});
