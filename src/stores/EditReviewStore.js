import { apiService } from '../services/ApiService';
import ReviewStore from './ReviewStore';

export default class EditReviewStore extends ReviewStore {
  setReview(review) {
    this.review = {
      id: review.id,
      rate: review.rate,
      comment: review.comment,
      imageUrl: review.imageUrl,
    };
  }

  async submitReview() {
    if (this.checkReviewCanPost()) {
      try {
        const { reviewId } = await apiService.patchReview({ ...this.review });

        this.reviewId = reviewId;
      } catch {
        this.errors.submit = this.errorMessage.submit;
      }
    }

    this.publish();
  }

  checkReviewCanPost() {
    if (!this.review.id) {
      return false;
    }

    if (this.review.comment.length < 5) {
      this.errors.comment = this.errorMessage.comment;
      return false;
    }

    return true;
  }

  deleteImage() {
    this.review = { ...this.review, imageUrl: null };
  }

  changeImage(imageUrl) {
    this.review = { ...this.review, imageUrl };
  }
}

export const editReviewStore = new EditReviewStore();
