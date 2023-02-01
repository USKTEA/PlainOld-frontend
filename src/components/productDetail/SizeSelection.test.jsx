import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { orderItemStore } from '../../stores/order/OrderItemStore';

import SizeSelection from './SizeSelection';

const context = describe;

describe('SizeSelection', () => {
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

  context('처음 렌더링 됐을 경우', () => {
    it('기본 값을 렌더링한다', () => {
      render((
        <SizeSelection />
      ));

      expect(screen.getByRole('option', { name: 'Size' }).selected)
        .toBe(true);
    });
  });

  context('Option을 선택했을 경우', () => {
    it('선택한 옵션이 보이고 option의 값을 저장한다', async () => {
      render((
        <SizeSelection />
      ));

      const user = userEvent.setup();

      await user.selectOptions(screen.getByRole('combobox'), 'M');

      expect(screen.getByRole('option', { name: 'M' }).selected).toBe(true);

      expect(orderItemStore.option.size).toBe('M');
    });

    it('기본 값은 보이지 않게 된다', async () => {
      render((
        <SizeSelection />
      ));

      const user = userEvent.setup();

      await user.selectOptions(screen.getByRole('combobox'), 'M');

      expect(screen.queryByRole('option', { name: 'Size' })).toBeFalsy();
    });
  });
});
