import { apiService } from '../../services/ApiService';
import Store from '../Store';

export default class DeleteReplyStore extends Store {
  constructor() {
    super();

    this.errors = {
      delete: '',
    };

    this.errorMessage = {
      delete: '다시 시도해주세요',
    };
  }

  async delete({ id }) {
    try {
      const { replyId } = await apiService.deleteReply(id);

      return replyId;
    } catch (error) {
      this.errors.delete = this.errorMessage.delete;

      return '';
    }
  }
}

export const deleteReplyStore = new DeleteReplyStore();
