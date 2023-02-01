import Store from '../Store';

export default class ReviewStore extends Store {
  constructor() {
    super();

    this.review = {
      rate: 5,
      comment: '',
    };

    this.reviewId = null;

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

  hasError() {
    const errors = Object.values(this.errors).filter((error) => error);

    return !!errors.length;
  }

  getError() {
    return Object.values(this.errors).filter((error) => error).at(0);
  }

  clear() {
    this.reviewId = null;

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

export const reviewStore = new ReviewStore();
