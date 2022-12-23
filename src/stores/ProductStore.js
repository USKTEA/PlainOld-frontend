import { apiService } from '../services/ApiService';

import Store from './Store';

export default class ProductStore extends Store {
  constructor() {
    super();

    this.products = [];
    this.page = {};

    this.product = {};

    this.loaded = false;

    this.errors = {
      notFound: '',
    };

    this.errorMessages = {
      notFound: '해당 상품은 존재하지 않습니다',
    };
  }

  async fetchProducts({ category, pageNumber }) {
    const { products, page } = await apiService.fetchProducts(
      { category, pageNumber },
    );

    this.products = products;
    this.page = page;

    this.publish();
  }

  async fetchProduct({ id }) {
    try {
      this.product = await apiService.fetchProduct({ id });

      this.loaded = true;
    } catch (e) {
      this.errors.notFound = this.errorMessages.notFound;
    } finally {
      this.publish();
    }
  }

  clearError() {
    this.errors = {
      notFound: '',
    };

    this.publish();
  }
}

export const productStore = new ProductStore();
