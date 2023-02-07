import { fireEvent, render, screen } from '@testing-library/react';
import { getOrderStore } from '../../stores/order/GetOrderStore';
import OrderDetail from './OrderDetail';

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate() {
    return navigate;
  },
}));

const context = describe;

describe('OrderDetail', () => {
  beforeEach(() => {
    getOrderStore.clear();
  });

  it('주문 상세 내역을 볼 수 있다', async () => {
    const orderNumber = 'tjrxo1234-11111111';

    await getOrderStore.fetchOrder({ orderNumber });

    render(<OrderDetail />);

    screen.getByText('주문 상세 내역');
    screen.getByText('주문일자');
    screen.getByText('주문번호');
    screen.getByText('상품 정보');
    screen.getByText('진행상태');
    screen.getByText('구매자 정보');
    screen.getByText('배송지 정보');
    screen.getByText('주문 금액 상세');
  });

  context('뒤로가기 버튼을 클릭했을 경우', () => {
    it('마이페이지로 돌아간다', async () => {
      const orderNumber = 'tjrxo1234-11111111';

      await getOrderStore.fetchOrder({ orderNumber });

      render(<OrderDetail />);

      fireEvent.click(screen.getByRole('button', { name: '←' }));

      expect(navigate).toBeCalledWith('/mypage');
    });
  });
});
