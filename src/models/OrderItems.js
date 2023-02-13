import Item from './Item';

export default class OrderItems {
  constructor(items = []) {
    this.items = items;
  }

  addOrderItem(item) {
    const index = this.findIndex(item);

    return index < 0
      ? this.insertItem(item)
      : this.updateItem(index);
  }

  insertItem(item) {
    return new OrderItems([...this.items, item]);
  }

  updateItem(index) {
    const found = this.items[index];

    return new OrderItems(
      [...this.items.slice(0, index),
        new Item({
          ...found,
          quantity: found.quantity + 1,
        }),
        ...this.items.slice(index + 1),
      ],
    );
  }

  findIndex(item) {
    if (!item.option || (item.option.size === 'FREE' && item.option.color === '')) {
      return this.items.findIndex((i) => i.productId === item.productId);
    }

    const index = this.items.findIndex((i) => {
      const option1 = i.option;
      const option2 = item.option;

      return option1.size === option2.size && option1.color === option2.color;
    });

    return index;
  }

  increaseQuantity({ id, amount }) {
    const [found, foundIndex] = this.items.reduce((acc, item, index) => {
      if (item.id === id) {
        return [item, index];
      }

      return acc;
    }, []);

    return new OrderItems([
      ...this.items.slice(0, foundIndex),
      new Item({
        ...found,
        quantity: found.quantity + amount,
      }),
      ...this.items.slice(foundIndex + 1)]);
  }

  decreaseQuantity({ id, amount }) {
    const [found, foundIndex] = this.items.reduce((acc, item, index) => {
      if (item.id === id) {
        return [item, index];
      }

      return acc;
    }, []);

    if (found.quantity + amount < 0) {
      return this;
    }

    return new OrderItems([
      ...this.items.slice(0, foundIndex),
      new Item({
        ...found,
        quantity: found.quantity + amount,
      }),
      ...this.items.slice(foundIndex + 1)]);
  }

  updateQuantity({ id, amount }) {
    const [found, foundIndex] = this.items.reduce((acc, item, index) => {
      if (item.id === id) {
        return [item, index];
      }

      return acc;
    }, []);

    if (amount < 1) {
      return this;
    }

    return new OrderItems([
      ...this.items.slice(0, foundIndex),
      new Item({
        ...found,
        quantity: amount,
      }),
      ...this.items.slice(foundIndex + 1)]);
  }

  calculateShippingFee() {
    const highestFreeShippingAmount = Math.max(...this.items.map(
      (item) => item.freeShippingAmount,
    ));

    if (this.totalCost() >= highestFreeShippingAmount) {
      return 0;
    }

    const highestShippingFee = Math.max(...this.items.map(
      (item) => item.shippingFee,
    ));

    return highestShippingFee;
  }

  generateId() {
    const id = Math.max(0, ...this.items.map((orderItem) => orderItem.id)) + 1;

    return id;
  }

  totalQuantity() {
    if (this.items.length === 0) {
      return 0;
    }

    return this.items.reduce((acc, item) => (acc + item.quantity), 0);
  }

  totalCost() {
    if (this.items.length === 0) {
      return 0;
    }

    return this.items.reduce((acc, item) => (acc + item.totalPrice), 0);
  }

  delete({ id }) {
    const index = this.items.findIndex((item) => item.id === id);

    return new OrderItems(
      [...this.items.slice(0, index),
        ...this.items.slice(index + 1)],
    );
  }

  hasItem() {
    return this.items.length > 0;
  }

  getItems() {
    return this.items.reduce((acc, item) => [...acc, { ...item }], []);
  }
}
