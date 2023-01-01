import OrderFormStore from './OrderFormStore';

const context = describe;

describe('OrderFormStore', () => {
  let orderFormStore;

  beforeEach(() => {
    orderFormStore = new OrderFormStore();
  });

  describe('IsComplete', () => {
    context('Error가 있을 경우', () => {
      it('False를 반환한다', () => {
        expect(orderFormStore.errors.ordererName).toBeFalsy();

        orderFormStore.changeField({ ordererName: '' });

        expect(orderFormStore.errors.ordererName).toBeTruthy();

        expect(orderFormStore.isComplete()).toBeFalsy();
      });
    });

    context('Fields에 빈 값이 있을 경우', () => {
      it('False를 반환한다', () => {
        expect(orderFormStore.isComplete()).toBeFalsy();
      });
    });

    context('Agreements에 모두 동의하지 않은 경우', () => {
      it('False를 반환한다', () => {
        orderFormStore.changeField({ ordererName: '김뚜루' });
        orderFormStore.changeField({ ordererPhoneNumber: '010-5237-2189' });
        orderFormStore.changeField({ ordererEmail: 'tjrxo1234@gmail.com' });
        orderFormStore.changeField({ receiverName: '김뚜루' });
        orderFormStore.changeField({ receiverPhoneNumber: '010-5237-2189' });
        orderFormStore.changeField({ zipCode: '623814' });
        orderFormStore.changeField({ address1: '서울시 성동구 상원12길 34' });
        orderFormStore.changeField({ address2: '에이원지식산업센터 612호' });
        orderFormStore.changeField({ paymentMethod: 'CASH' });

        expect(orderFormStore.isComplete()).toBeFalsy();
      });
    });

    context(
      'ShippingMessage와 payer를 제외하고Fields에 빈 값이 없고 error가 없을 경우 agreements에 모두 동의한 경우',
      () => {
        it('True를 반환한다', () => {
          orderFormStore.changeField({ ordererName: '김뚜루' });
          orderFormStore.changeField({ ordererPhoneNumber: '010-5237-2189' });
          orderFormStore.changeField({ ordererEmail: 'tjrxo1234@gmail.com' });
          orderFormStore.changeField({ receiverName: '김뚜루' });
          orderFormStore.changeField({ receiverPhoneNumber: '010-5237-2189' });
          orderFormStore.changeField({ zipCode: '623814' });
          orderFormStore.changeField({ address1: '서울시 성동구 상원12길 34' });
          orderFormStore.changeField({ address2: '에이원지식산업센터 612호' });
          orderFormStore.changeField({ paymentMethod: 'CASH' });

          orderFormStore.agreeAllAgreements();

          expect(orderFormStore.isComplete()).toBeTruthy();
        });
      },
    );
  });

  describe('CopyOrdererInformation', () => {
    it(
      'OrdererName과 ordererPhoneNumber를 receiverName과 receiverPhoneNumber에 저장한다',
      () => {
        expect(orderFormStore.fields.receiverName).toBe('');
        expect(orderFormStore.fields.receiverPhoneNumber).toBe('');

        orderFormStore.changeField({ ordererName: '김뚜루' });
        orderFormStore.changeField({ ordererPhoneNumber: '010-5237-2189' });

        orderFormStore.copyOrdererInformation();

        expect(orderFormStore.fields.receiverName).toBe('김뚜루');
        expect(orderFormStore.fields.receiverPhoneNumber).toBe('010-5237-2189');
      },
    );
  });

  describe('ClearOrdererInformation', () => {
    it(
      'receiverName과 receiverPhoneNumber을 초기화한다',
      () => {
        expect(orderFormStore.fields.receiverName).toBe('');
        expect(orderFormStore.fields.receiverPhoneNumber).toBe('');

        orderFormStore.changeField({ ordererName: '김뚜루' });
        orderFormStore.changeField({ ordererPhoneNumber: '010-5237-2189' });

        orderFormStore.copyOrdererInformation();

        expect(orderFormStore.fields.receiverName).toBe('김뚜루');
        expect(orderFormStore.fields.receiverPhoneNumber).toBe('010-5237-2189');

        orderFormStore.clearReceiverInformation();

        expect(orderFormStore.fields.receiverName).toBe('');
        expect(orderFormStore.fields.receiverPhoneNumber).toBe('');
      },
    );
  });

  describe('OrdererName', () => {
    it('OrdererName을 변경한다', () => {
      expect(orderFormStore.fields.ordererName).toBe('');

      orderFormStore.changeField({ ordererName: '김뚜루' });

      expect(orderFormStore.fields.ordererName).toBe('김뚜루');
    });
  });

  describe('OrdererPhoneNumber', () => {
    it('OrdererPhoneNumber를 변경한다', () => {
      expect(orderFormStore.fields.ordererPhoneNumber).toBe('');

      orderFormStore.changeField({ ordererPhoneNumber: '010-5237-2189' });

      expect(orderFormStore.fields.ordererPhoneNumber).toBe('010-5237-2189');
    });
  });

  describe('OrdererEmail', () => {
    it('OrdererEmail을 변경한다', () => {
      expect(orderFormStore.fields.ordererEmail).toBe('');

      orderFormStore.changeField({ ordererEmail: 'tjrxo1234@gmail.com' });

      expect(orderFormStore.fields.ordererEmail).toBe('tjrxo1234@gmail.com');
    });
  });

  describe('OrdererName field', () => {
    context('유효한 ordererName을 입력했을 경우', () => {
      it('errors에서 ordererName 에러가 보이지 않는다', () => {
        expect(orderFormStore.errors.ordererName).toBeFalsy();

        orderFormStore.changeField({ ordererName: '김뚜루' });

        expect(orderFormStore.errors.ordererName).toBeFalsy();
      });
    });

    context('ordererName을 입력하지 않았을 경우', () => {
      it('ordererName필드에 에러가 세팅된다', () => {
        expect(orderFormStore.errors.ordererName).toBeFalsy();

        orderFormStore.changeField({ ordererName: '' });

        expect(orderFormStore.errors.ordererName).toBeTruthy();
      });
    });

    context('여덟 글자가 넘는 ordererName을 입력했을 경우', () => {
      it('ordererName필드에 에러가 세팅된다', () => {
        expect(orderFormStore.errors.ordererName).toBeFalsy();

        orderFormStore.changeField({ ordererName: '여덟글자가넘는이름' });

        expect(orderFormStore.errors.ordererName).toBeTruthy();
      });
    });

    context('세 글자 미만의 ordererName을 입력했을 경우', () => {
      it('ordererName필드에 에러가 세팅된다', () => {
        expect(orderFormStore.errors.ordererName).toBeFalsy();

        orderFormStore.changeField({ ordererName: '김' });

        expect(orderFormStore.errors.ordererName).toBeTruthy();
      });
    });
  });

  describe('OrdererPhoneNumber field', () => {
    context('유효한 ordererPhoneNumber를 입력했을 경우', () => {
      it('errors에서 ordererPhoneNumber 에러가 보이지 않는다', () => {
        expect(orderFormStore.errors.ordererPhoneNumber).toBeFalsy();

        orderFormStore.changeField({ ordererPhoneNumber: '010-5237-2189' });

        expect(orderFormStore.errors.ordererPhoneNumber).toBeFalsy();
      });
    });

    context('ordererPhoneNumber를 입력하지 않았을 경우', () => {
      it('errors에서 ordererPhoneNumber 에러가 세팅된다', () => {
        expect(orderFormStore.errors.ordererPhoneNumber).toBeFalsy();

        orderFormStore.changeField({ ordererPhoneNumber: '' });

        expect(orderFormStore.errors.ordererPhoneNumber).toBeTruthy();
      });
    });

    context('유효하지 않은 ordererPhoneNumber를 입력했을 경우', () => {
      it('errors에서 ordererPhoneNumber 에러가 세팅된다', () => {
        expect(orderFormStore.errors.ordererPhoneNumber).toBeFalsy();

        orderFormStore.changeField({ ordererPhoneNumber: '123-1234' });

        expect(orderFormStore.errors.ordererPhoneNumber).toBeTruthy();
      });
    });
  });

  describe('OrdererEmail field', () => {
    context('유효한 ordererEmail을 입력했을 경우', () => {
      it('errors에서 ordererEmail 에러가 보이지 않는다', () => {
        expect(orderFormStore.errors.ordererEmail).toBeFalsy();

        orderFormStore.changeField({ ordererEmail: 'tjrxo1234@gmail.com' });

        expect(orderFormStore.errors.ordererEmail).toBeFalsy();
      });
    });

    context('ordererEmail을 입력하지 않았을 경우', () => {
      it('errors에서 ordererEmail 에러가 세팅된다', () => {
        expect(orderFormStore.errors.ordererEmail).toBeFalsy();

        orderFormStore.changeField({ ordererEmail: '' });

        expect(orderFormStore.errors.ordererEmail).toBeTruthy();
      });
    });

    context('유효하지 않은 ordererEmail을 입력했을 경우', () => {
      it('errors에서 ordererEmail 에러가 세팅된다', () => {
        expect(orderFormStore.errors.ordererEmail).toBeFalsy();

        orderFormStore.changeField({ ordererEmail: 'invalidEmail' });

        expect(orderFormStore.errors.ordererEmail).toBeTruthy();
      });
    });
  });

  describe('ReceiverName', () => {
    context('유효한 receiverName을 입력했을 경우', () => {
      it('errors에서 receiverName 에러가 보이지 않는다', () => {
        expect(orderFormStore.errors.receiverName).toBeFalsy();

        orderFormStore.changeField({ receiverName: '김뚜루' });

        expect(orderFormStore.errors.receiverName).toBeFalsy();
      });
    });

    context('ReceiverName을 입력하지 않았을 경우', () => {
      it('errors에서 receiverName 에러가 세팅된다', () => {
        expect(orderFormStore.errors.receiverName).toBeFalsy();

        orderFormStore.changeField({ receiverName: '' });

        expect(orderFormStore.errors.receiverName).toBeTruthy();
      });
    });

    context('receiverName을 2글자 미만 입력했을 경우', () => {
      it('errors에서 receiverName 에러가 세팅된다', () => {
        expect(orderFormStore.errors.receiverName).toBeFalsy();

        orderFormStore.changeField({ receiverName: '김' });

        expect(orderFormStore.errors.receiverName).toBeTruthy();
      });
    });
  });

  describe('ReceiverPhoneNumber', () => {
    context('유효한 receiverPhoneNumber를 입력했을 경우', () => {
      it('errors에서 receiverPhoneNUmber 에러가 보이지 않는다', () => {
        expect(orderFormStore.errors.receiverPhoneNumber).toBeFalsy();

        orderFormStore.changeField({ receiverPhoneNumber: '010-5237-2189' });

        expect(orderFormStore.errors.receiverPhoneNumber).toBeFalsy();
      });
    });

    context('ReceiverName을 입력하지 않았을 경우', () => {
      it('errors에서 receiverName 에러가 세팅된다', () => {
        expect(orderFormStore.errors.receiverPhoneNumber).toBeFalsy();

        orderFormStore.changeField({ receiverPhoneNumber: '' });

        expect(orderFormStore.errors.receiverPhoneNumber).toBeTruthy();
      });
    });

    context('receiverName을 2글자 미만 입력했을 경우', () => {
      it('errors에서 receiverName 에러가 세팅된다', () => {
        expect(orderFormStore.errors.receiverPhoneNumber).toBeFalsy();

        orderFormStore.changeField({ receiverPhoneNumber: '1231234' });

        expect(orderFormStore.errors.receiverPhoneNumber).toBeTruthy();
      });
    });
  });

  describe('Address', () => {
    describe('ZipCode', () => {
      context('유효한 zipCode를 입력했을 경우', () => {
        it('errors에서 address 에러가 보이지 않는다', () => {
          expect(orderFormStore.errors.zipCode).toBeFalsy();

          orderFormStore.changeField({ zipCode: '623814' });

          expect(orderFormStore.errors.zipCode).toBeFalsy();
        });
      });

      context('ZipCode를 입력하지 않았을 경우', () => {
        it('errors에서 address 에러가 세팅된다', () => {
          expect(orderFormStore.errors.zipCode).toBeFalsy();

          orderFormStore.changeField({ zipCode: '' });

          expect(orderFormStore.errors.zipCode).toBeTruthy();
        });
      });

      context('유효하지 않은 zipCode를 입력했을 경우', () => {
        it('errors에서 address 에러가 세팅된다', () => {
          expect(orderFormStore.errors.zipCode).toBeFalsy();

          orderFormStore.changeField({ zipCode: 'aa11' });

          expect(orderFormStore.errors.zipCode).toBeTruthy();
        });
      });
    });

    describe('Address1', () => {
      context('유효한 address1을 입력했을 경우', () => {
        it('errors에서 address에러가 보이지 않는다', () => {
          expect(orderFormStore.errors.address1).toBeFalsy();

          orderFormStore.changeField({ address1: '서울시 성동구 상원12길 34' });

          expect(orderFormStore.errors.address1).toBeFalsy();
        });
      });

      context('유효하지 않은 address1을 입력했을 경우', () => {
        it('errors에서 address에러가 세팅된다', () => {
          expect(orderFormStore.errors.address1).toBeFalsy();

          orderFormStore.changeField({ address1: '이건유효하지않아' });

          expect(orderFormStore.errors.address1).toBeTruthy();
        });
      });

      context('address1을 입력하지 않았을 경우', () => {
        it('errors에서 address에러가 세팅된다', () => {
          expect(orderFormStore.errors.address1).toBeFalsy();

          orderFormStore.changeField({ address1: '' });

          expect(orderFormStore.errors.address1).toBeTruthy();
        });
      });
    });

    describe('Address2', () => {
      context('Address2을 입력했을 경우', () => {
        it('errors에서 address에러가 보이지 않는다', () => {
          expect(orderFormStore.errors.address2).toBeFalsy();

          orderFormStore.changeField({ address2: '에이원지식산업센터 612호' });

          expect(orderFormStore.errors.address2).toBeFalsy();
        });
      });

      context('address1을 입력하지 않았을 경우', () => {
        it('errors에서 address에러가 세팅된다', () => {
          expect(orderFormStore.errors.address2).toBeFalsy();

          orderFormStore.changeField({ address2: '' });

          expect(orderFormStore.errors.address2).toBeTruthy();
        });
      });
    });

    describe('ShippingMessage', () => {
      it('마지막으로 입력된 shippingMessage를 저장한다', () => {
        expect(orderFormStore.fields.shippingMessage).toBe('');

        orderFormStore.changeField({ shippingMessage: '부재시 경비실에 맡겨주세요.' });

        expect(orderFormStore.fields.shippingMessage).toBe('부재시 경비실에 맡겨주세요.');

        orderFormStore.changeField({ shippingMessage: '전화주세요' });

        expect(orderFormStore.fields.shippingMessage).toBe('전화주세요');
      });
    });

    describe('PaymentMethod', () => {
      context('PaymentMethod를 변경하는 경우', () => {
        it('마지막으로 입력된 paymentMethod를 저장한다', () => {
          expect(orderFormStore.fields.paymentMethod).toBe('');

          orderFormStore.changeField({ paymentMethod: 'CASH' });

          expect(orderFormStore.fields.paymentMethod).toBe('CASH');
        });
      });

      context('Payer를 변경하는 경우', () => {
        it('입력된 payer를 저장한다', () => {
          expect(orderFormStore.fields.payer).toBe('');

          orderFormStore.changeField({ payer: '김뚜루' });

          expect(orderFormStore.fields.payer).toBe('김뚜루');
        });
      });
    });

    describe('Agreements', () => {
      context('AgreeAllAgreements가 호출되는 경우', () => {
        it('PrivacyAgreement와 PurchaseAgreement 둘을 agree로 세팅한다', () => {
          expect(orderFormStore.agreements.privacyAgreement).toBe('');
          expect(orderFormStore.agreements.purchaseAgreement).toBe('');

          orderFormStore.agreeAllAgreements();

          expect(orderFormStore.agreements.privacyAgreement).toBe('agree');
          expect(orderFormStore.agreements.purchaseAgreement).toBe('agree');
        });
      });

      context('DisagreeAllAgreements가 호출되는 경우', () => {
        it('PrivacyAgreement와 PurchaseAgreement 둘을 빈 값으로 세팅한다', () => {
          expect(orderFormStore.agreements.privacyAgreement).toBe('');
          expect(orderFormStore.agreements.purchaseAgreement).toBe('');

          orderFormStore.agreeAllAgreements();

          expect(orderFormStore.agreements.privacyAgreement).toBe('agree');
          expect(orderFormStore.agreements.purchaseAgreement).toBe('agree');

          orderFormStore.disagreeAllAgreements();

          expect(orderFormStore.agreements.privacyAgreement).toBe('');
          expect(orderFormStore.agreements.purchaseAgreement).toBe('');
        });
      });

      context('TogglePrivacyAgreement가 호출되는 경우', () => {
        it('PrivacyAgreement를 agree 또는 빈 값으로 세팅한다', () => {
          expect(orderFormStore.agreements.privacyAgreement).toBe('');

          orderFormStore.toggleAgreement('privacyAgreement');

          expect(orderFormStore.agreements.privacyAgreement).toBe('agree');

          orderFormStore.toggleAgreement('privacyAgreement');

          expect(orderFormStore.agreements.privacyAgreement).toBe('');
        });
      });

      context('TogglePurchaseAgreement가 호출되는 경우', () => {
        it('PurchaseAgreement를 agree 또는 빈 값으로 세팅한다', () => {
          expect(orderFormStore.agreements.purchaseAgreement).toBe('');

          orderFormStore.toggleAgreement('purchaseAgreement');

          expect(orderFormStore.agreements.purchaseAgreement).toBe('agree');

          orderFormStore.toggleAgreement('purchaseAgreement');

          expect(orderFormStore.agreements.purchaseAgreement).toBe('');
        });
      });
    });
  });
});
