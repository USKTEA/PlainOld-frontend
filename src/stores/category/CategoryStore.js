import { apiService } from '../../services/ApiService';

import Store from '../Store';

export default class CategoryStore extends Store {
  constructor() {
    super();

    this.categories = [];
  }

  async fetchCategories() {
    const { categories } = await apiService.fetchCategories();

    this.categories = categories;

    this.publish();
  }
}

export const categoryStore = new CategoryStore();
