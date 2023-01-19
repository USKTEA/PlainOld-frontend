import { apiService } from '../services/ApiService';
import ReviewStore from './ReviewStore';

export default class CreateReviewStore extends ReviewStore {
  changeRate(rate) {
    this.review = { ...this.review, rate };

    this.publish();
  }

  changeComment({ comment }) {
    this.review = { ...this.review, comment };

    this.publish();
  }

  async submitReview({ orderNumber, productId }) {
    if (this.checkReviewCanPost({ orderNumber, productId })) {
      try {
        const { reviewId } = await apiService.postReview(
          { ...this.review, orderNumber, productId },
        );

        this.reviewId = reviewId;
      } catch (error) {
        this.errors.submit = this.errorMessage.submit;
      }
    }

    this.publish();
  }

  checkReviewCanPost({ orderNumber, productId }) {
    if (!orderNumber) {
      this.errors.orderNumber = this.errorMessage.orderNumber;

      return false;
    }

    if (!productId) {
      this.errors.productId = this.errorMessage.productId;

      return false;
    }

    if (this.review.comment.length < 5) {
      this.errors.comment = this.errorMessage.comment;

      return false;
    }

    return true;
  }

  hasError() {
    const errors = Object.values(this.errors).filter((error) => error);

    return !!errors.length;
  }

  getError() {
    return Object.values(this.errors).filter((error) => error).at(0);
  }
}

export const createReviewStore = new CreateReviewStore();
