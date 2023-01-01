import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import AccountPage from './AccountPage';

test('AccountPage', () => {
  render((
    <MemoryRouter initialEntries={['/account']}>
      <AccountPage />
    </MemoryRouter>
  ));

  screen.getByText('주문 조회');
  screen.getByText(/누적 구매금액:/);
});
