import { apiService } from '../../services/ApiService';
import Store from '../Store';

export default class DeleteAnswerStore extends Store {
  constructor() {
    super();

    this.errors = {
      delete: '',
    };

    this.errorMessage = {
      delete: '잠시 후 다시 시도해주세요',
    };
  }

  async delete({ answerId }) {
    try {
      const { id } = await apiService.deleteAnswer(answerId);

      return id;
    } catch (error) {
      this.errors.delete = this.errorMessage.delete;

      return '';
    } finally {
      this.publish();
    }
  }

  clear() {
    this.errors = {
      delete: '',
    };
  }
}

export const deleteAnswerStore = new DeleteAnswerStore();
