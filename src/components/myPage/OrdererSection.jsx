import styled from 'styled-components';
import defaultTheme from '../../styles/defaultTheme';

const Container = styled.div`
  width: 100%;
  margin-top: 3em;
`;

const Title = styled.h3`
  font-size: 1.2em;
  font-weight: 700;
  color: ${defaultTheme.colors.primaryText};
`;

const Wrapper = styled.div`
  font-size: .95em;
  height: 8em;
  width: 100%;
  margin-top: 1em;
  padding: 1.5em;
  border: 1px solid ${defaultTheme.colors.fourth};
  display: flex;
  color: ${defaultTheme.colors.primaryText};
`;

const Header = styled.div`
  font-weight: 300;
  width: 12%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const OrdererInformation = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export default function OrdererSection({ orderer }) {
  return (
    <Container>
      <Title>구매자 정보</Title>
      <Wrapper>
        <Header>
          <span>주문자</span>
          <span>연락처</span>
          <span>이메일</span>
        </Header>
        <OrdererInformation>
          <span>{orderer.name}</span>
          <span>{orderer.phoneNumber}</span>
          <span>{orderer.email}</span>
        </OrdererInformation>
      </Wrapper>
    </Container>
  );
}
