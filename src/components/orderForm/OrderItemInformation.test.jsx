import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { orderItemStore } from '../../stores/order/OrderItemStore';

import OrderItemInformation from './OrderItemInformation';

const context = describe;

describe('OrderItemInformation', () => {
  const renderOrderItemInformation = () => {
    render((
      <MemoryRouter>
        <OrderItemInformation />
      </MemoryRouter>
    ));
  };

  beforeEach(() => {
    orderItemStore.reset();
  });

  context('OrderItem이 있을 경우', () => {
    it('Item 목록을 보여준다', () => {
      const product1 = {
        id: 1,
        name: 'T-Shirt',
        price: 10000,
        description: {
          productDetail: 'Very Good', productSummary: 'Good',
        },
        image: {
          thumbnailUrl: 'http://url.com',
          productImageUrls: ['http://url.com'],
        },
        shipping: {
          shippingMethod: '택배',
          shippingFee: 2500,
          freeShippingAmount: 50000,
        },
        status: 'ON_SALE',
        categoryId: 1,
      };

      const product2 = {
        id: 2,
        name: 'Pants',
        price: 10000,
        description: { productDetail: 'Very Good', productSummary: 'Good' },
        image: {
          thumbnailUrl: 'http://url.com',
          productImageUrls: ['http://url.com'],
        },
        shipping: {
          shippingMethod: '택배',
          shippingFee: 2500,
          freeShippingAmount: 50000,
        },
        status: 'ON_SALE',
        categoryId: 2,
      };

      orderItemStore.addOrderItem({ product: product1 });
      orderItemStore.addOrderItem({ product: product2 });

      renderOrderItemInformation();

      screen.getByText('T-Shirt');
      screen.getByText('Pants');
    });
  });

  context('Option이 있을 경우', () => {
    it('선택한 상품 옵션이 보인다', () => {
      const product = {
        id: 1,
        name: 'T-Shirt',
        price: 10000,
        description: {
          productDetail: 'Very Good', productSummary: 'Good',
        },
        image: {
          thumbnailUrl: 'http://url.com',
          productImageUrls: ['http://url.com'],
        },
        shipping: {
          shippingMethod: '택배',
          shippingFee: 2500,
          freeShippingAmount: 50000,
        },
        status: 'ON_SALE',
        categoryId: 1,
        optionData: {
          colors: [
            {
              name: 'Gray', red: 120, green: 120, blue: 120,
            },
            {
              name: 'Black', red: 0, green: 0, blue: 0,
            },
            {
              name: 'White', red: 255, green: 255, blue: 255,
            },
          ],
          sizes: ['XL', 'L', 'M'],
        },
      };

      orderItemStore.setProductToChoiceOption({ product });

      orderItemStore.setOption({ option: 'size', value: 'M' });
      orderItemStore.setOption({ option: 'color', value: 'red' });

      renderOrderItemInformation();

      screen.getByText(/M/);
      screen.getByText(/red/);
    });
  });
});
