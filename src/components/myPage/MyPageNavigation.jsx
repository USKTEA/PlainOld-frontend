import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useGetOrderStore from '../../hooks/useGetOrderStore';
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
  const navigate = useNavigate();
  const getOrderStore = useGetOrderStore();

  const handleGetOrders = async () => {
    await getOrderStore.fetchUserOrders();

    navigate('/mypage');
  };

  const handleGetCanceledOrders = async () => {
    await getOrderStore.fetchUserOrders('CANCELED');

    navigate('/mypage');
  };

  return (
    <Container>
      <li>
        <button
          type="button"
          onClick={handleGetOrders}
        >
          주문 조회
        </button>
      </li>
      <li>
        <button
          type="button"
          onClick={handleGetCanceledOrders}
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
