import { apiService } from '../../services/ApiService';
import Store from '../Store';

export default class EditOrderStore extends Store {
  constructor() {
    super();

    this.order = null;

    this.errors = {
      name: '',
      phoneNumber: '',
      zipCode: '',
      address1: '',
      address2: '',
      submit: '',
    };

    this.errorMessages = {
      name: {
        empty: '2글자 이상 입력해 주세요',
        invalid: '올바른 이름을 입력해주세요',
      },
      phoneNumber: {
        empty: '전화번호를 입력하세요',
        invalid: '올바른 전화번호를 입력하세요',
      },
      zipCode: {
        empty: '우편번호를 입력하세요',
        invalid: '올바른 우편번호를 입력하세요',
      },
      address1: {
        empty: '주소를 입력하세요',
        invalid: '올바른 주소를 입력하세요',
      },
      address2: {
        empty: '상세주소를 입력하세요',
      },
      submit: '잠시 후 다시 시도해주세요',
    };

    this.patterns = {
      name: /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]{2,}$/,
      phoneNumber: /^[0-9]{3}-[0-9]{3,4}-[0-9]{4}/,
      zipCode: /^\d{3}-?\d{3}$/u,
      address1: /(([가-힣A-Za-z·\d~\-.]{2,}(로|길).[\d]+)|([가-힣A-Za-z·\d~\-.]+(읍|동)\s)[\d]+)/,
    };
  }

  async submit() {
    try {
      const editRequest = {
        orderNumber: this.order.orderNumber,
        receiver: {
          name: this.order.name,
          phoneNumber: this.order.phoneNumber,
        },
        address: {
          zipCode: this.order.zipCode,
          address1: this.order.address1,
          address2: this.order.address2,
        },
        message: this.order.message,
      };

      const { orderNumber } = await apiService.editOrder({ editRequest });

      return orderNumber;
    } catch (error) {
      this.errors.submit = this.errorMessages.submit;

      return '';
    } finally {
      this.publish();
    }
  }

  setOrder({ orderNumber, shippingInformation: { receiver, address, message } }) {
    this.order = {
      orderNumber,
      name: receiver.name,
      phoneNumber: receiver.phoneNumber,
      zipCode: address.zipCode,
      address1: address.address1,
      address2: address.address2,
      message,
    };

    this.publish();
  }

  changeInformation(item) {
    const key = Object.keys(item)[0];

    this.order = { ...this.order, ...item };

    if (key === 'message') {
      this.publish();

      return;
    }

    this.validate(key);

    this.publish();
  }

  validate(item) {
    if (!this.order[item]) {
      this.errors[item] = this.errorMessages[item].empty;

      return;
    }

    if (item === 'address2') {
      this.errors[item] = '';

      return;
    }

    const pattern = this.patterns[item];

    if (!pattern.test(this.order[item])) {
      this.errors[item] = this.errorMessages[item].invalid;

      return;
    }

    this.errors[item] = '';
  }

  isComplete() {
    if (Object.values(this.errors).filter((error) => error).length) {
      return false;
    }

    const items = Object.keys(this.order).filter((field) => (
      field !== 'message'));

    const filled = items.filter((item) => this.order[item]);

    if (!items.length === filled.length) {
      return false;
    }

    return true;
  }

  getError() {
    return Object.values(this.errors).filter((error) => error)[0];
  }

  clear() {
    this.order = null;
    this.errors = {
      name: '',
      phoneNumber: '',
      zipCode: '',
      address1: '',
      address2: '',
    };

    this.publish();
  }
}

export const editOrderStore = new EditOrderStore();
