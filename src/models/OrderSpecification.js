import Item from './Item';
import OrderItems from './OrderItems';

export default class OrderSpecification {
  constructor({
    orderItems, orderer, shippingInformation, payment,
  }) {
    this.orderItems = orderItems;
    this.orderer = orderer;
    this.shippingInformation = shippingInformation;
    this.payment = payment;
    this.shippingFee = this.shippingFee();
    this.cost = this.cost() + this.shippingFee;
  }

  cost() {
    return this.orderItems.reduce((acc, item) => (acc + item.totalPrice), 0);
  }

  shippingFee() {
    const highestFreeShippingAmount = Math.max(...this.orderItems.map(
      (orderItem) => orderItem.freeShippingAmount,
    ));

    if (this.cost() >= highestFreeShippingAmount) {
      return 0;
    }

    const highestShippingFee = Math.max(...this.orderItems.map(
      (orderItem) => orderItem.shippingFee,
    ));

    return highestShippingFee;
  }

  static fake({ productId }) {
    const item = new Item({
      id: 1,
      productId,
      price: 10_000,
      name: 'T-Shirt',
      thumbnailUrl: 1,
      shippingFee: 2_500,
      freeShippingAmount: 50_000,
    });

    const orderer = {
      name: '김뚜루',
      phoneNumber: '010-5237-2189',
      email: 'tjrxo1234@gmail.com',
    };

    const shippingInformation = {
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
    };

    const payment = {
      method: 'CASH',
      payer: '김뚜루',
    };

    const { items } = new OrderItems().addOrderItem(item);

    return new OrderSpecification({
      orderItems: items, orderer, shippingInformation, payment,
    });
  }
}
