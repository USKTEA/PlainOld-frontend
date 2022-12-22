import { apiService } from '../services/ApiService';

import Store from './Store';

export default class ProductStore extends Store {
  constructor() {
    super();

    this.products = [];
  }

  async fetchProducts() {
    const { products } = await apiService.fetchProducts();

    this.products = products;

    this.publish();
  }
}

export const productStore = new ProductStore();
