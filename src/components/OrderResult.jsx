import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useCreateOrderStore from '../hooks/useCreateOrderStore';
import defaultTheme from '../styles/defaultTheme';
import numberFormat from '../utils/numberFormat';

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

const Table = styled.table`
  width: 100%;
  font-size: 1em;
  background-color: white;

  span {
    display: block;
    margin-bottom: .2em;
  }

  th, td {
    font-size: .8em;
    text-align: left;
    padding: 1.2em 0 1em 1.2em;
  }
  th{
    color: ${defaultTheme.colors.third};
  }
  tr {
    height: 2em;
    border-bottom: 1px solid ${defaultTheme.colors.fourth};
  }
  tr:last-child {
    border-bottom: none;
  }
  strong {
    font-weight: 700;
    color: ${defaultTheme.colors.primaryText};
    }
`;

const HomeButton = styled(Link)`
 font-size: 0.8em;
  width: 100%;
  height: 3em;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${defaultTheme.colors.secondary};
  color: white;
  cursor: pointer;
  :hover {
    background-color: ${defaultTheme.colors.primaryText}
  }
`;

export default function OrderResult() {
  const navigate = useNavigate();

  const createOrderStore = useCreateOrderStore();

  const { result, processing } = createOrderStore;

  useEffect(() => {
    if (!result) {
      navigate('/error');
    }
  }, []);

  if (processing) {
    return <Message>now loading...</Message>;
  }

  if (!result) {
    return <Message>잘못된 접근입니다</Message>;
  }

  return (
    <Container>
      <Wrapper>
        <Title>주문완료</Title>
        <Message>
          <p>아래 계좌정보로 입금해 주시면</p>
          <p>
            결제 완료처리가 됩니다
          </p>
        </Message>
        <Table>
          <tbody>
            <tr>
              <th>입금계좌 안내</th>
              <td>
                <span>
                  우리은행
                </span>
                <span>
                  1005-003-623814
                </span>
                <span>
                  김뚜루
                </span>
                <strong>
                  {`${numberFormat(result.cost)}원`}
                </strong>
                <br />
              </td>
            </tr>
            <tr>
              <th>주문번호</th>
              <td>
                <strong>
                  {result.orderNumber}
                </strong>
              </td>
            </tr>
            <tr>
              <th>배송지</th>
              <td>
                <span>
                  {result.receiver.name}
                </span>
                <span>
                  {result.receiver.phoneNumber}
                </span>
                <span>
                  {result.shippingAddress.address1}
                </span>
                <span>
                  {result.shippingAddress.address2}
                </span>
                <span>
                  {`(${result.shippingAddress.zipCode})`}
                </span>
              </td>
            </tr>
          </tbody>
        </Table>
        <div>
          <HomeButton to="/">홈으로</HomeButton>
        </div>
      </Wrapper>
    </Container>
  );
}
