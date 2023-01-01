import styled from 'styled-components';
import { useState } from 'react';

import defaultTheme from '../../styles/defaultTheme';

import useOrderFromStore from '../../hooks/useOrderFomStore';

import ShippingMessage from './ShippingMessage';

import Input from '../ui/Input';
import InputLabel from '../ui/InputLabel';
import SubSection from '../ui/Subsection';
import SubTitle from '../ui/SubTitle';
import ErrorMessage from '../ui/ErrorMessage';

const NameAndNumber = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  input {
    width: 98%;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ZipCode = styled.div`
  display: flex;
  justify-content: space-between;
  width: 49%;

  input {
    width: 96%
  }

  button {
    width: 96%;
  }
`;

const Button = styled.button`
  font-size: 0.8em;
  width: 33%;
  height: 3em;
  border: 1px solid ${defaultTheme.colors.fourth};
  background: ${defaultTheme.colors.background};
  cursor: pointer;
  :hover {
    color: ${defaultTheme.colors.third}
  }
`;

export default function ShippingInformation() {
  const [clicked, setClicked] = useState(false);
  const [message, setMessage] = useState(false);

  const orderFormStore = useOrderFromStore();

  const { fields, errors } = orderFormStore;

  const handleClickCheckBox = () => {
    if (clicked) {
      orderFormStore.clearReceiverInformation();

      setClicked((previous) => !previous);

      return;
    }

    orderFormStore.copyOrdererInformation();

    setClicked((previous) => !previous);
  };

  const handleChangeMessage = (value) => {
    if (value === '직접 입력') {
      orderFormStore.changeField({ shippingMessage: '' });

      setMessage((previous) => !previous);

      return;
    }

    if (message) {
      setMessage((previous) => !previous);
    }

    orderFormStore.changeField({ shippingMessage: value });
  };

  return (
    <SubSection>
      <SubTitle>배송 정보</SubTitle>
      <InputLabel>
        <input
          id="copy-orderer"
          type="checkbox"
          name="copy-orderer-information"
          placeholder="주문자 정보와 동일"
          onClick={() => handleClickCheckBox()}
        />
        <label htmlFor="copy-orderer">주문자 정보와 동일</label>
      </InputLabel>
      <NameAndNumber>
        <InputWrapper>
          <Input
            type="text"
            placeholder="수령인"
            name="receiver-name"
            value={fields.receiverName}
            error={errors.receiverName}
            onChange={(e) => orderFormStore.changeField(
              { receiverName: e.target.value },
            )}
          />
          {errors.receiverName
            ? <ErrorMessage>{errors.receiverName}</ErrorMessage>
            : null}
        </InputWrapper>
        <InputWrapper>
          <Input
            type="text"
            placeholder="연락처"
            name="receiver-phone-number"
            value={fields.receiverPhoneNumber}
            error={errors.receiverPhoneNumber}
            onChange={(e) => orderFormStore.changeField(
              { receiverPhoneNumber: e.target.value },
            )}
          />
          {errors.receiverPhoneNumber
            ? <ErrorMessage>{errors.receiverPhoneNumber}</ErrorMessage>
            : null}
        </InputWrapper>
      </NameAndNumber>
      <ZipCode>
        <InputWrapper>
          <Input
            type="text"
            placeholder="우편번호"
            name="zip-code"
            value={fields.zipCode}
            error={errors.zipCode}
            onChange={(e) => orderFormStore.changeField(
              { zipCode: e.target.value },
            )}
          />
          {errors.zipCode
            ? <ErrorMessage>{errors.zipCode}</ErrorMessage>
            : null}
        </InputWrapper>
        <Button
          type="button"
        >
          주소찾기
        </Button>
      </ZipCode>
      <InputWrapper>
        <Input
          type="text"
          placeholder="주소"
          name="address1"
          value={fields.address1}
          error={errors.address1}
          onChange={(e) => orderFormStore.changeField(
            { address1: e.target.value },
          )}
        />
        {errors.address1
          ? <ErrorMessage>{errors.address1}</ErrorMessage>
          : null}
      </InputWrapper>
      <Input
        type="text"
        placeholder="상세주소"
        name="address2"
        value={fields.address2}
        error={errors.address2}
        onChange={(e) => orderFormStore.changeField(
          { address2: e.target.value },
        )}
      />
      {errors.address2
        ? <ErrorMessage>{errors.address2}</ErrorMessage>
        : null}
      <ShippingMessage handleChange={handleChangeMessage} />
      {message
        ? (
          <Input
            type="text"
            placeholder="배송 메시지를 입력해 주세요"
            name="shipping-message"
            value={fields.shippingMessage}
            onChange={(e) => orderFormStore.changeField(
              { shippingMessage: e.target.value },
            )}
          />
        )
        : null}
    </SubSection>
  );
}
