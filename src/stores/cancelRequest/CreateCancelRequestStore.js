import { apiService } from '../../services/ApiService';
import Store from '../Store';

export default class CreateCancelRequestStore extends Store {
  constructor() {
    super();

    this.request = {
      orderNumber: '',
      content: '',
    };

    this.errors = {
      submit: '',
    };

    this.errorMessage = {
      submit: '잠시 후 다시 시도해주세요',
    };
  }

  async submit() {
    try {
      const { id } = await apiService.createCancelRequest({ request: this.request });

      return id;
    } catch (error) {
      this.errors.submit = this.errorMessage.submit;

      return '';
    } finally {
      this.publish();
    }
  }

  setOrderNumber(orderNumber) {
    this.request = { ...this.request, orderNumber };

    this.publish();
  }

  changeContent(content) {
    this.request = { ...this.request, content };

    this.publish();
  }

  clear() {
    this.request = {
      orderNumber: '',
      content: '',
    };

    this.errors = {
      submit: '',
    };

    this.publish();
  }
}

export const createCancelRequestStore = new CreateCancelRequestStore();
