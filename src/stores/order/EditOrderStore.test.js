import EditOrderStore from './EditOrderStore';

const context = describe;

describe('EditOrderStore', () => {
  let editOrderStore;

  beforeEach(() => {
    editOrderStore = new EditOrderStore();

    const orderNumber = 'tjrxo1234-11111111';
    const shippingInformation = {
      receiver: {
        name: '김뚜루',
        phoneNumber: '010-1111-1111',
      },
      address: {
        zipCode: '111111',
        address1: '서울시 성동구 상원12길 34',
        address2: '에이원 지식산업센터',
      },
      message: '',
    };

    editOrderStore.setOrder({ orderNumber, shippingInformation });
  });

  describe('SetOrder', () => {
    it('수정할 주문을 세팅한다', () => {
      const { order } = editOrderStore;

      expect(order).toBeTruthy();
    });
  });

  describe('Submit', () => {
    context('주문을 성공적으로 수정했을 경우', () => {
      it('수정한 주문의 orderNumber를 반환한다', async () => {
        const orderNumber = await editOrderStore.submit();

        expect(orderNumber).toBeTruthy();
      });
    });

    context('주문 수정을 실패했을 경우', () => {
      it('에러가 세팅된다', async () => {
        const invalidOrderNumber = 'SHOULDFAIL';
        const shippingInformation = {
          receiver: {
            name: '김뚜루',
            phoneNumber: '010-1111-1111',
          },
          address: {
            zipCode: '111111',
            address1: '서울시 성동구 상원12길 34',
            address2: '에이원 지식산업센터',
          },
          message: '',
        };

        editOrderStore.setOrder({ orderNumber: invalidOrderNumber, shippingInformation });

        const orderNumber = await editOrderStore.submit();

        expect(orderNumber).toBeFalsy();

        const { errors } = editOrderStore;

        expect(errors.submit).toBeTruthy();
      });
    });
  });

  describe('GetError', () => {
    it('error를 반환한다', () => {
      editOrderStore.changeInformation({ name: '' });

      expect(editOrderStore.isComplete()).toBeFalsy();

      expect(editOrderStore.getError()).toBe('2글자 이상 입력해 주세요');
    });
  });

  describe('IsComplete', () => {
    context('Error가 있을 경우', () => {
      it('False를 반환한다', () => {
        expect(editOrderStore.errors.name).toBeFalsy();

        editOrderStore.changeInformation({ name: '' });

        expect(editOrderStore.errors.name).toBeTruthy();

        expect(editOrderStore.isComplete()).toBeFalsy();
      });
    });

    context('Fields에 빈 값이 있을 경우', () => {
      it('False를 반환한다', () => {
        editOrderStore.changeInformation({ name: '' });

        expect(editOrderStore.isComplete()).toBeFalsy();
      });
    });
  });

  describe('Name', () => {
    context('유효한 name을 입력했을 경우', () => {
      it('errors에서 name 에러가 보이지 않는다', () => {
        expect(editOrderStore.errors.name).toBeFalsy();

        editOrderStore.changeInformation({ name: '김뚜루' });

        expect(editOrderStore.errors.name).toBeFalsy();
      });
    });

    context('Name을 입력하지 않았을 경우', () => {
      it('errors에서 name 에러가 세팅된다', () => {
        expect(editOrderStore.errors.name).toBeFalsy();

        editOrderStore.changeInformation({ name: '' });

        expect(editOrderStore.errors.name).toBeTruthy();
      });
    });

    context('Name을 2글자 미만 입력했을 경우', () => {
      it('errors에서 name 에러가 세팅된다', () => {
        expect(editOrderStore.errors.name).toBeFalsy();

        editOrderStore.changeInformation({ name: '김' });

        expect(editOrderStore.errors.name).toBeTruthy();
      });
    });
  });

  describe('PhoneNumber', () => {
    context('유효한 phoneNumber를 입력했을 경우', () => {
      it('errors에서 phoneNUmber 에러가 보이지 않는다', () => {
        expect(editOrderStore.errors.phoneNumber).toBeFalsy();

        editOrderStore.changeInformation({ phoneNumber: '010-5237-2189' });

        expect(editOrderStore.errors.phoneNumber).toBeFalsy();
      });
    });

    context('PhoneNumber를 입력하지 않았을 경우', () => {
      it('errors에서 name 에러가 세팅된다', () => {
        expect(editOrderStore.errors.phoneNumber).toBeFalsy();

        editOrderStore.changeInformation({ phoneNumber: '' });

        expect(editOrderStore.errors.phoneNumber).toBeTruthy();
      });
    });
  });

  describe('Address', () => {
    describe('ZipCode', () => {
      context('유효한 zipCode를 입력했을 경우', () => {
        it('errors에서 address 에러가 보이지 않는다', () => {
          expect(editOrderStore.errors.zipCode).toBeFalsy();

          editOrderStore.changeInformation({ zipCode: '623814' });

          expect(editOrderStore.errors.zipCode).toBeFalsy();
        });
      });

      context('ZipCode를 입력하지 않았을 경우', () => {
        it('errors에서 address 에러가 세팅된다', () => {
          expect(editOrderStore.errors.zipCode).toBeFalsy();

          editOrderStore.changeInformation({ zipCode: '' });

          expect(editOrderStore.errors.zipCode).toBeTruthy();
        });
      });

      context('유효하지 않은 zipCode를 입력했을 경우', () => {
        it('errors에서 address 에러가 세팅된다', () => {
          expect(editOrderStore.errors.zipCode).toBeFalsy();

          editOrderStore.changeInformation({ zipCode: 'aa11' });

          expect(editOrderStore.errors.zipCode).toBeTruthy();
        });
      });
    });

    describe('Address1', () => {
      context('유효한 address1을 입력했을 경우', () => {
        it('errors에서 address에러가 보이지 않는다', () => {
          expect(editOrderStore.errors.address1).toBeFalsy();

          editOrderStore.changeInformation({ address1: '서울시 성동구 상원12길 34' });

          expect(editOrderStore.errors.address1).toBeFalsy();
        });
      });

      context('유효하지 않은 address1을 입력했을 경우', () => {
        it('errors에서 address에러가 세팅된다', () => {
          expect(editOrderStore.errors.address1).toBeFalsy();

          editOrderStore.changeInformation({ address1: '이건유효하지않아' });

          expect(editOrderStore.errors.address1).toBeTruthy();
        });
      });

      context('address1을 입력하지 않았을 경우', () => {
        it('errors에서 address에러가 세팅된다', () => {
          expect(editOrderStore.errors.address1).toBeFalsy();

          editOrderStore.changeInformation({ address1: '' });

          expect(editOrderStore.errors.address1).toBeTruthy();
        });
      });
    });

    describe('Address2', () => {
      context('Address2을 입력했을 경우', () => {
        it('errors에서 address에러가 보이지 않는다', () => {
          expect(editOrderStore.errors.address2).toBeFalsy();

          editOrderStore.changeInformation({ address2: '에이원지식산업센터 612호' });

          expect(editOrderStore.errors.address2).toBeFalsy();
        });
      });

      context('address1을 입력하지 않았을 경우', () => {
        it('errors에서 address에러가 세팅된다', () => {
          expect(editOrderStore.errors.address2).toBeFalsy();

          editOrderStore.changeInformation({ address2: '' });

          expect(editOrderStore.errors.address2).toBeTruthy();
        });
      });
    });

    describe('Message', () => {
      it('마지막으로 입력된 message를 저장한다', () => {
        expect(editOrderStore.order.message).toBe('');

        editOrderStore.changeInformation({ message: '부재시 경비실에 맡겨주세요.' });

        expect(editOrderStore.order.message).toBe('부재시 경비실에 맡겨주세요.');

        editOrderStore.changeInformation({ message: '전화주세요' });

        expect(editOrderStore.order.message).toBe('전화주세요');
      });
    });
  });
});
