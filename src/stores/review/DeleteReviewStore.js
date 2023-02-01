import { apiService } from '../../services/ApiService';
import Store from '../Store';

export default class DeleteReviewStore extends Store {
  constructor() {
    super();

    this.reviewId = null;
  }

  async delete({ id }) {
    try {
      const { reviewId } = await apiService.deleteReview(id);
      this.reviewId = reviewId;
    } catch (error) {
      this.reviewId = null;
    }
  }
}

export const deleteReviewStore = new DeleteReviewStore();
