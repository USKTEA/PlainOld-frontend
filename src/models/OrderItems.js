import Item from './Item';

export default class OrderItems {
  constructor(orderItems = []) {
    this.orderItems = orderItems;
  }

  addOrderItem(item) {
    return new OrderItems([...this.orderItems, item]);
  }

  increaseQuantity({ index, amount }) {
    const item = this.orderItems.at(index);

    return new OrderItems([
      ...this.orderItems.slice(0, index),
      new Item({
        ...item,
        quantity: item.quantity + amount,
      }),
      ...this.orderItems.slice(index + 1)]);
  }

  decreaseQuantity({ index, amount }) {
    const item = this.orderItems.at(index);

    if (item.quantity + amount < 0) {
      return this;
    }

    return new OrderItems([
      ...this.orderItems.slice(0, index),
      new Item({
        ...item,
        quantity: item.quantity + amount,
      }),
      ...this.orderItems.slice(index + 1)]);
  }

  updateQuantity({ index, amount }) {
    const item = this.orderItems.at(index);

    if (amount < 1) {
      return this;
    }

    return new OrderItems([
      ...this.orderItems.slice(0, index),
      new Item({
        ...item,
        quantity: amount,
      }),
      ...this.orderItems.slice(index + 1)]);
  }

  calculateShippingFee() {
    const highestFreeShippingAmount = Math.max(...this.orderItems.map(
      (item) => item.freeShippingAmount,
    ));

    if (this.totalCost() >= highestFreeShippingAmount) {
      return 0;
    }

    const highestShippingFee = Math.max(...this.orderItems.map(
      (item) => item.shippingFee,
    ));

    return highestShippingFee;
  }

  generateId() {
    const id = Math.max(0, ...this.orderItems.map((orderItem) => orderItem.id)) + 1;

    return id;
  }

  totalQuantity() {
    if (this.orderItems.length === 0) {
      return 0;
    }

    return this.orderItems.reduce((acc, item) => (acc + item.quantity), 0);
  }

  totalCost() {
    if (this.orderItems.length === 0) {
      return 0;
    }

    return this.orderItems.reduce((acc, item) => (acc + item.totalPrice), 0);
  }

  items() {
    return this.orderItems.reduce((acc, item) => [...acc, { ...item }], []);
  }

  countItems() {
    return this.orderItems.length;
  }

  orderItemId(index) {
    return this.orderItems.at(index).id;
  }

  productId(index) {
    return this.orderItems.at(index).productId;
  }

  orderItemQuantity(index) {
    return this.orderItems.at(index).quantity;
  }

  orderItemTotalPrice(index) {
    return this.orderItems.at(index).totalPrice;
  }
}
