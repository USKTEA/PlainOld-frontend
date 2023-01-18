import { apiService } from '../services/ApiService';
import Store from './Store';

export default class CreateReviewStore extends Store {
  constructor() {
    super();

    this.review = {
      rate: 5,
      comment: '',
    };

    this.createdReviewId = null;

    this.errors = {
      comment: '',
      submit: '',
      orderNumber: '',
      productId: '',
    };

    this.errorMessage = {
      comment: '구매평은 5글자 이상 작성 바랍니다',
      submit: '구매평이 정상적으로 등록되지 않았습니다 잠시 후 다시 시도해주세요',
      orderNumber: '주문번호 오류',
      productId: '상품정보 오류',
    };
  }

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

        this.createdReviewId = reviewId;
      } catch (error) {
        this.errors.submit = this.errorMessage.submit;
      } finally {
        this.publish();
      }
    }
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

  clear() {
    this.createdReviewId = null;

    this.review = {
      rate: 5,
      comment: '',
    };

    this.errors = {
      comment: '',
      submit: '',
      orderNumber: '',
      productId: '',
    };
  }
}

export const createReviewStore = new CreateReviewStore();
