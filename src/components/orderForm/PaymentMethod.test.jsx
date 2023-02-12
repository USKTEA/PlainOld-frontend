import { fireEvent, render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import { orderFormStore } from '../../stores/order/OrderFormStore';

import PaymentMethod from './PaymentMethod';

import defaultTheme from '../../styles/defaultTheme';

const context = describe;

describe('PaymentMethod', () => {
  const renderPaymentMethod = () => {
    render((
      <ThemeProvider theme={defaultTheme}>
        <PaymentMethod />
      </ThemeProvider>
    ));
  };

  beforeEach(() => {
    orderFormStore.reset();
  });

  it('결제수단으로 무통장입금이 초기값으로 체크되어 있다', () => {
    renderPaymentMethod();

    expect(screen.getByLabelText('무통장입금').checked).toBe(true);
  });

  describe('무통장입금', () => {
    context('무통장입금 주문자명을 변경할 경우', () => {
      it('입력된 이름으로 무통자입금 주문자명을 변경한다', () => {
        renderPaymentMethod();

        fireEvent.change(screen.getByPlaceholderText('입금자명 (미입력시 주문자명)'), {
          target: {
            value: '김뚜루',
          },
        });

        screen.getByDisplayValue('김뚜루');
      });
    });
  });

  describe('카카오페이', () => {
    context('카카오페이를 클릭했을 경우', () => {
      it('결제방식이 카카오페이로 변경된다', () => {
        renderPaymentMethod();

        fireEvent.click(screen.getByLabelText('카카오페이'));

        expect(screen.getByLabelText('카카오페이')).toBeChecked();
      });
    });
  });
});
