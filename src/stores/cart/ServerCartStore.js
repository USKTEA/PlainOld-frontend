/* eslint-disable class-methods-use-this */
import Cart from '../../models/Cart';
import Item from '../../models/Item';

import { apiService } from '../../services/ApiService';

import CartStore from './CartStore';

export default class ServerCartStore extends CartStore {
  async load() {
    const { items } = await apiService.fetchCartItem();

    if (!items.length) {
      return;
    }

    const cartItems = items.map((item) => (
      new Item({
        productId: item.productId,
        price: item.price,
        name: item.name,
        thumbnailUrl: item.thumbnailUrl,
        shippingFee: item.shippingFee,
        freeShippingAmount: item.freeShippingAmount,
        quantity: item.quantity,
        option: item.option,
      })));

    this.cart = cartItems.reduce(
      (acc, item) => acc.addItem(item),
      new Cart(),
    );

    this.publish();
  }

  async addItem(items) {
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

    await apiService.addCartItem(items.map((item) => ({ ...item })));

    this.publish();
  }

  async saveChange() {
    const { name, items } = this.itemsInChangeQuantity;

    this.cart = this.cart.update({ name, items });

    this.itemsInChangeQuantity = null;

    await apiService.updateCartItem(items);

    this.publish();
  }

  async deleteItem({ name }) {
    this.selected = this.selected.filter((i) => i !== name);

    const toDelete = this.getToDelete([name]);

    this.cart = this.cart.deleteItem({ name });

    await apiService.deleteCartItem(toDelete);

    this.publish();
  }

  async deleteOption({ id, name }) {
    const item = [...this.cart.items.get(name)]
      .filter((i) => i.id === id);

    this.cart = this.cart.deleteOption({ id, name });

    await apiService.deleteCartItem(item);

    this.publish();
  }

  async completePurchase() {
    if (!this.itemInPurchase.length) {
      return;
    }

    const toDelete = this.getToDelete(this.itemInPurchase);

    this.cart = this.itemInPurchase
      .reduce(
        (acc, i) => acc.deleteItem({ name: i }),
        this.cart,
      );

    this.selected = this.selected.reduce((acc, i) => {
      if (this.itemInPurchase.findIndex((j) => j === i) >= 0) {
        return acc;
      }

      return [...acc, i];
    }, []);

    this.itemInPurchase = [];

    await apiService.deleteCartItem(toDelete);

    this.publish();
  }

  async deleteCartItemBySelected() {
    const toDelete = this.getToDelete(this.selected);

    this.cart = this.selected
      .reduce(
        (acc, i) => acc.deleteItem({ name: i }),
        this.cart,
      );

    this.selected = [];

    await apiService.deleteCartItem(toDelete);

    this.publish();
  }

  getToDelete(names) {
    return names.reduce(
      (acc, name) => [...acc, ...this.cart.items.get(name)],
      [],
    );
  }
}

export const serverCartStore = new ServerCartStore();
