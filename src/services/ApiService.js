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

  async editOrderShippingInformation({ editRequest }) {
    const { data } = await this.instance.patch('/orders/shippingInformation', editRequest);

    return data;
  }

  async fetchOrderByProductId({ productId }) {
    const { data } = await this.instance.get(`/orders?productId=${productId}`);

    return { orderNumber: data.orderNumber };
  }

  async fetchUserOrders() {
    try {
      const { data, status } = await this.instance.get('/orders/me');

      if (status === 204) {
        return { orders: [] };
      }

      return data;
    } catch (error) {
      window.location.href = '/login';

      return '';
    }
  }

  async fetchOrder({ orderNumber }) {
    const { data } = await this.instance.get(`/orders/${orderNumber}`);

    return data;
  }

  async cancelOrder({ request }) {
    const { data } = await this.instance.patch('/orders/orderStatus', request);

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

    return {
      username: data.username,
      nickname: data.nickname,
      purchaseAmount: data.purchaseAmount,
      role: data.role,
    };
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

  async fetchReviews({ productId, pageNumber, fetchPhotoReviewsOnly }) {
    const { data } = await this.instance.get(
      `/reviews?productId=${productId}&photoReviews=${fetchPhotoReviewsOnly}&page=${pageNumber}`,
    );

    return { reviews: data.reviews, page: data.page };
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

  async uploadReviewImage(file) {
    const { data } = await this.instance.post(
      '/files?folder=review-image',
      file,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    return { url: data.url };
  }

  async fetchReplies({ reviewIds }) {
    const { data, status } = await this.instance.get(
      '/replies',
      {
        params: {
          reviewIds: reviewIds.join(','),
        },
      },
    );

    if (status === 204) {
      return { replies: [] };
    }

    return data;
  }

  async createReply(reply) {
    const { data } = await this.instance.post('/replies', reply);

    return data;
  }

  async editReply({ toEdit }) {
    const { data } = await this.instance.patch('/replies', toEdit);

    return data;
  }

  async deleteReply(id) {
    const { data } = await this.instance.delete(`/replies/${id}`);

    return { replyId: data.id };
  }

  async fetchInquiries({ productId, pageNumber }) {
    const { data, status } = await this.instance.get(
      `/inquiries?productId=${productId}&pageNumber=${pageNumber}`,
    );

    if (status === 204) {
      return { inquiries: [] };
    }

    return data;
  }

  async createInquiry({ inquiry }) {
    const { data } = await this.instance.post('/inquiries', inquiry);

    return data;
  }

  async editInquiry({ inquiry }) {
    const { data } = await this.instance.patch('/inquiries', inquiry);

    return data;
  }

  async deleteInquiry(id) {
    const { data } = await this.instance.delete(`/inquiries/${id}`);

    return data;
  }

  async fetchAnswers({ inquiryIds }) {
    const { data, status } = await this.instance.get('/answers', {
      params: {
        inquiryIds: inquiryIds.join(','),
      },
    });

    if (status === 204) {
      return { answers: [] };
    }

    return data;
  }

  async createAnswer({ answer }) {
    const { data } = await this.instance.post('/answers', answer);

    return data;
  }

  async editAnswer({ answer }) {
    const { data } = await this.instance.patch('/answers', answer);

    return data;
  }

  async deleteAnswer(id) {
    const { data } = await this.instance.delete(`/answers/${id}`);

    return data;
  }

  async createCancelRequest({ request }) {
    const { data } = await this.instance.post('/cancelRequest', request);

    return data;
  }

  async fetchCancelRequest(orderNumber) {
    const { data } = await this.instance.get(`/cancelRequest/${orderNumber}`);

    return data;
  }
}

export const apiService = new ApiService();
