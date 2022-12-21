import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import ProductsPage from './ProductsPage';

test('ProductsPage', () => {
  render(
    <MemoryRouter>
      <ProductsPage />
    </MemoryRouter>,
  );

  screen.getByText('상품이 존재하지 않습니다');
});
