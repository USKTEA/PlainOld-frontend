import { apiService } from '../../services/ApiService';
import Store from '../Store';

export default class CreateAnswerStore extends Store {
  constructor() {
    super();

    this.answer = {
      inquiryId: '',
      content: '',
    };

    this.errors = false;
  }

  async submit() {
    try {
      const { id } = await apiService.createAnswer({ answer: this.answer });

      return id;
    } catch (error) {
      this.errors = true;

      return '';
    } finally {
      this.answer = { ...this.answer, content: '' };
      this.publish();
    }
  }

  changeContent(content) {
    this.answer = { ...this.answer, content };

    this.publish();
  }

  setInquiryId({ inquiryId }) {
    this.answer = { ...this.answer, inquiryId };
  }

  isAnswerComplete() {
    if (!(this.answer.inquiryId && this.answer.content)) {
      this.errors = true;
      this.publish();

      return false;
    }

    return true;
  }

  clear() {
    this.answer = {
      inquiryId: '',
      content: '',
    };

    this.errors = false;
  }
}

export const createAnswerStore = new CreateAnswerStore();
