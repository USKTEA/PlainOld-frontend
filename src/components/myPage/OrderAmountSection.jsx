import styled from 'styled-components';
import defaultTheme from '../../styles/defaultTheme';
import numberFormat from '../../utils/numberFormat';

const Container = styled.div`
  width: 100%;
  margin-top: 3em;
  padding-bottom: 2em;
  color: ${defaultTheme.colors.primaryText};
`;

const Title = styled.h3`
  font-size: 1.2em;
  font-weight: 700;
`;

const Wrapper = styled.div`
  width: 100%;
  margin-top: 1em;
  border: 1px solid ${defaultTheme.colors.fourth};
  display: flex;
  flex-direction: column;
`;

const OrderAmount = styled.div`
  height: 4em;
  padding: 1.5em;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${defaultTheme.colors.fourth};
`;

const Icon = styled.div`
  font-size: 1.5em;
  margin-left: 1em;
  margin-right: 1em;
`;

const Price = styled.div`
  width: 30%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  span {
    font-size: .9em;
    font-weight: 700;
  }

  strong {
    font-size: 1.5em;
    font-weight: 700;
  }
`;

const PaymentWrapper = styled.div`
  display: flex;
`;

const FirstBlank = styled.div`
  width: 33.5%;
  border-right: 1px solid ${defaultTheme.colors.fourth};
`;

const Blank = styled.div`
  width: 33.5%;
`;

const Payment = styled.div`
  height: 100%;
  width: 33%;
  padding: 1.5em;
  border-left: 1px solid ${defaultTheme.colors.fourth};
`;

const Cash = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  strong {
    font-size: 1em;
    font-weight: 700;
    margin-bottom: .5em;
  }

  span {
    font-size: .9em;
    font-weight: 300;
    margin-bottom: .2em;
  }
`;

export default function OrderAmountSection({ cost, shippingFee, payment }) {
  return (
    <Container>
      <Title>주문 금액 상세</Title>
      <Wrapper>
        <OrderAmount>
          <Price>
            <span>주문금액</span>
            <strong>{`${numberFormat(cost - shippingFee)}원`}</strong>
          </Price>
          <Icon>+</Icon>
          <Price>
            <span>배송비</span>
            <strong>
              {shippingFee
                ? `${numberFormat(shippingFee)}원`
                : '무료'}
            </strong>
          </Price>
          <Icon>=</Icon>
          <Price>
            <span>총 주문금액</span>
            <strong>
              {`${numberFormat(cost)}원`}
            </strong>
          </Price>
        </OrderAmount>
        <PaymentWrapper>
          <FirstBlank />
          <Blank />
          <Payment>
            {payment === 'CASH'
              ? (
                <Cash>
                  <strong>무통장입금</strong>
                  <span>우리은행 1005-801-174817</span>
                  <span>예금주 김뚜루</span>
                </Cash>
              )
              : <span>카카오페이</span> }
          </Payment>
        </PaymentWrapper>
      </Wrapper>
    </Container>
  );
}
