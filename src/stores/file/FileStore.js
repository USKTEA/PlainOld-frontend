import { apiService } from '../../services/ApiService';
import Store from '../Store';

export default class FileStore extends Store {
  constructor() {
    super();

    this.file = new FormData();

    this.url = null;

    this.errors = {
      upload: '',
    };

    this.errorMessage = {
      upload: '잠시 후 다시 시도해주세요',
    };
  }

  addFile(file) {
    this.file.append('file', file);
  }

  deleteFile() {
    this.file = new FormData();
  }

  async upload() {
    try {
      const url = await apiService.uploadFile(this.file);

      this.url = url;
    } catch (error) {
      this.errors.upload = this.errorMessage.upload;
    } finally {
      this.publish();
    }
  }

  hasFilesToUpload() {
    return !![...this.file.keys()].length;
  }

  clear() {
    this.file = new FormData();
    this.url = null;
    this.errors = {
      upload: '',
    };
  }
}

export const fileStore = new FileStore();
