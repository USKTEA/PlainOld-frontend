import { render, screen } from '@testing-library/react';
import MyPageNavigation from './MyPageNavigation';

describe('MyPageNavigation', () => {
  it('네비게이션 정보를 볼 수 있다', () => {
    render(<MyPageNavigation />);

    screen.getByRole('button', { name: '주문 조회' });
    screen.getByRole('button', { name: '주문취소 조회' });
    screen.getByRole('button', { name: '정보 수정' });
    screen.getByRole('button', { name: '회원탈퇴' });
  });
});
