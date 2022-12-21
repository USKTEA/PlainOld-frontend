import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Category from './Category';

describe('Category', () => {
  it('상품 카테고리를 보여준다', () => {
    render(
      <MemoryRouter>
        <Category />
      </MemoryRouter>,
    );

    screen.getByRole('link', { name: 'All' });
    screen.getByRole('link', { name: 'T-shirt' });
  });
});
