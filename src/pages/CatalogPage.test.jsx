import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import CatalogPage from './CatalogPage';

test('ProductsPage', async () => {
  render(
    <MemoryRouter>
      <CatalogPage />
    </MemoryRouter>,
  );

  await waitFor(() => {
    screen.getByText('All');
    screen.getByText('T-shirts');
    screen.getByText('T-shirt');
    screen.getByText('10,000원');
  });
});
