import axios from 'axios';

import config from '../config';

const baseUrl = config.apiBaseUrl;

export default class ApiService {
  constructor() {
    this.accessToken = null;

    this.instance = axios.create({
      baseURL: baseUrl,
    });
  }

  setAccessToken(accessToken) {
    this.accessToken = accessToken;

    if (accessToken) {
      this.instance = axios.create({
        baseURL: baseUrl,
        headers: { Authorization: `Bearer ${this.accessToken}` },
      });
    }
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

  async postSession({ username, password }) {
    const { data } = await this.instance.post('/session', {
      username, password,
    });

    return data;
  }
}

export const apiService = new ApiService();
