import { render, screen } from '@testing-library/react';

import HomePage from './HomePage';

test('HomePage', () => {
  render(<HomePage />);

  screen.getByRole('heading', { level: 2 });
});
