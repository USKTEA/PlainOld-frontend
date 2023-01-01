import { render, screen, waitFor } from '@testing-library/react';

import { MemoryRouter, Route, Routes } from 'react-router-dom';

import ProductDetailPage from './ProductDetailPage';

const context = describe;

describe('ProductDetailPage', () => {
  context('상품 id가 1일 경우', () => {
    it('id가 1인 상품의 상세정보를 보여준다', async () => {
      render((
        <MemoryRouter initialEntries={['/products/1']}>
          <Routes>
            <Route path="/products/:id" element={<ProductDetailPage />} />
          </Routes>
        </MemoryRouter>));

      await waitFor(() => {
        screen.getByText('T-shirt');
        screen.getByText('배송 방법');
        screen.getByText('배송비');
        screen.getByText('구매하기');
      });
    });
  });

  context('상품 id가 2일 경우', () => {
    it('id가 2인 상품의 상세정보를 보여준다', async () => {
      render((
        <MemoryRouter initialEntries={['/products/2']}>
          <Routes>
            <Route path="/products/:id" element={<ProductDetailPage />} />
          </Routes>
        </MemoryRouter>));

      await waitFor(() => {
        screen.getByText('Pants');
        screen.getByText('배송 방법');
        screen.getByText('배송비');
        screen.getByText('구매하기');
      });
    });
  });
});
