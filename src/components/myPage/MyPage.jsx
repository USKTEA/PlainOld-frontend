import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import MyPageNavigation from './MyPageNavigation';
import OrderDetail from './OrderDetail';
import OrderHistory from './OrderHistory';
import UserInformation from './UserInformation';

const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  min-width: 70em;
  margin-top: 4em;
  display: flex;
`;

const Wrapper = styled.div`
  width: 80%;
`;

export default function MyPage() {
  const { orderNumber } = useParams();

  return (
    <Container>
      <MyPageNavigation />
      <Wrapper>
        <UserInformation />
        {orderNumber
          ? <OrderDetail />
          : <OrderHistory />}
      </Wrapper>
    </Container>
  );
}
