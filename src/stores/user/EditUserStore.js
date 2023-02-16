import { apiService } from '../../services/ApiService';
import Store from '../Store';

export default class EditUserStore extends Store {
  constructor() {
    super();

    this.nickname = '';
    this.username = '';
    this.errors = null;
    this.errorMessage = '정확한 정보를 입력해주세요';
  }

  async edit() {
    try {
      const username = await apiService.editUserInformation(
        { username: this.username, nickname: this.nickname },
      );

      return username;
    } catch (error) {
      this.errors = this.errorMessage;

      return '';
    } finally {
      this.publish();
    }
  }

  changeNickname(nickname) {
    this.nickname = nickname;

    this.publish();
  }

  changeUsername(username) {
    this.username = username;

    this.publish();
  }

  clear() {
    this.nickname = '';
    this.username = '';
    this.errors = null;
  }
}

export const editUserStore = new EditUserStore();
