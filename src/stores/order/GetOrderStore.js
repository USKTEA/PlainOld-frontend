import { apiService } from '../../services/ApiService';
import Store from '../Store';

export default class GetOrderStore extends Store {
  constructor() {
    super();

    this.orderNumber = null;

    this.orders = null;

    this.order = null;

    this.errors = {
      cantWriteReview: '',
      fetchOrders: '',
      orderDetail: '',
    };

    this.errorMessage = {
      cantWriteReview: '해당 상품을 구매하신 분들만 리뷰 작성 가능합니다',
      fetchOrders: '잠시 후 다시 시도해주세요',
      orderDetail: '잠시 후 다시 시도해주세요',
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

  async fetchUserOrders(orderStatus) {
    try {
      const { orders } = await apiService.fetchUserOrders(orderStatus);

      this.orders = orders;
    } catch (error) {
      this.errors.fetchOrders = this.errorMessage.fetchOrders;
    } finally {
      this.publish();
    }
  }

  async fetchOrder({ orderNumber }) {
    try {
      const order = await apiService.fetchOrder({ orderNumber });

      this.order = order;
    } catch (error) {
      this.errors.orderDetail = this.errorMessage.orderDetail;
    } finally {
      this.publish();
    }
  }

  clear() {
    this.orders = null;
    this.order = null;
    this.orderNumber = null;
    this.errors = {
      cantWriteReview: '',
      fetchUserOrders: '',
      orderDetail: '',
    };
  }
}

export const getOrderStore = new GetOrderStore();
