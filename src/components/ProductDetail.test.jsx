import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { productStore } from '../stores/ProductStore';

import ProductDetail from './ProductDetail';

const context = describe;

describe('ProductDetail', () => {
  const renderProductDetail = () => {
    render((
      <MemoryRouter>
        <ProductDetail />
      </MemoryRouter>));
  };

  context('상품 id가 1인 상품을 선택한 경우', () => {
    it('상품 id가 1인 상품의 정보를 불러온다', async () => {
      await productStore.fetchProduct({ id: 1 });

      renderProductDetail();

      await waitFor(() => {
        screen.getByText('T-shirt');
      });
    });
  });

  context('상품 id가 2인 상품을 선택한 경우', () => {
    it('상품 id가 1인 상품의 정보를 불러온다', async () => {
      await productStore.fetchProduct({ id: 2 });

      renderProductDetail();

      await waitFor(() => {
        screen.getByText('Pants');
      });
    });
  });

  context('상품이 존재하지 않는 경우', () => {
    it('해당 상품은 존재하지 않습니다 메시지가 보인다', async () => {
      await productStore.fetchProduct({ id: 9_999_999 });

      renderProductDetail();

      await waitFor(() => {
        screen.getByText('해당 상품은 존재하지 않습니다');
      });
    });
  });
});
