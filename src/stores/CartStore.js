/* eslint-disable class-methods-use-this */
import Store from './Store';
import Cart from '../models/Cart';
import Item from '../models/Item';

export default class CartStore extends Store {
  constructor() {
    super();

    this.cart = new Cart();

    this.itemsInChangeQuantity = null;
    this.itemInPurchase = [];

    this.errors = {
      addItemFailed: '',
    };

    this.errorMessages = {
      addItemFailed: '장바구니에 넣을 상품을 선택해주세요',
    };
  }

  addItem(items) {
    if (!items.length) {
      this.errors.addItemFailed = this.errorMessages.addItemFailed;

      this.publish();

      return;
    }

    this.cart = items.reduce(
      (acc, item) => acc.addItem(item),
      this.cart,
    );

    this.clearError();

    this.publish();
  }

  selectChangeQuantityItem({ name }) {
    const items = this.cart.items.get(name);
    const [totalPrice, totalQuantity] = this.getPriceAndQuantity(items);

    this.itemsInChangeQuantity = {
      name,
      items,
      totalPrice,
      totalQuantity,
    };

    this.publish();
  }

  saveChange() {
    const { name, items } = this.itemsInChangeQuantity;

    this.cart = this.cart.update({ name, items });

    this.itemsInChangeQuantity = null;
  }

  increaseQuantity({ id, amount }) {
    const { items } = this.itemsInChangeQuantity;
    const index = items.findIndex((i) => i.id === id);

    const changed = this.changeAmount(items, index, amount);
    const [totalPrice, totalQuantity] = this.getPriceAndQuantity(changed);

    this.itemsInChangeQuantity = {
      name: this.itemsInChangeQuantity.name,
      items: changed,
      totalPrice,
      totalQuantity,
    };

    this.publish();
  }

  decreaseQuantity({ id, amount }) {
    const { items } = this.itemsInChangeQuantity;
    const index = items.findIndex((i) => i.id === id);

    if (items[index].quantity + amount < 1) {
      return;
    }

    const changed = this.changeAmount(items, index, amount);
    const [totalPrice, totalQuantity] = this.getPriceAndQuantity(changed);

    this.itemsInChangeQuantity = {
      name: this.itemsInChangeQuantity.name,
      items: changed,
      totalPrice,
      totalQuantity,
    };

    this.publish();
  }

  updateQuantity({ id, amount }) {
    const { items } = this.itemsInChangeQuantity;
    const index = items.findIndex((i) => i.id === id);

    if (amount < 1) {
      return;
    }

    const changed = this.updateAmount(items, index, amount);
    const [totalPrice, totalQuantity] = this.getPriceAndQuantity(changed);

    this.itemsInChangeQuantity = {
      name: this.itemsInChangeQuantity.name,
      items: changed,
      totalPrice,
      totalQuantity,
    };

    this.publish();
  }

  deleteItem({ name }) {
    this.cart = this.cart.deleteByItemName({ name });

    this.publish();
  }

  deleteOption({ id, name }) {
    this.cart = this.cart.deleteOption({ id, name });

    this.publish();
  }

  selectItemToPurchase({ name }) {
    this.itemInPurchase = [name];
  }

  completePurchase() {
    this.cart = this.itemInPurchase
      .reduce(
        (acc, i) => acc.deleteByItemName({ name: i }),
        this.cart,
      );

    this.itemInPurchase = [];
  }

  getPriceAndQuantity(items) {
    return items.reduce(
      (acc, i) => [acc[0] + i.totalPrice, acc[1] + i.quantity],
      [0, 0],
    );
  }

  changeAmount(items, index, amount) {
    return [...items.slice(0, index),
      new Item({
        ...items[index],
        quantity: items[index].quantity + amount,
      }),
      ...items.slice(index + 1)];
  }

  updateAmount(items, index, amount) {
    return [...items.slice(0, index),
      new Item({
        ...items[index],
        quantity: amount,
      }),
      ...items.slice(index + 1)];
  }

  reset() {
    this.cart = new Cart();
    this.itemsInChangeQuantity = null;
    this.itemInPurchase = null;
    this.errors = {
      addItemFailed: '',
    };

    this.publish();
  }

  clearError() {
    this.errors = {
      addItemFailed: '',
    };

    this.publish();
  }
}

export const cartStore = new CartStore();
