import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { getOrderStore } from '../../stores/order/GetOrderStore';
import { getUserStore } from '../../stores/user/GetUserStore';
import MyPage from './MyPage';

const context = describe;

describe('MyPage', () => {
  const renderMyPage = () => {
    render(
      <MemoryRouter>
        <MyPage />
      </MemoryRouter>,
    );
  };

  beforeEach(() => {
    localStorage.removeItem('accessToken');
    getUserStore.clear();
    getOrderStore.clear();
  });

  describe('네비게이션바', () => {
    it('네비게시션바를 볼 수 있다', async () => {
      await getUserStore.fetchUserInformation();

      renderMyPage();

      screen.getByRole('button', { name: '주문 조회' });
      screen.getByRole('button', { name: '주문취소 조회' });
      screen.getByRole('button', { name: '정보 수정' });
    });
  });

  describe('사용자 정보', () => {
    it('사용자 정보를 볼 수 있다', async () => {
      localStorage.setItem('accessToken', JSON.stringify('ACCESSTOKEN'));

      await getUserStore.fetchUserInformation();

      renderMyPage();

      screen.getByText(/김뚜루/);
      screen.getByText(/누적 구매금액:/);
    });
  });

  describe('주문 취소', () => {
    context('취소 버튼을 클릭했을 경우', () => {
      it('주문 취소 모달을 볼 수 있다', async () => {
        localStorage.setItem('accessToken', JSON.stringify('ACCESSTOKEN'));

        await getUserStore.fetchUserInformation();
        await getOrderStore.fetchUserOrders();

        renderMyPage();

        fireEvent.click(screen.getByRole('button', { name: '취소' }));

        screen.getByText('주문 취소');
      });
    });
  });

  describe('취소 상세', () => {
    context('취소 상세 버튼을 클릭했을 경우', () => {
      it('취소 상세 정보를 볼 수 있다', async () => {
        localStorage.setItem('accessToken', JSON.stringify('HAVEONECANCELED'));

        await getUserStore.fetchUserInformation();
        await getOrderStore.fetchUserOrders();

        renderMyPage();

        fireEvent.click(screen.getByRole('button', { name: '취소상세' }));

        await waitFor(() => {
          screen.getByText('취소 상세정보');
        });
      });
    });
  });
});
