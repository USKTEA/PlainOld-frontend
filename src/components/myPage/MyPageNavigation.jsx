import styled from 'styled-components';
import defaultTheme from '../../styles/defaultTheme';

const Container = styled.div`
  width: 20%;
  margin-left: 1em;

  button {
    font-weight: 300;
    font-size: 1.1em;
    border: none;
    margin-bottom: .3em;
    color: ${defaultTheme.colors.primaryText};
    background-color: white;
    cursor: pointer;
  }
`;

export default function MyPageNavigation() {
  return (
    <Container>
      <li>
        <button
          type="button"
        >
          주문 조회
        </button>
      </li>
      <li>
        <button
          type="button"
        >
          주문취소 조회
        </button>
      </li>
      <li>
        <button
          type="button"
        >
          정보 수정
        </button>
      </li>
      <li>
        <button
          type="button"
        >
          회원탈퇴
        </button>
      </li>
    </Container>
  );
}
