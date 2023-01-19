/* eslint-disable no-param-reassign */
import axios from 'axios';

import configuration from '../configuration';

const baseUrl = configuration.apiBaseUrl;

export default class ApiService {
  constructor() {
    this.instance = axios.create({
      baseURL: baseUrl,
    });

    this.instance.interceptors.request.use((config) => {
      if (!config.headers) {
        return config;
      }

      if (config.url === '/token') {
        config.withCredentials = true;

        return config;
      }

      const accessToken = JSON.parse(localStorage.getItem('accessToken'));

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return config;
    });

    this.instance.interceptors.response.use(
      async (response) => response,
      async (error) => {
        const { config, response: { status } } = error;

        if (status !== 401 || config.url === '/token') {
          return Promise.reject(error);
        }

        const newToken = await this.reissueToken();

        if (newToken) {
          config.headers.Authorization = `Bearer ${newToken}`;
        }

        return axios(config);
      },
    );
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

  async reissueToken() {
    try {
      const { data: { accessToken } } = await this.instance.post(
        '/token',
        { withCredentials: true },
      );

      localStorage.setItem('accessToken', `"${accessToken}"`);

      return accessToken;
    } catch (error) {
      localStorage.removeItem('accessToken');

      window.location.href = '/';

      return '';
    }
  }

  async postSession({ username, password }) {
    const { data } = await this.instance.post('/session', {
      username, password,
    }, { withCredentials: true });

    return { accessToken: data.accessToken };
  }

  async fetchUserInformation() {
    const { data } = await this.instance.get('/users/me');

    return { username: data.username };
  }

  async fetchCartItem() {
    const { data } = await this.instance.get('/carts');

    return data;
  }

  async addCartItem(items) {
    const { data } = await this.instance.post('/carts', { items });

    return data;
  }

  async updateCartItem(items) {
    const { data } = await this.instance.patch('/carts', { items });

    return data;
  }

  async deleteCartItem(items) {
    const { data } = await this.instance.post('/carts/delete', { items });

    return data;
  }

  async fetchReviews({ productId, pageNumber }) {
    const { data } = await this.instance.get(`/reviews?productId=${productId}&page=${pageNumber}`);

    return { reviews: data.reviews, page: data.page };
  }

  async fetchOrderByProductId({ productId }) {
    const { data } = await this.instance.get(`/orders?productId=${productId}`);

    return { orderNumber: data.orderNumber };
  }

  async postReview(review) {
    const { data } = await this.instance.post('/reviews', review);

    return data;
  }

  async patchReview(review) {
    const { data } = await this.instance.patch('/reviews', review);

    return data;
  }

  async deleteReview(id) {
    const { data } = await this.instance.delete(`/reviews/${id}`);

    return data;
  }
}

export const apiService = new ApiService();
