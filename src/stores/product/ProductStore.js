import { apiService } from '../../services/ApiService';

import Store from '../Store';

export default class ProductStore extends Store {
  constructor() {
    super();

    this.products = [];
    this.page = null;

    this.product = null;

    this.loading = false;

    this.errors = {
      loading: '',
    };

    this.errorMessages = {
      loading: { notFound: '해당 상품은 존재하지 않습니다' },
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
    this.startLoad();

    try {
      const product = await apiService.fetchProduct({ id });

      this.completeLoad(product);
    } catch (e) {
      this.failLoad();
    }
  }

  startLoad() {
    this.loading = true;
    this.product = null;
    this.publish();
  }

  completeLoad(product) {
    this.loading = false;
    this.product = product;
    this.publish();
  }

  failLoad() {
    this.loading = false;
    this.product = null;
    this.errors.loading = this.errorMessages.loading.notFound;
    this.publish();
  }

  clear() {
    this.loading = false;
    this.product = null;
    this.errors = { loading: '' };
    this.publish();
  }
}

export const productStore = new ProductStore();
