import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import AccountPage from './AccountPage';

describe('AccountPage', () => {
  it('마이페이지를 보여준다', async () => {
    render((
      <MemoryRouter initialEntries={['/account']}>
        <AccountPage />
      </MemoryRouter>
    ));

    await waitFor(() => {
      screen.getByRole('heading', { name: '주문 조회' });
      screen.getByRole('button', { name: '주문 조회' });
      screen.getByRole('button', { name: '주문취소 조회' });
      screen.getByRole('button', { name: '정보 수정' });
      screen.getByText(/누적 구매금액:/);
    });
  });
});
