import styled from 'styled-components';
import defaultTheme from '../../styles/defaultTheme';

import OrdererInformation from './OrdererInformation';
import ShippingInformation from './ShippingInformation';
import OrderSummary from './OrderSummary';
import PaymentMethod from './PaymentMethod';
import Agreements from './Agreements';

import OrderItemInformation from './OrderItemInformation';
import useOrderFromStore from '../../hooks/useOrderFomStore';

const Container = styled.div`
  padding: 0 5em;
  width: 100%;
  min-width: 1300px;
  max-width: 1400px;
  background: ${defaultTheme.colors.background};
`;

const Title = styled.h1`
  display: flex;
  height: 4.5em;
  font-size: 1.5em;
  font-weight: 700;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
`;

const LeftSection = styled.div`
  width: 70%;
`;

const RightSection = styled.div`
  width: 30%;
`;

const Auto = styled.button`
  margin-left: 1em;
  height: 3em;
  border:none;
  background-color: tomato;
  color: white;
  cursor: pointer;
`;

export default function OrderForm() {
  const orderFormStore = useOrderFromStore();

  const handleAutoFill = () => {
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
  };

  return (
    <Container>
      <Title>결제하기</Title>
      <Wrapper>
        <LeftSection>
          <OrderItemInformation />
          <OrdererInformation />
          <ShippingInformation />
        </LeftSection>
        <RightSection>
          <OrderSummary />
          <PaymentMethod />
          <Agreements />
          <Auto
            type="button"
            onClick={handleAutoFill}
          >
            자동완성
          </Auto>
        </RightSection>

      </Wrapper>

    </Container>
  );
}
