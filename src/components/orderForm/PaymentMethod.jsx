import { useEffect } from 'react';
import styled from 'styled-components';

import useOrderFromStore from '../../hooks/useOrderFomStore';

import Input from '../ui/Input';
import InputLabel from '../ui/InputLabel';
import SubSection from '../ui/Subsection';
import SubTitle from '../ui/SubTitle';
// TODO 카카오페이 추가해야함
// 은행계좌는 payment 어딘가에서 받아오는 것으로, order에 들어갈 데이터가 아니다

const PaymentMethodContainer = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;

  img {
    margin-left: .2em;
  }
`;

export default function PaymentMethod() {
  const orderFormStore = useOrderFromStore();

  const { fields } = orderFormStore;

  const handleSelectPayment = (method) => {
    orderFormStore.changeField({ paymentMethod: method });
  };

  useEffect(() => {
    orderFormStore.changeField({ paymentMethod: 'CASH' });
  }, []);

  return (
    <SubSection>
      <SubTitle>결제수단</SubTitle>
      <PaymentMethodContainer>
        <InputLabel
          htmlFor="payment-cash"
          onClick={() => handleSelectPayment('CASH')}
        >
          <input
            id="payment-cash"
            className="payment-method"
            type="radio"
            value="CASH"
            name="payment-method"
            checked={fields.paymentMethod === 'CASH'}
            onChange={() => handleSelectPayment('CASH')}
          />
          <label>무통장입금</label>
        </InputLabel>
        <InputLabel
          htmlFor="payment-kakao-pay"
          onClick={() => handleSelectPayment('KAKAOPAY')}
        >
          <input
            id="payment-kakao-pay"
            className="payment-kakao-pay"
            type="radio"
            value="KAKAOPAY"
            checked={fields.paymentMethod === 'KAKAOPAY'}
            onChange={() => handleSelectPayment('KAKAOPAY')}
            name="payment-method"
          />
          <label>
            카카오페이
          </label>
          <img
            src="/assets/images/kakao-pay.png"
            alt="kakao-pay"
            height={25}
            width={60}
          />
        </InputLabel>
      </PaymentMethodContainer>
      {fields.paymentMethod === 'CASH'
        ? (
          <>
            <Input
              id="payment-account"
              type="text"
              value="우리은행 1005-003-623814 김뚜루"
              name="payment-account"
              readOnly
            />
            <Input
              id="payer-name"
              type="text"
              placeholder="입금자명 (미입력시 주문자명)"
              name="payer-name"
              value={fields.payer}
              onChange={(e) => orderFormStore.changeField(
                { payer: e.target.value },
              )}
            />
          </>
        )
        : null}
    </SubSection>
  );
}
