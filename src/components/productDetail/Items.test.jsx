import { fireEvent, render, screen } from '@testing-library/react';

import { orderItemStore } from '../../stores/OrderItemStore';

import Items from './Items';

const context = describe;

describe('Items', () => {
  const setItemHasOption = () => {
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
  };

  const addItemWithoutOption = () => {
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
    };

    orderItemStore.addOrderItem({ product });
  };

  beforeEach(() => {
    orderItemStore.reset();
  });

  context('Option이 있는 상품일 경우', () => {
    it('선택한 Option을 볼 수 있다', () => {
      setItemHasOption();
      orderItemStore.setOption({ option: 'size', value: 'XL' });
      orderItemStore.setOption({ option: 'color', value: 'Black' });

      render(<Items />);

      screen.getByText(/Black/);
      screen.getByText(/XL/);
    });

    it('선택한 옵션을 취소할 수 있다', () => {
      setItemHasOption();
      orderItemStore.setOption({ option: 'size', value: 'XL' });
      orderItemStore.setOption({ option: 'color', value: 'Black' });

      render(<Items />);

      screen.getByText(/Black/);
      screen.getByText(/XL/);

      fireEvent.click(screen.getByRole('button', { name: 'X' }));

      expect(screen.queryByText(/Black/)).toBeFalsy();
      expect(screen.queryByText(/XL/)).toBeFalsy();
    });
  });

  context('Option이 없는 상품일 경우', () => {
    it('주문하고자 하는 수량을 볼 수 있다', () => {
      addItemWithoutOption();

      render(<Items />);

      screen.getByText('수량');
    });
  });
});
