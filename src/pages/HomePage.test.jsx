import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import HomePage from './HomePage';

test('HomePage', () => {
  render((
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>));

  screen.getByRole('heading', { level: 2 });
});
