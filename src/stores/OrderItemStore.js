import Store from './Store';

import OrderItems from '../models/OrderItems';
import Item from '../models/Item';

export default class OrderItemStore extends Store {
  constructor() {
    super();

    this.orderItems = new OrderItems();
  }

  loadItems({ orderItems }) {
    const items = orderItems.map((item) => (
      new Item({
        id: item.id,
        productId: item.productId,
        price: item.price,
        name: item.name,
        thumbnailUrl: item.thumbnailUrl,
        shippingFee: item.shippingFee,
        freeShippingAmount: item.freeShippingAmount,
        quantity: item.quantity,
      })));

    this.orderItems = items.reduce(
      (acc, item) => acc.addOrderItem(item),
      new OrderItems(),
    );
  }

  addOrderItem(item) {
    this.orderItems = this.orderItems.addOrderItem(item);

    this.publish();
  }

  increaseQuantity({ index, amount }) {
    this.orderItems = this.orderItems.increaseQuantity(
      { index, amount },
    );

    this.publish();
  }

  decreaseQuantity({ index, amount }) {
    this.orderItems = this.orderItems.increaseQuantity(
      { index, amount },
    );

    this.publish();
  }

  updateQuantity({ index, amount }) {
    this.orderItems = this.orderItems.updateQuantity(
      { index, amount },
    );

    this.publish();
  }

  items() {
    return this.orderItems.items();
  }

  generateId() {
    return this.orderItems.generateId();
  }

  numberOfOrderItems() {
    return this.orderItems.countItems();
  }

  productId(index) {
    return this.orderItems.productId(index);
  }

  orderItemId(index) {
    return this.orderItems.orderItemId(index);
  }

  quantityOfOrderItem(index) {
    return this.orderItems.orderItemQuantity(index);
  }

  orderItemPrice(index) {
    return this.orderItems.orderItemTotalPrice(index);
  }

  totalQuantity() {
    return this.orderItems.totalQuantity();
  }

  totalCost() {
    return this.orderItems.totalCost();
  }

  setOrderItems(orderItems) {
    this.orderItems = orderItems;

    this.publish();
  }

  reset() {
    this.orderItems = new OrderItems();

    this.publish();
  }
}

export const orderItemStore = new OrderItemStore();
