/* eslint-disable class-methods-use-this */
import Store from './Store';

import OrderItems from '../models/OrderItems';
import Item from '../models/Item';
import rgbToHex from '../utils/rgbToHex';

export default class OrderItemStore extends Store {
  constructor() {
    super();

    this.orderItems = new OrderItems();

    this.product = null;
    this.colors = null;
    this.sizes = null;

    this.option = {
      size: '',
      color: '',
    };

    this.errors = {
      notSelected: '',
    };

    this.errorMessages = {
      notSelected: '주문하실 상품을 선택해주세요',
    };
  }

  loadItems({ items }) {
    const orderItems = items.map((item) => (
      new Item({
        id: item.id,
        productId: item.productId,
        price: item.price,
        name: item.name,
        thumbnailUrl: item.thumbnailUrl,
        shippingFee: item.shippingFee,
        freeShippingAmount: item.freeShippingAmount,
        quantity: item.quantity,
        option: item.option,
      })));

    this.orderItems = orderItems.reduce(
      (acc, item) => acc.addOrderItem(item),
      new OrderItems(),
    );
  }

  addOrderItem({ product, option }) {
    const {
      id, name, price, image, shipping,
    } = product;

    if (!option) {
      const item = new Item({
        id: this.generateId(),
        productId: id,
        price,
        name,
        thumbnailUrl: image.thumbnailUrl,
        shippingFee: shipping.shippingFee,
        freeShippingAmount: shipping.freeShippingAmount,
      });

      this.orderItems = this.orderItems.addOrderItem(item);
    }

    if (option) {
      const item = new Item({
        id: this.generateId(),
        productId: id,
        price,
        name,
        thumbnailUrl: image.thumbnailUrl,
        shippingFee: shipping.shippingFee,
        freeShippingAmount: shipping.freeShippingAmount,
        option,
      });

      this.orderItems = this.orderItems.addOrderItem(item);
    }

    this.publish();
  }

  setProductToChoiceOption({ product }) {
    const { optionData } = product;

    this.product = product;
    this.sizes = optionData.sizes;
    this.colors = this.sort([...optionData.colors]);

    this.publish();
  }

  setOption({ option, value }) {
    this.option = { ...this.option, [option]: value };

    if (this.isOptionComplete()) {
      this.addOrderItem({
        product: this.product,
        option: this.option,
      });

      this.option = {
        size: '',
        color: '',
      };

      this.errors.notSelected = '';
    }

    this.publish();
  }

  isOptionComplete() {
    if (this.option.color && this.option.size) {
      return true;
    }

    return false;
  }

  isItemSelected() {
    if (this.orderItems.hasItem()) {
      return true;
    }

    this.errors.notSelected = this.errorMessages.notSelected;

    this.publish();

    return false;
  }

  sort(colors) {
    return colors.sort((a, b) => {
      const hex1 = rgbToHex({ r: a.red, g: a.green, b: a.blue });
      const hex2 = rgbToHex({ r: b.red, g: b.green, b: b.blue });

      if (hex1 < hex2) {
        return -1;
      }

      if (hex1 > hex2) {
        return 1;
      }

      return 0;
    });
  }

  increaseQuantity({ id, amount }) {
    this.orderItems = this.orderItems.increaseQuantity(
      { id, amount },
    );

    this.publish();
  }

  decreaseQuantity({ id, amount }) {
    this.orderItems = this.orderItems.increaseQuantity(
      { id, amount },
    );

    this.publish();
  }

  updateQuantity({ id, amount }) {
    this.orderItems = this.orderItems.updateQuantity(
      { id, amount },
    );

    this.publish();
  }

  deleteItem({ id }) {
    this.orderItems = this.orderItems.delete({ id });

    this.publish();
  }

  generateId() {
    return this.orderItems.generateId();
  }

  setOrderItems(orderItems) {
    this.orderItems = orderItems;

    this.publish();
  }

  reset() {
    this.orderItems = new OrderItems();
    this.product = null;
    this.option = {
      size: '',
      color: '',
    };
    this.sizes = null;
    this.colors = null;
    this.errors = {
      notSelected: '',
    };
    this.publish();
  }
}

export const orderItemStore = new OrderItemStore();
