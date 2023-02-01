import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { categoryStore } from '../../stores/category/CategoryStore';

import Category from './Category';

const context = describe;

describe('Category', () => {
  const renderCategory = () => {
    render((
      <MemoryRouter initialEntries={['/products']}>
        <Category />
      </MemoryRouter>));
  };

  context('카테고리가 없을 경우', () => {
    it('카테고리로 All만 보이게 된다', () => {
      renderCategory();

      screen.getByRole('link', { name: 'All' });
    });
  });

  context('카테고리가 있을 경우', () => {
    it('카테고리 목록이 보인다', async () => {
      await categoryStore.fetchCategories();

      renderCategory();

      screen.getByRole('link', { name: 'All' });
      screen.getByRole('link', { name: 'T-shirts' });
    });
  });
});
