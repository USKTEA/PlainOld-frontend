import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import Histories from './Histories';

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate() {
    return navigate;
  },
}));

describe('Histories', () => {
  const renderHistories = () => {
    const orders = [
      {
        orderNumber: 'tjrxo1234-11111111',
        orderLines: [
          {
            productName: 'T-shirt',
            thumbnailUrl: '1',
            option: {
              color: 'Black',
              size: 'XL',
            },
            quantity: 1,
            totalPrice: 10_000,
          },
        ],
        status: '입금대기',
        createdAt: '2022-01-15 12:45',
      }];

    render(<Histories orders={orders} />);
  };

  it('내역을 보여준다', () => {
    renderHistories();

    screen.getByText(/주문번호/);
    screen.getByText('T-shirt');
    screen.getByText(/10,000원/);
    screen.getByText(/1 개/);
    screen.getByText('XL / Black');
    screen.getByText('입금대기');
    screen.getByText('주문일자 2022-01-15');
  });

  describe('주문을 클릭했을 경우', () => {
    it('주문의 상세내역 페이지로 이동한다', async () => {
      renderHistories();

      fireEvent.click(screen.getByRole('button', { name: /주문번호/ }));

      await waitFor(() => {
        expect(navigate).toBeCalledWith('order/tjrxo1234-11111111');
      });
    });
  });
});
