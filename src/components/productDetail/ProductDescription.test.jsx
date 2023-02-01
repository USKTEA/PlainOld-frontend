import { render, screen } from '@testing-library/react';

import { productStore } from '../../stores/product/ProductStore';

import ProductDescription from './ProductDescription';

describe('ProductDescription', () => {
  it('상품 정보를 보여준다', async () => {
    const id = 1;

    await productStore.fetchProduct({ id });

    render(<ProductDescription />);

    screen.getByText('T-shirt');
    screen.getByText('배송 방법');
    screen.getByText('배송비');
  });
});
