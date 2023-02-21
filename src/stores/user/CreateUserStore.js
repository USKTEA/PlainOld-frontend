/* eslint-disable consistent-return */
import { apiService } from '../../services/ApiService';
import Store from '../Store';

export default class CreateUserStore extends Store {
  constructor() {
    super();

    this.fields = {
      nickname: '',
      username: '',
      password: '',
      confirmPassword: '',
    };

    this.errors = {
      nickname: '',
      username: '',
      password: '',
      confirmPassword: '',
      create: '',
    };

    this.errorMessages = {
      nickname: {
        empty: '닉네임을 입력해주세요',
      },
      username: {
        empty: '이메일을 입력해주세요',
        invalid: '올바른 이메일을 입력해주세요',
        inUse: '해당 이메일은 사용할 수 없습니다',
      },
      password: {
        empty: '비밀번호를 입력해주세요',
        invalid: '올바른 비밀번호를 입력해주세요',
      },
      confirmPassword: {
        empty: '비밀번호를 입력해주세요',
        invalid: '비밀번호가 일치하지 않습니다',
      },
      create: '잠시 후 다시 시도해주세요',
    };

    this.patterns = {
      username: /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
      password: /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}/,
    };
  }

  async create() {
    try {
      const { count } = await apiService.countUser(this.fields.username);

      if (count) {
        this.errors.username = this.errorMessages.username.inUse;
        this.publish();

        return;
      }

      const { username } = await apiService.createUser(
        {
          nickname: this.fields.nickname,
          username: this.fields.username,
          password: this.fields.password,
        },
      );

      return username;
    } catch (error) {
      this.errors.create = this.errorMessages.create;

      return '';
    } finally {
      this.publish();
    }
  }

  changeField(field) {
    const key = Object.keys(field)[0];

    this.fields = { ...this.fields, ...field };

    this.validate(key);

    this.publish();
  }

  validate(field) {
    if (!this.fields[field]) {
      this.errors[field] = this.errorMessages[field].empty;

      return;
    }

    if (field === 'confirmPassword') {
      if (this.fields.password !== this.fields[field]) {
        this.errors[field] = this.errorMessages[field].invalid;

        return;
      }

      this.errors[field] = '';

      return;
    }

    if (field === 'nickname') {
      this.errors[field] = '';

      return;
    }

    const pattern = this.patterns[field];

    if (!pattern.test(this.fields[field])) {
      this.errors[field] = this.errorMessages[field].invalid;

      return;
    }

    this.errors[field] = '';
  }

  hasError() {
    const keys = Object.keys(this.fields);

    keys.forEach((key) => this.validate(key));

    const errors = Object.values(this.errors).join('');

    if (errors.length) {
      this.publish();

      return true;
    }

    return false;
  }

  clear() {
    this.fields = {
      nickname: '',
      username: '',
      password: '',
      confirmPassword: '',
    };

    this.errors = {
      nickname: '',
      username: '',
      password: '',
      confirmPassword: '',
    };
  }
}

export const createUserStore = new CreateUserStore();
