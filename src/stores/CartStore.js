import Store from './Store';

export default class CartStore extends Store {
  constructor() {
    super();
  }
}

export const cartStore = new CartStore();
