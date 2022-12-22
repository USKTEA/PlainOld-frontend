import { apiService } from '../services/ApiService';

import Store from './Store';

export default class ProductStore extends Store {
  constructor() {
    super();

    this.products = [];
    this.page = {};
  }

  async fetchProducts({ category, pageNumber }) {
    const { products, page } = await apiService.fetchProducts(
      { category, pageNumber },
    );

    this.products = products;
    this.page = page;

    this.publish();
  }
}

export const productStore = new ProductStore();
