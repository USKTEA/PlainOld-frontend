import { apiService } from '../../services/ApiService';
import Store from '../Store';

export default class EditReplyStore extends Store {
  constructor() {
    super();

    this.toEdit = {
      id: '',
      reviewId: '',
      comment: '',
    };

    this.errors = {
      edit: '',
    };

    this.errorMessages = {
      edit: '잠시 후 다시 시도해주세요',
    };
  }

  async submitEdited() {
    try {
      const { id } = await apiService.editReply({ toEdit: this.toEdit });

      return id;
    } catch (error) {
      this.errors.edit = this.errorMessages.edit;

      return '';
    }
  }

  setToEdit({ id, reviewId, comment }) {
    this.toEdit = { id, reviewId, comment };

    this.publish();
  }

  editComment(comment) {
    this.toEdit = { ...this.toEdit, comment };

    this.publish();
  }

  validate() {
    if (this.toEdit.comment) {
      return true;
    }

    return false;
  }

  clear() {
    this.toEdit = {
      id: '',
      reviewId: '',
      comment: '',
    };

    this.errors = {
      edit: '',
    };

    this.publish();
  }
}

export const editReplyStore = new EditReplyStore();
