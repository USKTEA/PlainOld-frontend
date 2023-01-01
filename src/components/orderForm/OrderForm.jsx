import styled from 'styled-components';
import defaultTheme from '../../styles/defaultTheme';

import OrdererInformation from './OrdererInformation';
import ShippingInformation from './ShippingInformation';
import OrderSummary from './OrderSummary';
import PaymentMethod from './PaymentMethod';
import Agreements from './Agreements';

import OrderItemInformation from './OrderItemInformation';

const Container = styled.div`
  padding: 0 5em;
  height: 150vh;
  width: 100%;
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

export default function OrderForm() {
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
        </RightSection>
      </Wrapper>
    </Container>
  );
}
