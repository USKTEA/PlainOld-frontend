import styled from 'styled-components';
import useGetOrderStore from '../../hooks/useGetOrderStore';
import defaultTheme from '../../styles/defaultTheme';
import Histories from './Histories';

const Container = styled.div`
  margin-top: 4em;
`;

const Wrapper = styled.div`
  display: flex;
`;

const Title = styled.h3`
  font-size: 1.3em;
  font-weight: 700;
  color: ${defaultTheme.colors.primaryText};
`;

const ErrorMessage = styled.span`
  font-size: .9em;
  margin-left: 1em;
  display: flex;
  align-items: center;
  color: red;
`;

const Message = styled.p`
  font-size: 1.1em;
  height: 10em;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${defaultTheme.colors.fourthText};
`;

export default function OrderHistory() {
  const getOrderStore = useGetOrderStore();
  const { orders, errors } = getOrderStore;

  if (!orders) {
    return <Message>now loading...</Message>;
  }

  return (
    <Container>
      <Wrapper>
        <Title>주문 조회</Title>
        {errors.orderDetail
          ? <ErrorMessage>{errors.orderDetail}</ErrorMessage>
          : null}
      </Wrapper>
      {orders.length
        ? (
          <Histories orders={orders} />
        )
        : <Message>주문 내역이 없습니다.</Message> }
    </Container>
  );
}
