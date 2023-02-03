import { apiService } from '../../services/ApiService';
import Store from '../Store';

export default class EditAnswerStore extends Store {
  constructor() {
    super();

    this.answer = null;

    this.errors = {
      edit: '',
      submit: '',
    };

    this.errorMessages = {
      edit: '답변을 입력해주세요',
      submit: '다시 시도해주세요',
    };
  }

  async submit() {
    try {
      const { id } = await apiService.editAnswer({ answer: this.answer });
      this.answer = null;

      return id;
    } catch (error) {
      this.errors.submit = this.errorMessages.submit;

      return '';
    } finally {
      this.publish();
    }
  }

  setAnswer({ id, content }) {
    this.answer = { id, content };

    this.publish();
  }

  changeContent(content) {
    this.answer = { ...this.answer, content };

    this.publish();
  }

  isAnswerComplete() {
    if (!(this.answer.id && this.answer.content)) {
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
    this.answer = null;
    this.errors = {
      edit: '',
      submit: '',
    };

    this.publish();
  }
}

export const editAnswerStore = new EditAnswerStore();
