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
}

export const apiService = new ApiService();
