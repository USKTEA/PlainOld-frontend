import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { userStore } from '../../stores/user/UserStore';
import MyPage from './MyPage';

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
    userStore.clear();
  });

  describe('네비게이션바', () => {
    it('네비게시션바를 볼 수 있다', async () => {
      await userStore.fetchUserInformation();

      renderMyPage();

      screen.getByRole('button', { name: '주문 조회' });
      screen.getByRole('button', { name: '주문취소 조회' });
      screen.getByRole('button', { name: '정보 수정' });
      screen.getByRole('button', { name: '회원탈퇴' });
    });
  });

  describe('사용자 정보', () => {
    it('사용자 정보를 볼 수 있다', async () => {
      localStorage.setItem('accessToken', JSON.stringify('ACCESSTOKEN'));

      await userStore.fetchUserInformation();

      renderMyPage();

      screen.getByText(/김뚜루/);
      screen.getByText(/누적 구매금액:/);
    });
  });
});
