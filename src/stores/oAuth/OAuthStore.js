/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */

import { apiService } from '../../services/ApiService';
import Store from '../Store';

export default class OAuthStore extends Store {
  constructor() {
    super();

    this.errors = {
      login: '',
    };

    this.errorMessage = {
      login: '로그인에 실패했습니다',
    };
  }

  async getRedirectUrl({ provider }) {
    try {
      const { redirectUrl } = await apiService.getOAuthRedirectUrl({ provider });

      return redirectUrl;
    } catch (error) {
      return '';
    }
  }

  async login({ provider, code }) {
    try {
      const { accessToken } = await apiService.postOAuthSession(
        { provider, code },
      );

      return accessToken;
    } catch (error) {
      this.errors.login = this.errorMessage.login;

      return '';
    }
  }

  clear() {
    this.errors = {
      login: '',
    };
  }
}

export const oAuthStore = new OAuthStore();
