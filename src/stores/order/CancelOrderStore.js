import { apiService } from '../../services/ApiService';
import Store from '../Store';

export default class CancelOrderStore extends Store {
  constructor() {
    super();

    this.request = {
      orderNumber: '',
      cancel: true,
    };

    this.errors = {
      cancel: '',
    };

    this.errorMessage = {
      cancel: '잠시 후 다시 시도해주세요',
    };
  }

  async cancel() {
    try {
      const { orderNumber } = await apiService.cancelOrder({ request: this.request });

      return orderNumber;
    } catch (error) {
      this.errors.cancel = this.errorMessage.cancel;

      return '';
    } finally {
      this.publish();
    }
  }

  setOrderNumber(orderNumber) {
    this.request = { ...this.request, orderNumber };
  }

  clear() {
    this.request = {
      orderNumber: '',
      cancel: true,
    };

    this.errors = {
      cancel: '',
    };
  }
}

export const cancelOrderStore = new CancelOrderStore();
