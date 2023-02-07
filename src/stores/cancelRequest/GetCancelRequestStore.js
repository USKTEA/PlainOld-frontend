import { apiService } from '../../services/ApiService';
import Store from '../Store';

export default class GetCancelRequestStore extends Store {
  constructor() {
    super();

    this.cancelRequest = null;

    this.errors = null;

    this.errorMessage = '잠시 후 다시 시도해주세요';
  }

  async fetchCancelRequest({ orderNumber }) {
    try {
      const cancelRequest = await apiService.fetchCancelRequest(orderNumber);

      this.cancelRequest = cancelRequest;
    } catch (error) {
      this.errors = this.errorMessage;
    } finally {
      this.publish();
    }
  }

  clear() {
    this.cancelRequest = null;
    this.errors = null;

    this.publish();
  }
}

export const getCancelRequestStore = new GetCancelRequestStore();
