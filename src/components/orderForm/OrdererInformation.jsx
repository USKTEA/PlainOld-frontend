import styled from 'styled-components';
import useOrderFromStore from '../../hooks/useOrderFomStore';
import ErrorMessage from '../ui/ErrorMessage';

import Input from '../ui/Input';
import SubSection from '../ui/Subsection';
import SubTitle from '../ui/SubTitle';

const NameAndNumber = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  div {
    width: 49.5%;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function OrdererInformation() {
  const orderFormStore = useOrderFromStore();

  const { fields, errors } = orderFormStore;

  return (
    <SubSection>
      <SubTitle>주문자 정보</SubTitle>
      <NameAndNumber>
        <InputWrapper>
          <Input
            type="text"
            placeholder="이름"
            name="orderer-name"
            value={fields.ordererName}
            error={errors.ordererName}
            onChange={(e) => orderFormStore.changeField(
              { ordererName: e.target.value },
            )}
          />
          {errors.ordererName
            ? <ErrorMessage>{errors.ordererName}</ErrorMessage>
            : null}
        </InputWrapper>
        <InputWrapper>
          <Input
            type="text"
            placeholder="연락처"
            name="phone-number"
            value={fields.ordererPhoneNumber}
            error={errors.ordererPhoneNumber}
            onChange={(e) => orderFormStore.changeField(
              { ordererPhoneNumber: e.target.value },
            )}
          />
          {errors.ordererPhoneNumber
            ? <ErrorMessage>{errors.ordererPhoneNumber}</ErrorMessage>
            : null}
        </InputWrapper>
      </NameAndNumber>
      <Input
        type="text"
        placeholder="이메일"
        name="email"
        value={fields.ordererEmail}
        error={errors.ordererEmail}
        onChange={(e) => orderFormStore.changeField(
          { ordererEmail: e.target.value },
        )}
      />
      {errors.ordererEmail
        ? <ErrorMessage>{errors.ordererEmail}</ErrorMessage>
        : null}
    </SubSection>
  );
}
