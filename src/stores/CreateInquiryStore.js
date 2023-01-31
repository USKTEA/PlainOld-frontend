import { apiService } from '../services/ApiService';
import Store from './Store';

export default class CreateInquiryStore extends Store {
  constructor() {
    super();

    this.inquiry = {
      productId: '',
      type: 'PUBLIC',
      title: '',
      content: '',
    };

    this.errors = {
      incomplete: '',
      create: '',
    };

    this.errorMessage = {
      incomplete: '제목 혹은 내용을 입력해주세요',
      create: '잠시 후 다시 시도해주세요',
    };
  }

  async submitInquiry() {
    try {
      const id = await apiService.createInquiry({ inquiry: this.inquiry });

      return id;
    } catch (error) {
      this.errors.create = this.errorMessage.create;

      return '';
    } finally {
      this.publish();
    }
  }

  changeTitle(title) {
    this.inquiry = { ...this.inquiry, title };

    this.publish();
  }

  changeContent(content) {
    this.inquiry = { ...this.inquiry, content };

    this.publish();
  }

  toggleSecret() {
    this.inquiry = {
      ...this.inquiry,
      type: `${this.inquiry.type === 'PUBLIC' ? 'SECRET' : 'PUBLIC'}`,
    };

    this.publish();
  }

  isInquiryComplete() {
    const values = Object.values(this.inquiry).filter((value) => value);

    if (values.length !== 4) {
      this.errors.incomplete = this.errorMessage.incomplete;
      this.publish();

      return false;
    }

    this.clearError();

    return true;
  }

  setProductId({ id }) {
    this.inquiry = { ...this.inquiry, productId: id };
  }

  hasErrors() {
    return Object.values(this.errors).filter((error) => error).length;
  }

  getError() {
    return this.errors.incomplete || this.errors.create;
  }

  clearError() {
    this.errors = {
      incomplete: '',
      create: '',
    };

    this.publish();
  }

  clear() {
    this.inquiry = {
      productId: '',
      type: 'PUBLIC',
      title: '',
      content: '',
    };

    this.errors = {
      incomplete: '',
      create: '',
    };
  }
}

export const createInquiryStore = new CreateInquiryStore();
