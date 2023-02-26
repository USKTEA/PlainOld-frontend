import { apiService } from '../../services/ApiService';
import Store from '../Store';

export default class CountProductLikeStore extends Store {
  constructor() {
    super();

    this.counts = null;
  }

  async countProductLikes({ productId }) {
    try {
      const { counts } = await apiService.countProductLikes({ productId });

      this.counts = counts;
    } catch (error) {
      this.counts = 0;
    } finally {
      this.publish();
    }
  }

  clear() {
    this.counts = null;
  }
}

export const countProductLikeStore = new CountProductLikeStore();
