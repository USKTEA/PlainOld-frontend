import { apiService } from '../../services/ApiService';
import Store from '../Store';

export default class DeleteLikeStore extends Store {
  constructor() {
    super();

    this.errors = null;
    this.errorMessage = '잠시 후 다시 시도해주세요';
  }

  async delete(id) {
    try {
      const deleted = await apiService.deleteLike(id);

      return deleted;
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

export const deleteLikeStore = new DeleteLikeStore();
