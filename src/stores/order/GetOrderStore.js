import { apiService } from '../../services/ApiService';
import Store from '../Store';

export default class GetOrderStore extends Store {
  constructor() {
    super();

    this.orderNumber = null;
    this.errors = {
      cantWriteReview: '',
    };

    this.errorMessage = {
      cantWriteReview: '해당 상품을 구매하신 분들만 리뷰 작성 가능합니다',
    };
  }

  async fetchOrderDoNotHaveReview({ productId }) {
    try {
      const { orderNumber } = await apiService.fetchOrderByProductId({ productId });

      this.orderNumber = orderNumber;
    } catch (error) {
      this.errors.cantWriteReview = this.errorMessage.cantWriteReview;
    } finally {
      this.publish();
    }
  }

  clear() {
    this.orderNumber = null;
    this.errors = {
      cantWriteReview: '',
    };
  }
}

export const getOrderStore = new GetOrderStore();
