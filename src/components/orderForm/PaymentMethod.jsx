import { useEffect } from 'react';

import useOrderFromStore from '../../hooks/useOrderFomStore';

import Input from '../ui/Input';
import InputLabel from '../ui/InputLabel';
import SubSection from '../ui/Subsection';
import SubTitle from '../ui/SubTitle';
// TODO 카카오페이 추가해야함
// 은행계좌는 payment 어딘가에서 받아오는 것으로, order에 들어갈 데이터가 아니다

export default function PaymentMethod() {
  const orderFormStore = useOrderFromStore();

  const { fields } = orderFormStore;

  useEffect(() => {
    const paymentMethods = Object.values(
      document.querySelectorAll('.payment-method'),
    );

    const defaultMethod = paymentMethods.find(
      (paymentMethod) => paymentMethod.defaultChecked,
    ).value;

    orderFormStore.changeField({ paymentMethod: defaultMethod });
  }, []);

  return (
    <SubSection>
      <SubTitle>결제수단</SubTitle>
      <InputLabel htmlFor="payment-cash">
        <input
          id="payment-cash"
          className="payment-method"
          type="radio"
          value="CASH"
          name="payment-cash"
          defaultChecked
        />
        <label>무통장입금</label>
      </InputLabel>
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
