import { apiService } from '../../services/ApiService';
import Store from '../Store';

export default class GetLikeByUserStore extends Store {
  constructor() {
    super();

    this.likes = null;
  }

  async fetchLikes(productId) {
    try {
      const { likes } = await apiService.fetchLikes(productId);

      this.likes = likes;
    } catch (error) {
      this.likes = null;
    }
  }

  clear() {
    this.likes = null;
  }
}

export const getLikeByUserStore = new GetLikeByUserStore();
