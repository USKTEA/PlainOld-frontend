import { apiService } from '../../services/ApiService';
import Store from '../Store';

export default class CreateLikeStore extends Store {
  constructor() {
    super();

    this.errors = null;
    this.errorMessage = '잠시 후 다시 시도해주세요';
  }

  async create({ productId }) {
    try {
      const id = await apiService.createLike({ productId });

      return id;
    } catch (error) {
      this.errors = this.errorMessage;

      return '';
    } finally {
      this.publish();
    }
  }

  clear() {
    this.errors = null;
  }
}

export const createLikeStore = new CreateLikeStore();
