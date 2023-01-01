import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ThemeProvider } from 'styled-components';

import { orderFormStore } from '../../stores/OrderFormStore';

import ShippingInformation from './ShippingInformation';

import defaultTheme from '../../styles/defaultTheme';

const context = describe;

describe('ShippingInformation', () => {
  const renderShippingInformation = () => {
    render((
      <ThemeProvider theme={defaultTheme}>
        <ShippingInformation />
      </ThemeProvider>
    ));
  };

  beforeEach(() => {
    orderFormStore.reset();
  });

  describe('주문자 정보와 동일 checkbox', () => {
    context('주문자 정보와 동일 checkbox가 체크될 경우 ', () => {
      it('배송 정보 수령인과 연락처에 주문자 정보 이름과 연락처가 자동입력 된다', () => {
        orderFormStore.changeField({ ordererName: '김뚜루' });
        orderFormStore.changeField({ ordererPhoneNumber: '010-5237-2189' });

        renderShippingInformation();

        fireEvent.click(screen.getByLabelText('주문자 정보와 동일'));

        expect(screen.getByLabelText('주문자 정보와 동일')).toBeChecked();

        expect(screen.getByPlaceholderText('수령인')).toHaveDisplayValue('김뚜루');
        expect(screen.getByPlaceholderText('연락처')).toHaveDisplayValue('010-5237-2189');
      });
    });

    context('주문자 정보와 동일 checkbox 체크가 해제될 경우 ', () => {
      it('주문자 정보 이름과 연락처가 초기화된다', () => {
        orderFormStore.changeField({ ordererName: '김뚜루' });
        orderFormStore.changeField({ ordererPhoneNumber: '010-5237-2189' });

        renderShippingInformation();

        fireEvent.click(screen.getByLabelText('주문자 정보와 동일'));

        expect(screen.getByLabelText('주문자 정보와 동일')).toBeChecked();

        expect(screen.getByPlaceholderText('수령인')).toHaveDisplayValue('김뚜루');
        expect(screen.getByPlaceholderText('연락처')).toHaveDisplayValue('010-5237-2189');

        fireEvent.click(screen.getByLabelText('주문자 정보와 동일'));

        expect(screen.getByPlaceholderText('수령인')).toHaveDisplayValue('');
        expect(screen.getByPlaceholderText('연락처')).toHaveDisplayValue('');
      });
    });
  });

  describe('배송 수령인', () => {
    context('유효한 수령인 이름을 입력했을 경우', () => {
      it('2글자 이상 입력해주세요 에러메시지가 보이지 않는다', () => {
        renderShippingInformation();

        expect(screen.queryByText('3글자 이상 입력해주세요')).toBeFalsy();

        fireEvent.change(screen.getByPlaceholderText('수령인'), {
          target: { value: '김뚜루' },
        });

        expect(screen.queryByText('3글자 이상 입력해 주세요')).toBeFalsy();
      });
    });

    context('수령인 이름을 2글자 미만 입력했을 경우', () => {
      it('2글자 이상 입력해주세요 에러메시지가 보인다', () => {
        renderShippingInformation();

        expect(screen.queryByText('2글자 이상 입력해주세요')).toBeFalsy();

        fireEvent.change(screen.getByPlaceholderText('수령인'), {
          target: { value: '김' },
        });

        expect(screen.getByText('2글자 이상 입력해 주세요'));
      });
    });
  });

  describe('배송 연락처', () => {
    context('유효한 전화번호를 입력했을 경우', () => {
      it('올바른 전화번호를 입력하세요 에러메시지가 보이지 않는다', () => {
        renderShippingInformation();

        expect(screen.queryByText('올바른 전화번호를 입력하세요')).toBeFalsy();

        fireEvent.change(screen.getByPlaceholderText('연락처'), {
          target: { value: '010-5237-2189' },
        });

        expect(screen.queryByText('올바른 전화번호를 입력하세요')).toBeFalsy();
      });
    });

    context('전화번호를 입력하지 않았을 경우', () => {
      it('전화번호를 입력하세요 에러메시지가 보인다', () => {
        renderShippingInformation();

        expect(screen.queryByText('전화번호를 입력하세요')).toBeFalsy();

        fireEvent.change(screen.getByPlaceholderText('연락처'), {
          target: { value: '1' },
        });

        fireEvent.change(screen.getByPlaceholderText('연락처'), {
          target: { value: '' },
        });

        screen.getByText('전화번호를 입력하세요');
      });
    });

    context('유효하지 않은 전화번호를 입력했을 경우', () => {
      it('올바른 전화번호를 입력하세요 에러메시지가 보인다', () => {
        renderShippingInformation();

        expect(screen.queryByText('올바른 전화번호를 입력하세요')).toBeFalsy();

        fireEvent.change(screen.getByPlaceholderText('연락처'), {
          target: { value: '1231234' },
        });

        screen.getByText('올바른 전화번호를 입력하세요');
      });
    });
  });

  describe('우편번호', () => {
    context('유효한 우편번호를 입력했을 경우', () => {
      it('올바른 주소를 입력하세요 에러메시지가 보이지 않는다', () => {
        renderShippingInformation();

        expect(screen.queryByText('올바른 우편번호를 입력하세요')).toBeFalsy();

        fireEvent.change(screen.getByPlaceholderText('우편번호'), {
          target: { value: '623814' },
        });

        expect(screen.queryByText('올바른 우편번호를 입력하세요')).toBeFalsy();
      });
    });

    context('우편번호를 입력하지 않았을 경우', () => {
      it('모든 주소를 입력하세요 에러메시지가 보인다', () => {
        renderShippingInformation();

        expect(screen.queryByText('우편번호를 입력하세요')).toBeFalsy();

        fireEvent.change(screen.getByPlaceholderText('우편번호'), {
          target: { value: '1' },
        });

        fireEvent.change(screen.getByPlaceholderText('우편번호'), {
          target: { value: '' },
        });

        screen.getByText('우편번호를 입력하세요');
      });
    });

    context('올바르지 않은 우편번호를 입력했을 경우', () => {
      it('올바른 주소를 입력하세요 에러메시지가 보인다', () => {
        renderShippingInformation();

        expect(screen.queryByText('올바른 우편번호를 입력하세요')).toBeFalsy();

        fireEvent.change(screen.getByPlaceholderText('우편번호'), {
          target: { value: 'aa11' },
        });

        screen.getByText('올바른 우편번호를 입력하세요');
      });
    });
  });

  describe('주소', () => {
    context('유효한 주소를 입력했을 경우', () => {
      it('올바른 주소를 입력하세요 에러메시지가 보이지 않는다', () => {
        renderShippingInformation();

        expect(screen.queryByText('올바른 주소를 입력하세요')).toBeFalsy();

        fireEvent.change(screen.getByPlaceholderText('주소'), {
          target: { value: '서울시 성동구 상원12길 34' },
        });

        expect(screen.queryByText('올바른 주소를 입력하세요')).toBeFalsy();
      });
    });

    context('주소를 입력하지 않았을 경우', () => {
      it('올바른 주소를 입력하세요 에러메시지가 보이지 않는다', () => {
        renderShippingInformation();

        expect(screen.queryByText('주소를 입력하세요')).toBeFalsy();

        fireEvent.change(screen.getByPlaceholderText('주소'), {
          target: { value: '1' },
        });

        fireEvent.change(screen.getByPlaceholderText('주소'), {
          target: { value: '' },
        });

        screen.getByText('주소를 입력하세요');
      });
    });

    context('유효하지 않은 주소를 입력했을 경우', () => {
      it('올바른 주소를 입력하세요 에러메시지가 보인다', () => {
        renderShippingInformation();

        expect(screen.queryByText('올바른 주소를 입력하세요')).toBeFalsy();

        fireEvent.change(screen.getByPlaceholderText('주소'), {
          target: { value: '이건유효하지않아' },
        });

        screen.getByText('올바른 주소를 입력하세요');
      });
    });
  });

  describe('상세주소', () => {
    context('상세주소를 입력했을 경우', () => {
      it('상세 주소를 입력하세요 에러메시지가 보이지 않는다', () => {
        renderShippingInformation();

        expect(screen.queryByText('상세주소를 입력하세요')).toBeFalsy();

        fireEvent.change(screen.getByPlaceholderText('상세주소'), {
          target: { value: '에이원지식산업센터 614호' },
        });
      });

      expect(screen.queryByText('상세주소를 입력하세요')).toBeFalsy();
    });

    context('상세주소를 입력하지 않았을 경우', () => {
      it('상세 주소를 입력하세요 에러메시지가 보인다', () => {
        renderShippingInformation();

        expect(screen.queryByText('상세주소를 입력하세요')).toBeFalsy();

        fireEvent.change(screen.getByPlaceholderText('상세주소'), {
          target: { value: '11' },
        });

        fireEvent.change(screen.getByPlaceholderText('상세주소'), {
          target: { value: '' },
        });

        screen.getByText('상세주소를 입력하세요');
      });
    });
  });

  describe('배송 메세지', () => {
    context('배송 메세지를 선택했을 경우', () => {
      it('저장된 배송메세지가 선택된다', async () => {
        renderShippingInformation();

        const user = userEvent.setup();

        await user.selectOptions(screen.getByRole('combobox'), '배송 전에 미리 연락 바랍니다.');

        expect(screen.getByRole('option', { name: '배송 전에 미리 연락 바랍니다.' }).selected).toBe(true);
      });
    });
  });

  context('직접 입력을 선택했을 경우', () => {
    it('배송 메세지를 입력할 수 있는 입력란이 보인다', async () => {
      renderShippingInformation();

      const user = userEvent.setup();

      await user.selectOptions(screen.getByRole('combobox'), '직접 입력');

      screen.getByPlaceholderText('배송 메시지를 입력해 주세요');
    });
  });
});
