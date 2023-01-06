import { render, screen } from '@testing-library/react';
import { orderItemStore } from '../../stores/OrderItemStore';
import ColorSelection from './ColorSelection';

const context = describe;

describe('ColorSelection', () => {
  beforeEach(() => {
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

    orderItemStore.reset();
    orderItemStore.setProductToChoiceOption({ product });
  });

  context('Size 옵션을 선택하지 않았을 경우', () => {
    it('Color 옵션을 볼 수 없다', () => {
      render(<ColorSelection />);

      expect(orderItemStore.option.size).toBeFalsy();

      screen.getByText('사이즈 옵션을 선택해주세요.');
    });
  });

  context('Size 옵션을 선택했을 경우', () => {
    it('Color 옵션을 볼 수 있다', () => {
      orderItemStore.setOption({ option: 'size', value: 'M' });

      const { container } = render(<ColorSelection />);

      expect(screen.queryByText('사이즈 옵션을 선택해주세요.')).toBeFalsy();

      expect(container.getElementsByClassName('color')).toHaveLength(3);
    });
  });

  context('Color 옵션을 선택했을 경우', () => {
    it('OrderItems에 item이 추가되고 Color 옵션이 보이지 않는다', () => {
      expect(orderItemStore.orderItems.items.length).toBe(0);

      orderItemStore.setOption({ option: 'size', value: 'M' });
      orderItemStore.setOption({ option: 'color', value: 'red' });

      const { container } = render(<ColorSelection />);

      expect(orderItemStore.orderItems.items.length).toBe(1);

      screen.getByText('사이즈 옵션을 선택해주세요.');

      expect(container.getElementsByClassName('color')).toHaveLength(0);
    });
  });
});
