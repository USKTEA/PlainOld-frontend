import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useGetOrderStore from '../../hooks/useGetOrderStore';

import defaultTheme from '../../styles/defaultTheme';
import OrderAmountSection from './OrderAmountSection';
import OrdererSection from './OrdererSection';
import OrderLineSection from './OrderLineSection';
import ShippingSection from './ShippingSection';

const Container = styled.div`
  width: 100%;
`;

const TitleWrapper = styled.div`
  display: flex;
  margin-bottom: 1em;
  color: ${defaultTheme.colors.primaryText};

  h3 {
    font-size: 1.3em;
    font-weight: 700;
    display: flex;
    align-items: center;
  }

  button {
    font-size: 1.5em;
    height: 1.5em;
    margin-right: 1em;
    border: none;
    display: flex;
    align-items: flex-start;
    color: ${defaultTheme.colors.primaryText};
    background-color: white;
    cursor: pointer;
  }
`;

const OrderSummary = styled.div`
  font-size: .95em;
  height: 3.5em;
  width: 100%;
  margin-bottom: .5em;
  padding: 1em;
  display: flex;
  align-items: center;
  border: 1px solid ${defaultTheme.colors.fourth};

  span {
    font-weight: 300;
    margin-right: 1em;
    color: ${defaultTheme.colors.primaryText};
  }

  strong {
    font-weight: 700;
    margin-right: 1.5em;
    color: ${defaultTheme.colors.primaryText};
  }
`;

export default function OrderDetail() {
  const { order } = useGetOrderStore();
  const navigate = useNavigate();

  const toDate = (time) => time.split(' ')[0];

  const handleClickGoBack = () => {
    navigate('/mypage');
  };

  if (!order) {
    return <p>now loading...</p>;
  }

  return (
    <Container>
      <TitleWrapper>
        <button
          type="button"
          onClick={handleClickGoBack}
        >
          ←
        </button>
        <h3>주문 상세 내역</h3>
      </TitleWrapper>
      <OrderSummary>
        <span>주문일자</span>
        <strong>{toDate(order.createdAt)}</strong>
        <span>주문번호</span>
        <strong>{order.orderNumber}</strong>
      </OrderSummary>
      <OrderLineSection
        orderLines={order.orderLines}
        shippingFee={order.shippingFee}
        status={order.status}
      />
      <OrdererSection orderer={order.orderer} />
      <ShippingSection
        orderNumber={order.orderNumber}
        shippingInformation={order.shippingInformation}
        status={order.status}

      />
      <OrderAmountSection
        cost={order.cost}
        shippingFee={order.shippingFee}
        payment={order.payment}
      />
    </Container>
  );
}
