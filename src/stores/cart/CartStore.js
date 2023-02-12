/* eslint-disable class-methods-use-this */
import Store from '../Store';
import Cart from '../../models/Cart';
import Item from '../../models/Item';

export default class CartStore extends Store {
  constructor() {
    super();

    this.cart = new Cart();

    this.itemsInChangeQuantity = null;
    this.itemInPurchase = [];
    this.selected = [];

    this.errors = {
      addItemFailed: '',
    };

    this.errorMessages = {
      addItemFailed: '장바구니에 넣을 상품을 선택해주세요',
    };
  }

  loadItems({ items }) {
    const cartItems = items.flat().map((item) => (
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

    this.cart = cartItems.reduce(
      (acc, item) => acc.addItem(item),
      new Cart(),
    );

    this.publish();
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

    this.publish();
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
    this.selected = this.selected.filter((i) => i !== name);

    this.cart = this.cart.deleteItem({ name });

    this.publish();
  }

  deleteOption({ id, name }) {
    this.cart = this.cart.deleteOption({ id, name });

    this.publish();
  }

  selectItemToPurchase({ name }) {
    this.itemInPurchase = [name];

    this.publish();
  }

  completePurchase() {
    if (!this.itemInPurchase.length) {
      return;
    }

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

    this.publish();
  }

  selectAll() {
    this.selected = [...this.cart.items.keys()];
    this.publish();
  }

  toggleSelected({ name }) {
    const index = this.selected.findIndex((i) => i === name);

    return index >= 0
      ? this.deleteSelected(index)
      : this.addSelected({ name });
  }

  deleteSelected(index) {
    this.selected = [...this.selected.slice(0, index),
      ...this.selected.slice(index + 1)];

    this.publish();
  }

  addSelected({ name }) {
    this.selected = [...this.selected, name];

    this.publish();
  }

  checkIsSelected({ name }) {
    return this.selected.findIndex((i) => i === name) >= 0;
  }

  deleteCartItemBySelected() {
    this.cart = this.selected
      .reduce(
        (acc, i) => acc.deleteItem({ name: i }),
        this.cart,
      );

    this.selected = [];
    this.publish();
  }

  selectedTotalPrice() {
    const items = this.selected.reduce(
      (acc, name) => [...acc, ...this.cart.items.get(name)],
      [],
    );

    return items.reduce((acc, item) => acc + item.totalPrice, 0);
  }

  selectedShippingFee() {
    if (!this.selected.length) {
      return 0;
    }

    const amount = this.selected.reduce((acc, i) => {
      if (acc >= this.cart.shippingFee({ name: i })) {
        return acc;
      }

      return this.cart.shippingFee({ name: i });
    }, 0);

    return amount;
  }

  isSelectedNotEmpty() {
    return this.selected.length;
  }

  selectedToItemInPurchase() {
    this.itemInPurchase = [...this.selected];
  }

  getSelectedItems() {
    return this.selected.reduce(
      (acc, i) => [...acc, ...this.cart.items.get(i)],
      [],
    );
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
    this.selected = [];
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
