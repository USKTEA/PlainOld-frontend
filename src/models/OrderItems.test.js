import Item from './Item';
import OrderItems from './OrderItems';

const context = describe;

describe('OrderItems', () => {
  let orderItems;

  beforeEach(() => {
    orderItems = new OrderItems();
  });

  context('GenerateId가 호출되는 경우', () => {
    it('OrderItems에서 가장 큰 Id보다 1이 큰 숫자를 반환한다', () => {
      const firstId = orderItems.generateId();

      expect(firstId).toBe(1);

      const item = new Item({
        id: firstId,
        price: 10_000,
        name: 'T-Shirt',
        thumbnailUrl: '1',
        shippingFee: 2_500,
        freeShippingAmount: 50_000,
      });

      orderItems = orderItems.addOrderItem(item);

      const secondId = orderItems.generateId();

      expect(secondId).toBe(2);
    });
  });

  context('Item을 추가할 경우', () => {
    it('OrderItems에 item이 저장된다', () => {
      expect(orderItems.orderItems).toHaveLength(0);

      const item = new Item({
        id: 1,
        price: 10_000,
        name: 'T-Shirt',
        thumbnailUrl: '1',
        shippingFee: 2_500,
        freeShippingAmount: 50_000,
      });

      orderItems = orderItems.addOrderItem(item);

      expect(orderItems.orderItems).toHaveLength(1);
    });
  });

  context('CountItems가 호출된 경우', () => {
    it('OrderItems의 길이를 반환한다', () => {
      expect(orderItems.countItems()).toBe(0);

      const item = new Item({
        id: 1,
        price: 10_000,
        name: 'T-Shirt',
        thumbnailUrl: '1',
        shippingFee: 2_500,
        freeShippingAmount: 50_000,
      });

      orderItems = orderItems.addOrderItem(item);

      expect(orderItems.countItems()).toBe(1);
    });
  });

  context('GetProductId가 호출된 경우', () => {
    it('index값에 해당하는 OrderItem의 id를 반환한다', () => {
      const id = 2;
      const index = 0;

      const item = new Item({
        id,
        productId: id,
        price: 10_000,
        name: 'T-Shirt',
        thumbnailUrl: '1',
        shippingFee: 2_500,
        freeShippingAmount: 50_000,
      });

      orderItems = orderItems.addOrderItem(item);

      expect(orderItems.countItems()).toBe(1);

      expect(orderItems.productId(index)).toBe(id);
    });
  });

  context('GetOrderItemQuantity가 호출된 경우', () => {
    it('index값에 해당하는 OrderItem의 quantity를 반환한다', () => {
      const index = 0;

      const item = new Item({
        id: 1,
        price: 10_000,
        name: 'T-Shirt',
        thumbnailUrl: '1',
        shippingFee: 2_500,
        freeShippingAmount: 50_000,
        quantity: 10,
      });

      orderItems = orderItems.addOrderItem(item);

      expect(orderItems.orderItemQuantity(index)).toBe(10);
    });
  });

  context('GetTotalPrice가 호출된 경우', () => {
    it('index값에 해당하는 OrderItem의 totalPrice를 반환한다', () => {
      const index = 0;

      const item = new Item({
        id: 1,
        price: 10_000,
        name: 'T-Shirt',
        thumbnailUrl: '1',
        shippingFee: 2_500,
        freeShippingAmount: 50_000,
        quantity: 10,
      });

      orderItems = orderItems.addOrderItem(item);

      expect(orderItems.orderItemTotalPrice(index)).toBe(100_000);
    });
  });

  describe('TotalQuantity', () => {
    context('OrderItems에 item이 없는 경우', () => {
      it('0을 반환한다', () => {
        expect(orderItems.totalQuantity()).toBe(0);
      });
    });

    context('OrderItems에 item이 있는 경우', () => {
      it('orderItem의 quantity의 총합을 반환한다', () => {
        expect(orderItems.totalQuantity()).toBe(0);

        const item1 = new Item({
          id: 1,
          price: 10_000,
          name: 'T-Shirt',
          thumbnailUrl: '1',
          shippingFee: 2_500,
          freeShippingAmount: 50_000,
          quantity: 10,
        });

        const item2 = new Item({
          id: 2,
          price: 10_000,
          name: 'T-Shirt',
          thumbnailUrl: '1',
          shippingFee: 2_500,
          freeShippingAmount: 50_000,
          quantity: 1,
        });

        const items = [item1, item2];

        orderItems = items.reduce(
          (acc, item) => (acc.addOrderItem(item)),
          orderItems,
        );

        expect(orderItems.totalQuantity()).toBe(11);
      });
    });
  });

  describe('TotalCost', () => {
    context('OrderItems에 item이 없는 경우', () => {
      it('0을 반환한다', () => {
        expect(orderItems.totalCost()).toBe(0);
      });
    });

    context('OrderItems에 item이 있는 경우', () => {
      it('orderItem의 totalPrice 총합을 반환한다', () => {
        expect(orderItems.totalCost()).toBe(0);

        const item1 = new Item({
          id: 1,
          price: 10_000,
          name: 'T-Shirt',
          thumbnailUrl: '1',
          shippingFee: 2_500,
          freeShippingAmount: 50_000,
          quantity: 10,
        });

        const item2 = new Item({
          id: 2,
          price: 10_000,
          name: 'T-Shirt',
          thumbnailUrl: '1',
          shippingFee: 2_500,
          freeShippingAmount: 50_000,
          quantity: 1,
        });

        const items = [item1, item2];

        orderItems = items.reduce(
          (acc, item) => (acc.addOrderItem(item)),
          orderItems,
        );

        expect(orderItems.totalCost()).toBe(110_000);
      });
    });
  });

  describe('Item 수량 조작', () => {
    context('OrderItem의 수량을 증가시키는 경우', () => {
      it('index값에 해당하는 OrderItem의 quantity를 증가시킨다', () => {
        const index = 0;

        const item = new Item({
          id: 1,
          price: 10_000,
          name: 'T-Shirt',
          thumbnailUrl: '1',
          shippingFee: 2_500,
          freeShippingAmount: 50_000,
          quantity: 1,
        });

        orderItems = orderItems.addOrderItem(item);

        expect(orderItems.orderItemQuantity(index)).toBe(1);

        orderItems = orderItems.increaseQuantity(
          { index, amount: 1 },
        );

        expect(orderItems.orderItemQuantity(index)).toBe(2);
      });
    });

    context('OrderItem의 수량을 감소시키는 경우', () => {
      it('index값에 해당하는 OrderItem의 quantity를 감소시킨다', () => {
        const index = 0;

        const item = new Item({
          id: 1,
          price: 10_000,
          name: 'T-Shirt',
          thumbnailUrl: '1',
          shippingFee: 2_500,
          freeShippingAmount: 50_000,
          quantity: 1,
        });

        orderItems = orderItems.addOrderItem(item);

        orderItems = orderItems.increaseQuantity(
          { index, amount: 1 },
        );

        expect(orderItems.orderItemQuantity(index)).toBe(2);

        orderItems = orderItems.decreaseQuantity(
          { index, amount: -1 },
        );

        expect(orderItems.orderItemQuantity(index)).toBe(1);
      });
    });

    context('OrderItem의 수량을 1개 미만으로 감소시키는 경우', () => {
      it('OrderItem의 수량은 1개 미만으로 감소하지 않는다', () => {
        const index = 0;

        const item = new Item({
          id: 1,
          price: 10_000,
          name: 'T-Shirt',
          thumbnailUrl: '1',
          shippingFee: 2_500,
          freeShippingAmount: 50_000,
          quantity: 1,
        });

        orderItems = orderItems.addOrderItem(item);

        orderItems = orderItems.increaseQuantity(
          { index, amount: 1 },
        );

        expect(orderItems.orderItemQuantity(index)).toBe(2);

        orderItems = orderItems.decreaseQuantity(
          { index, amount: -1 },
        );

        expect(orderItems.orderItemQuantity(index)).toBe(1);

        orderItems = orderItems.decreaseQuantity(
          { index, amount: -1 },
        );

        expect(orderItems.orderItemQuantity(index)).toBe(1);
      });
    });

    context('Item 수량을 직접 변경시키는 경우', () => {
      it('OrderItem의 수량은 입력값으로 변경된다', () => {
        const index = 0;

        const item = new Item({
          id: 1,
          price: 10_000,
          name: 'T-Shirt',
          thumbnailUrl: '1',
          shippingFee: 2_500,
          freeShippingAmount: 50_000,
          quantity: 1,
        });

        orderItems = orderItems.addOrderItem(item);

        expect(orderItems.orderItemQuantity(index)).toBe(1);

        orderItems = orderItems.updateQuantity(
          { index, amount: 10 },
        );

        expect(orderItems.orderItemQuantity(index)).toBe(10);
      });
    });
  });

  describe('배송비를 계산하는 경우', () => {
    context('Item 중 가장 큰 freeShippingAmount보다 totalCost가 적을 경우', () => {
      it('배송비는 Item 중 가장 큰 shippingFee가 된다', () => {
        const item = new Item({
          id: 1,
          price: 10_000,
          name: 'T-Shirt',
          thumbnailUrl: '1',
          shippingFee: 2_500,
          freeShippingAmount: 50_000,
          quantity: 1,
        });

        orderItems = orderItems.addOrderItem(item);

        expect(orderItems.calculateShippingFee()).toBe(2_500);
      });
    });

    context(
      'Item 중 가장 큰 freeShippingAmount보다 totalCost가 크거나 같을 경우',
      () => {
        it('배송비는 0원이 된다', () => {
          const item = new Item({
            id: 1,
            price: 50_000,
            name: 'T-Shirt',
            thumbnailUrl: '1',
            shippingFee: 2_500,
            freeShippingAmount: 50_000,
            quantity: 1,
          });

          orderItems = orderItems.addOrderItem(item);

          expect(orderItems.calculateShippingFee()).toBe(0);
        });
      },
    );
  });
});
