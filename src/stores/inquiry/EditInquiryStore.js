import { apiService } from '../../services/ApiService';
import Store from '../Store';

export default class EditInquiryStore extends Store {
  constructor(props) {
    super(props);

    this.inquiry = null;

    this.errors = {
      edit: '',
      submit: '',
    };

    this.errorMessages = {
      edit: '문의내용이 정확하지 않습니다',
      submit: '다시 시도해주세요',
    };
  }

  async submit() {
    try {
      const id = await apiService.editInquiry({ inquiry: this.inquiry });

      return id;
    } catch (error) {
      this.errors.submit = this.errorMessages.submit;

      return '';
    } finally {
      this.publish();
    }
  }

  setInquiry({ id, title, content }) {
    this.clear();
    this.inquiry = { id, title, content };

    this.publish();
  }

  changeTitle(title) {
    this.inquiry = { ...this.inquiry, title };

    this.publish();
  }

  changeContent(content) {
    this.inquiry = { ...this.inquiry, content };

    this.publish();
  }

  isInquiryComplete() {
    if (!(this.inquiry.id && this.inquiry.title && this.inquiry.content)) {
      this.errors.edit = this.errorMessages.edit;
      this.publish();

      return false;
    }

    return true;
  }

  hasError() {
    return this.errors.edit || this.errors.submit;
  }

  getError() {
    return this.errors.edit || this.errors.submit;
  }

  clear() {
    this.inquiry = null;

    this.errors = {
      edit: '',
      submit: '',
    };

    this.publish();
  }
}

export const editInquiryStore = new EditInquiryStore();
