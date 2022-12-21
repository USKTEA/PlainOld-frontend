import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import ProductsPage from './ProductsPage';

test('ProductsPage', async () => {
  render(
    <MemoryRouter>
      <ProductsPage />
    </MemoryRouter>,
  );

  await waitFor(() => {
    screen.getByText('All');
    screen.getByText('T-shirts');
  });
});
