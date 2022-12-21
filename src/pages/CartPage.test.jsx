import { render, screen } from '@testing-library/react';

import CartPage from './CartPage';

test('CartPage', () => {
  render(<CartPage />);

  screen.getByRole('heading', { level: 2 });
});
