import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import { userStore } from '../../stores/user/UserStore';
import MyPageNavigation from './MyPageNavigation';

const context = describe;

const fetchUserOrders = jest.fn();
const fetchCanceledOrders = jest.fn();

jest.mock('../../hooks/useGetOrderStore', () => () => ({
  fetchUserOrders,
  fetchCanceledOrders,
}));

const navigate = jest.fn();
jest.mock('react-router-dom', () => ({
  useNavigate() {
    return navigate;
  },
}));

describe('MyPageNavigation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear('accessToken');
  });

  it('네비게이션 정보를 볼 수 있다', () => {
    render(<MyPageNavigation />);

    screen.getByRole('button', { name: '주문 조회' });
    screen.getByRole('button', { name: '정보 수정' });
    screen.getByRole('button', { name: '회원탈퇴' });
  });

  context('주문 조회 버튼을 클릭했을 경우', () => {
    it('모든 주문내역을 불러온다', async () => {
      localStorage.setItem('accessToken', JSON.stringify('ACCESSTOKEN'));

      render(<MyPageNavigation />);

      fireEvent.click(screen.getByRole('button', { name: '주문 조회' }));

      expect(fetchUserOrders).toBeCalled();

      await waitFor(() => {
        expect(navigate).toBeCalledWith('/mypage');
      });
    });
  });

  context('주문취소 조회 버튼을 클릭했을 경우', () => {
    it('취소된 주문내역을 불러온다', async () => {
      localStorage.setItem('accessToken', JSON.stringify('ACCESSTOKEN'));

      render(<MyPageNavigation />);

      fireEvent.click(screen.getByRole('button', { name: '주문취소 조회' }));

      expect(fetchUserOrders).toBeCalledWith('CANCELED');
    });
  });

  context('정보 수정을 클릭했을 경우', () => {
    it('정보 수정 모달을 볼 수 있다', async () => {
      localStorage.setItem('accessToken', JSON.stringify('ACCESSTOKEN'));
      await userStore.fetchUserInformation();

      render(<MyPageNavigation />);

      fireEvent(screen.getByRole('button', { name: '정보 수정' }));

      screen.getByRole('heading', { name: '정보 수정' });
    });
  });
});
