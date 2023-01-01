import Store from './Store';

import OrderItems from '../models/OrderItems';
import OrderItem from '../models/OrderItem';

export default class OrderItemStore extends Store {
  constructor() {
    super();

    this.orderItems = new OrderItems();
  }

  loadItems({ orderItems }) {
    const items = orderItems.map((orderItem) => (
      new OrderItem({
        id: orderItem.id,
        productId: orderItem.productId,
        price: orderItem.price,
        name: orderItem.name,
        thumbnailUrl: orderItem.thumbnailUrl,
        shippingFee: orderItem.shippingFee,
        freeShippingAmount: orderItem.freeShippingAmount,
        quantity: orderItem.quantity,
      })));

    this.orderItems = items.reduce(
      (acc, orderItem) => acc.addOrderItem(orderItem),
      new OrderItems(),
    );
  }

  addOrderItem(orderItem) {
    this.orderItems = this.orderItems.addOrderItem(orderItem);

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
