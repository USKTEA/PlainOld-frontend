import axios from 'axios';

import config from '../config';

const baseUrl = config.apiBaseUrl;

export default class ApiService {
  constructor() {
    this.instance = axios.create({
      baseURL: baseUrl,
    });
  }

  async fetchCategories() {
    const { data } = await this.instance.get('/categories');

    return data;
  }

  async fetchProducts({ category, pageNumber }) {
    const { data } = await this.instance.get(`/products?categoryId=${category}&page=${pageNumber}`);

    return data;
  }

  async fetchProduct({ id }) {
    const { data } = await this.instance.get(`/products/${id}`);

    return data;
  }

  async createOrder(orderSpecification) {
    const { data } = await this.instance.post('/orders', orderSpecification);

    return data;
  }
}

export const apiService = new ApiService();
