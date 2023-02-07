import styled from 'styled-components';
import useUserStore from '../../hooks/useUserStore';
import numberFormat from '../../utils/numberFormat';

const Container = styled.div`
  height: 6em;
  min-width: 13em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: space-between;

  span {
    width: 100%;
    letter-spacing: 2px;
  }

  strong {
    font-size: 1.5em;
    margin-bottom: .2em;
  }
`;

export default function UserInformation() {
  const { nickname, purchaseAmount } = useUserStore();

  return (
    <Container>
      <strong>{`${nickname} 님 안녕하세요.`}</strong>
      <span>{`누적 구매금액: ${numberFormat(purchaseAmount)}원`}</span>
    </Container>
  );
}
