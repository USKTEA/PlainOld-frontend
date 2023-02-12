import styled from 'styled-components';
import defaultTheme from '../styles/defaultTheme';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 2em 5em;
  height: 100vh;
  width: 100%;
  max-width: 1400px;
  background: ${defaultTheme.colors.background};
`;

const Wrapper = styled.div`
  width: 35%;
`;

const Title = styled.h1`
  display: flex;
  height: 3em;
  font-size: 1.3em;
  justify-content: center;
  align-items: center;
`;

const Message = styled.div`
  margin-bottom: 2em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    margin-bottom: .3em;
    font-weight: 600;
    color: ${defaultTheme.colors.fifth};
  }
`;

export default function OrderCancelPage() {
  return (
    <Container>
      <Wrapper>
        <Title>주문취소</Title>
        <Message>
          <p>
            주문이 정상적으로 취소되었습니다.
          </p>
        </Message>
      </Wrapper>
    </Container>
  );
}
