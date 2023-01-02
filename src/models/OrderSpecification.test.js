import Item from './Item';
import OrderSpecification from './OrderSpecification';

const context = describe;

describe('OrderSpecification', () => {
  it('OrderItems를 토대로 cost를 계산한다', () => {
    const item = new Item({
      id: 1,
      price: 10_000,
      name: 'T-Shirt',
      thumbnailUrl: '1',
      shippingFee: 2_500,
      freeShippingAmount: 50_000,
    });

    const orderItems = [item];
    const orderSpecification = new OrderSpecification({ orderItems });

    expect(orderSpecification.cost).toBe(12_500);
  });

  context('Cost가 OrderItems의 freeShipping보다 높을 경우', () => {
    it('ShippingFee가 0원이 된다', () => {
      const item = new Item({
        id: 1,
        price: 100_000,
        name: 'T-Shirt',
        thumbnailUrl: '1',
        shippingFee: 2_500,
        freeShippingAmount: 50_000,
      });

      const orderItems = [item];
      const orderSpecification = new OrderSpecification({ orderItems });

      expect(orderSpecification.shippingFee).toBe(0);
    });
  });

  context('Cost가 OrderItems의 freeShipping보다 낮을 경우', () => {
    it('ShippingFee는 OrderItems 중 가장 높은 금액으로 책정된다', () => {
      const item1 = new Item({
        id: 1,
        price: 10_000,
        name: 'T-Shirt',
        thumbnailUrl: '1',
        shippingFee: 2_500,
        freeShippingAmount: 50_000,
      });

      const item2 = new Item({
        id: 2,
        price: 10_000,
        name: 'T-Shirt',
        thumbnailUrl: '1',
        shippingFee: 3_500,
        freeShippingAmount: 50_000,
      });

      const orderItems = [item1, item2];
      const orderSpecification = new OrderSpecification({ orderItems });

      expect(orderSpecification.shippingFee).toBe(3_500);
    });
  });
});
