import Store from '../Store';

export default class OrderFormStore extends Store {
  constructor() {
    super();

    this.fields = {
      ordererName: '',
      ordererPhoneNumber: '',
      ordererEmail: '',
      receiverName: '',
      receiverPhoneNumber: '',
      zipCode: '',
      address1: '',
      address2: '',
      shippingMessage: '',
      paymentMethod: '',
      payer: '',
    };

    this.agreements = {
      privacyAgreement: '',
      purchaseAgreement: '',
    };

    this.errors = {
      ordererName: '',
      ordererPhoneNumber: '',
      ordererEmail: '',
      receiverName: '',
      receiverPhoneNumber: '',
      zipCode: '',
      address1: '',
      address2: '',
    };

    this.errorMessages = {
      ordererName: {
        empty: '주문자 이름을 입력해주세요',
        invalid: '이름을 다시 확인해주세요',
      },
      ordererPhoneNumber: {
        empty: '전화번호를 입력하세요',
        invalid: '올바른 전화번호를 입력하세요',
      },
      ordererEmail: {
        empty: '이메일을 입력해주세요',
        invalid: '올바른 이메일 입력하세요',
      },
      receiverName: {
        empty: '2글자 이상 입력해 주세요',
        invalid: '2글자 이상 입력해 주세요',
      },
      receiverPhoneNumber: {
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
    };

    this.patterns = {
      ordererName: /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]{2,7}$/,
      ordererPhoneNumber: /^[0-9]{3}-[0-9]{3,4}-[0-9]{4}/,
      ordererEmail: /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
      receiverName: /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]{2,}$/,
      receiverPhoneNumber: /^[0-9]{3}-[0-9]{3,4}-[0-9]{4}/,
      zipCode: /^\d{3}-?\d{3}$/u,
      address1: /(([가-힣A-Za-z·\d~\-.]{2,}(로|길).[\d]+)|([가-힣A-Za-z·\d~\-.]+(읍|동)\s)[\d]+)/,
    };
  }

  changeField(field) {
    const key = Object.keys(field)[0];

    this.fields = { ...this.fields, ...field };

    if (key === 'shippingMessage' || key === 'paymentMethod' || key === 'payer') {
      this.publish();

      return;
    }

    this.validate(key);

    this.publish();
  }

  validate(field) {
    if (!this.fields[field]) {
      this.errors[field] = this.errorMessages[field].empty;

      return;
    }

    if (field === 'address2') {
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

  toggleAgreeAll() {
    if (this.agreements.privacyAgreement && this.agreements.purchaseAgreement) {
      this.disagreeAllAgreements();

      return;
    }

    this.agreeAllAgreements();
  }

  agreeAllAgreements() {
    this.agreements = {
      privacyAgreement: 'agree',
      purchaseAgreement: 'agree',
    };

    this.publish();
  }

  disagreeAllAgreements() {
    this.agreements = {
      privacyAgreement: '',
      purchaseAgreement: '',
    };

    this.publish();
  }

  toggleAgreement(agreement) {
    if (this.agreements[agreement]) {
      this.agreements = { ...this.agreements, [agreement]: '' };

      this.publish();

      return;
    }

    this.agreements = { ...this.agreements, [agreement]: 'agree' };

    this.publish();
  }

  copyOrdererInformation() {
    this.fields = {
      ...this.fields,
      receiverName: this.fields.ordererName,
      receiverPhoneNumber: this.fields.ordererPhoneNumber,
    };

    this.validate('receiverName');
    this.validate('receiverPhoneNumber');

    this.publish();
  }

  clearReceiverInformation() {
    this.fields = {
      ...this.fields,
      receiverName: '',
      receiverPhoneNumber: '',
    };

    this.publish();
  }

  isComplete() {
    if (!Object.values(this.agreements).filter((agreement) => agreement).length) {
      return false;
    }

    if (Object.values(this.errors).filter((error) => error).length) {
      return false;
    }

    const fields = Object.keys(this.fields).filter((field) => (
      field !== 'shippingMessage' && field !== 'payer'));

    const filled = fields.filter((field) => this.fields[field]);

    if (!fields.length === filled.length) {
      return false;
    }

    return true;
  }

  form() {
    const orderer = {
      name: this.fields.ordererName,
      phoneNumber: this.fields.ordererPhoneNumber,
      email: this.fields.ordererEmail,
    };

    const receiver = {
      name: this.fields.receiverName,
      phoneNumber: this.fields.receiverPhoneNumber,
    };

    const address = {
      zipCode: this.fields.zipCode,
      address1: this.fields.address1,
      address2: this.fields.address2,
    };

    const shippingInformation = {
      receiver, address, message: this.fields.shippingMessage,
    };

    const payment = {
      method: this.fields.paymentMethod,
      payer: this.fields.payer || this.fields.ordererName,
    };

    return { orderer, shippingInformation, payment };
  }

  reset() {
    this.fields = {
      ordererName: '',
      ordererPhoneNumber: '',
      ordererEmail: '',
      receiverName: '',
      receiverPhoneNumber: '',
      zipCode: '',
      address1: '',
      address2: '',
      paymentMethod: '',
      payer: '',
    };

    this.errors = {
      ordererName: '',
      ordererPhoneNumber: '',
      ordererEmail: '',
      receiverName: '',
      receiverPhoneNumber: '',
      zipCode: '',
      address1: '',
      address2: '',
    };

    this.agreements = {
      privacyAgreement: '',
      purchaseAgreement: '',
    };
  }
}

export const orderFormStore = new OrderFormStore();
