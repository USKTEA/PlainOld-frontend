import { render, screen } from '@testing-library/react';

import LoginPage from './LoginPage';

test('LoginPage', () => {
  render(<LoginPage />);

  screen.getByText('로그인');
});
