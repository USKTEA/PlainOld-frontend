import { fireEvent, render, screen } from '@testing-library/react';
import { editOrderStore } from '../../stores/order/EditOrderStore';
import EditOrderModal from './EditOrderModal';

const context = describe;
describe('EditOrderModal', () => {
  const renderEditOrderModal = () => {
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
    render(<EditOrderModal />);
  };

  beforeEach(() => {
    editOrderStore.clear();
  });

  it('수정할 주문의 배송지정보를 보여준다', () => {
    renderEditOrderModal();

    screen.getByRole('heading', { name: '배송정보 수정' });
    screen.getByLabelText('수령인 이름');
    screen.getByLabelText('연락처');
    screen.getByLabelText('주소');
    screen.getByLabelText('상세주소');
    screen.getByLabelText('배송메모');
  });

  describe('배송정보 수정', () => {
    context('모든 fields를 유효한 값으로 입력한 경우', () => {
      it('에러메시지가 보이지 않는다', () => {
        renderEditOrderModal();

        fireEvent.change(screen.getByLabelText('수령인 이름'), {
          target: { value: '김뚜루' },
        });

        fireEvent.change(screen.getByLabelText('연락처'), {
          target: { value: '010-5237-2189' },
        });

        expect(screen.queryByText('이름을 다시 확인해주세요')).toBeFalsy();
        expect(screen.queryByText('올바른 전화번호를 입력하세요')).toBeFalsy();
      });
    });

    describe('수령인 이름', () => {
      context('이름을 입력하지 않은 경우', () => {
        it('주문자 이름을 입력해주세요 에러메시지가 보인다', () => {
          renderEditOrderModal();

          fireEvent.change(screen.getByLabelText('수령인 이름'), {
            target: { value: '' },
          });

          expect(screen.getByText('2글자 이상 입력해 주세요')).toBeTruthy();
        });
      });

      context('입력한 이름의 길이가 두 글자 미만인 경우', () => {
        it('2글자 이상 입력해 주세요 에러메시지가 보인다', () => {
          renderEditOrderModal();

          fireEvent.change(screen.getByLabelText('수령인 이름'), {
            target: { value: '두' },
          });

          expect(screen.getByText('올바른 이름을 입력해주세요')).toBeTruthy();
        });
      });
    });

    describe('수령인 연락처', () => {
      context('연락처를 입력하지 않았을 경우', () => {
        it('전화번호를 입력하세요 에러메시지가 보인다', () => {
          renderEditOrderModal();

          fireEvent.change(screen.getByLabelText('연락처'), {
            target: { value: '' },
          });

          expect(screen.getByText('전화번호를 입력하세요')).toBeTruthy();
        });
      });

      context('입력한 연락처가 무효한 연락처인 경우', () => {
        it('올바른 전화번호를 입력하세요 에러메시지가 보인다', () => {
          renderEditOrderModal();

          fireEvent.change(screen.getByLabelText('연락처'), {
            target: { value: '213123' },
          });

          expect(screen.getByText('올바른 전화번호를 입력하세요')).toBeTruthy();
        });
      });
    });

    describe('우편번호', () => {
      context('유효한 우편번호를 입력했을 경우', () => {
        it('올바른 주소를 입력하세요 에러메시지가 보이지 않는다', () => {
          renderEditOrderModal();

          expect(screen.queryByText('올바른 우편번호를 입력하세요')).toBeFalsy();

          fireEvent.change(screen.getByLabelText('우편번호'), {
            target: { value: '623814' },
          });

          expect(screen.queryByText('올바른 우편번호를 입력하세요')).toBeFalsy();
        });
      });

      context('우편번호를 입력하지 않았을 경우', () => {
        it('모든 주소를 입력하세요 에러메시지가 보인다', () => {
          renderEditOrderModal();

          expect(screen.queryByText('우편번호를 입력하세요')).toBeFalsy();

          fireEvent.change(screen.getByLabelText('우편번호'), {
            target: { value: '1' },
          });

          fireEvent.change(screen.getByLabelText('우편번호'), {
            target: { value: '' },
          });

          screen.getByText('우편번호를 입력하세요');
        });
      });

      context('올바르지 않은 우편번호를 입력했을 경우', () => {
        it('올바른 주소를 입력하세요 에러메시지가 보인다', () => {
          renderEditOrderModal();

          expect(screen.queryByText('올바른 우편번호를 입력하세요')).toBeFalsy();

          fireEvent.change(screen.getByLabelText('우편번호'), {
            target: { value: 'aa11' },
          });

          screen.getByText('올바른 우편번호를 입력하세요');
        });
      });
    });

    describe('주소', () => {
      context('유효한 주소를 입력했을 경우', () => {
        it('올바른 주소를 입력하세요 에러메시지가 보이지 않는다', () => {
          renderEditOrderModal();

          expect(screen.queryByText('올바른 주소를 입력하세요')).toBeFalsy();

          fireEvent.change(screen.getByLabelText('주소'), {
            target: { value: '서울시 성동구 상원12길 34' },
          });

          expect(screen.queryByText('올바른 주소를 입력하세요')).toBeFalsy();
        });
      });

      context('주소를 입력하지 않았을 경우', () => {
        it('올바른 주소를 입력하세요 에러메시지가 보이지 않는다', () => {
          renderEditOrderModal();

          expect(screen.queryByText('주소를 입력하세요')).toBeFalsy();

          fireEvent.change(screen.getByLabelText('주소'), {
            target: { value: '1' },
          });

          fireEvent.change(screen.getByLabelText('주소'), {
            target: { value: '' },
          });

          screen.getByText('주소를 입력하세요');
        });
      });

      context('유효하지 않은 주소를 입력했을 경우', () => {
        it('올바른 주소를 입력하세요 에러메시지가 보인다', () => {
          renderEditOrderModal();

          expect(screen.queryByText('올바른 주소를 입력하세요')).toBeFalsy();

          fireEvent.change(screen.getByLabelText('주소'), {
            target: { value: '이건유효하지않아' },
          });

          screen.getByText('올바른 주소를 입력하세요');
        });
      });
    });

    describe('상세주소', () => {
      context('상세주소를 입력했을 경우', () => {
        it('상세 주소를 입력하세요 에러메시지가 보이지 않는다', () => {
          renderEditOrderModal();

          expect(screen.queryByText('상세주소를 입력하세요')).toBeFalsy();

          fireEvent.change(screen.getByLabelText('상세주소'), {
            target: { value: '에이원지식산업센터 614호' },
          });
        });

        expect(screen.queryByText('상세주소를 입력하세요')).toBeFalsy();
      });

      context('상세주소를 입력하지 않았을 경우', () => {
        it('상세 주소를 입력하세요 에러메시지가 보인다', () => {
          renderEditOrderModal();

          expect(screen.queryByText('상세주소를 입력하세요')).toBeFalsy();

          fireEvent.change(screen.getByLabelText('상세주소'), {
            target: { value: '11' },
          });

          fireEvent.change(screen.getByLabelText('상세주소'), {
            target: { value: '' },
          });

          screen.getByText('상세주소를 입력하세요');
        });
      });
    });
  });
});
