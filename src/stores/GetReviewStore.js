import { apiService } from '../services/ApiService';
import Store from './Store';

export default class GetReviewStore extends Store {
  constructor() {
    super();

    this.reviews = [];
    this.page = null;

    this.loading = false;

    this.errors = {
      loading: '',
    };

    this.errorMessages = {
      loading: { notFound: '구매평 로딩 실패' },
    };
  }

  async fetchReviews({ productId, pageNumber }) {
    this.startLoad();

    try {
      const { reviews, page } = await apiService.fetchReviews(
        { productId, pageNumber },
      );

      this.completeLoad(reviews, page);
    } catch (e) {
      this.failLoad();
    }
  }

  startLoad() {
    this.loading = true;
    this.reviews = [];
    this.publish();
  }

  completeLoad(reviews, page) {
    this.loading = false;
    this.page = page;
    this.reviews = reviews;
    this.publish();
  }

  failLoad() {
    this.loading = false;
    this.reviews = [];
    this.page = null;
    this.errors.loading = this.errorMessages.loading.notFound;
    this.publish();
  }

  clear() {
    this.reviews = [];
    this.page = null;
    this.loading = false;
    this.errors = {
      loading: '',
    };
  }
}

export const getReviewStore = new GetReviewStore();
