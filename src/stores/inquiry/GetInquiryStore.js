import { apiService } from '../../services/ApiService';
import Store from '../Store';

export default class GetInquiryStore extends Store {
  constructor() {
    super();

    this.inquiries = [];

    this.page = null;
  }

  async fetchInquiries({ productId, pageNumber }) {
    const { inquiries, page } = await apiService.fetchInquiries(
      { productId, pageNumber },
    );

    this.inquiries = inquiries;
    this.page = page;

    this.publish();
  }

  clear() {
    this.inquiries = [];
    this.page = null;
  }
}

export const getInquiryStore = new GetInquiryStore();
