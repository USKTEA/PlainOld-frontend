import { apiService } from '../../services/ApiService';
import Store from '../Store';

export default class DeleteInquiryStore extends Store {
  constructor() {
    super();

    this.errors = {
      delete: '',
    };

    this.errorMessage = {
      delete: '잠시 후 다시 시도해주세요',
    };
  }

  async delete({ inquiryId }) {
    try {
      const id = await apiService.deleteInquiry(inquiryId);

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

export const deleteInquiryStore = new DeleteInquiryStore();
