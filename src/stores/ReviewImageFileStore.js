import { apiService } from '../services/ApiService';
import FileStore from './FileStore';

export default class ReviewImageFileStore extends FileStore {
  async upload() {
    try {
      const { url } = await apiService.uploadReviewImage(this.file);

      this.url = url;
    } catch (error) {
      this.errors.upload = this.errorMessage.upload;
    } finally {
      this.publish();
    }
  }
}

export const reviewImageFileStore = new ReviewImageFileStore();
