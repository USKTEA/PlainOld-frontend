import {
  render, screen, fireEvent, waitFor,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import OrderItem from '../models/OrderItem';
import { orderItemStore } from '../stores/OrderItemStore';
import { productStore } from '../stores/ProductStore';

import ProductDetail from './ProductDetail';

const context = describe;

describe('ProductDetail', () => {
  const renderProductDetail = (id) => {
    render((
      <MemoryRouter initialEntries={[`/product/${id}`]}>
        <ProductDetail />
      </MemoryRouter>));
  };

  beforeEach(() => {
    productStore.clear();
    orderItemStore.reset();
  });

  context('구매하기 버튼을 누를 경우', () => {
    it('해당 상품의 주문 정보가 보이는 결제화면으로 이동한다', async () => {
      const id = 1;

      await productStore.fetchProduct({ id });

      renderProductDetail(id);

      expect(screen.getByText('구매하기').closest('a'))
        .toHaveAttribute('href', '/order');
    });
  });

  context('상품 id가 1인 상품을 선택한 경우', () => {
    it('상품 id가 1인 상품의 정보를 불러온다', async () => {
      const id = 1;

      await productStore.fetchProduct({ id });

      renderProductDetail(id);

      await waitFor(() => {
        screen.getByText('T-shirt');
      });
    });
  });

  context('상품 id가 2인 상품을 선택한 경우', () => {
    it('상품 id가 1인 상품의 정보를 불러온다', async () => {
      const id = 2;

      await productStore.fetchProduct({ id });

      renderProductDetail(id);

      await waitFor(() => {
        screen.getByText('Pants');
      });
    });
  });

  context('상품이 존재하지 않는 경우', () => {
    it('해당 상품은 존재하지 않습니다 메시지가 보인다', async () => {
      const id = 9_999_999;

      await productStore.fetchProduct({ id });

      renderProductDetail(id);

      await waitFor(() => {
        screen.getByText('해당 상품은 존재하지 않습니다');
      });
    });
  });

  describe('상품 수량을 변경시킬 경우', () => {
    context('상품 수량을 증가시킬 경우', () => {
      it('주문하는 상품의 수량이 증가하는 것을 볼 수 있다', async () => {
        const id = 1;

        await productStore.fetchProduct({ id });

        const { product } = productStore;

        const {
          name, price, image, shipping,
        } = product;

        const orderItem = new OrderItem({
          id: 1,
          productId: product.id,
          price,
          name,
          thumbnailUrl: image.thumbnailUrl,
          shippingFee: shipping.shippingFee,
          freeShippingAmount: shipping.freeShippingAmount,
        });

        orderItemStore.addOrderItem(orderItem);

        renderProductDetail(id);

        await waitFor(() => {
          screen.getByText('총 상품금액(1개)');

          fireEvent.click(screen.getByRole('button', { name: '+' }));

          screen.getByText('총 상품금액(2개)');
        });
      });
    });

    context('상품 수량을 감소시킬 경우', () => {
      it('주문하는 상품의 수량이 감소하는 것을 볼 수 있다', async () => {
        const id = 1;

        await productStore.fetchProduct({ id });

        const { product } = productStore;

        const {
          name, price, image, shipping,
        } = product;

        const orderItem = new OrderItem({
          id: 1,
          productId: product.id,
          price,
          name,
          thumbnailUrl: image.thumbnailUrl,
          shippingFee: shipping.shippingFee,
          freeShippingAmount: shipping.freeShippingAmount,
        });

        orderItemStore.addOrderItem(orderItem);

        renderProductDetail(id);

        await waitFor(() => {
          screen.getByText('총 상품금액(1개)');

          fireEvent.click(screen.getByRole('button', { name: '+' }));

          screen.getByText('총 상품금액(2개)');

          fireEvent.click(screen.getByRole('button', { name: '-' }));

          screen.getByText('총 상품금액(1개)');
        });
      });
    });

    context('상품 수량을 1개 이하로 감소시킬 경우', () => {
      it('상품의 수량은 감소하지 않는다', async () => {
        const id = 1;

        await productStore.fetchProduct({ id });

        const { product } = productStore;

        const {
          name, price, image, shipping,
        } = product;

        const orderItem = new OrderItem({
          id: 1,
          productId: product.id,
          price,
          name,
          thumbnailUrl: image.thumbnailUrl,
          shippingFee: shipping.shippingFee,
          freeShippingAmount: shipping.freeShippingAmount,
        });

        orderItemStore.addOrderItem(orderItem);

        renderProductDetail(id);

        await waitFor(() => {
          screen.getByText('총 상품금액(1개)');

          fireEvent.click(screen.getByRole('button', { name: '+' }));

          screen.getByText('총 상품금액(2개)');

          fireEvent.click(screen.getByRole('button', { name: '-' }));

          screen.getByText('총 상품금액(1개)');

          fireEvent.click(screen.getByRole('button', { name: '-' }));

          screen.getByText('총 상품금액(1개)');
        });
      });
    });

    context('상품 수량을 원하는 수량만큼 입력한 경우', () => {
      it('상품의 수량은 입력된 값으로 변경된다', async () => {
        const id = 1;

        await productStore.fetchProduct({ id });

        const { product } = productStore;

        const {
          name, price, image, shipping,
        } = product;

        const orderItem = new OrderItem({
          id: 1,
          productId: product.id,
          price,
          name,
          thumbnailUrl: image.thumbnailUrl,
          shippingFee: shipping.shippingFee,
          freeShippingAmount: shipping.freeShippingAmount,
        });

        orderItemStore.addOrderItem(orderItem);

        renderProductDetail(id);

        await waitFor(() => {
          screen.getByText('총 상품금액(1개)');

          fireEvent.change(screen.getByLabelText('수량'), {
            target: {
              value: 10,
            },
          });

          screen.getByText('총 상품금액(10개)');
        });
      });
    });
  });
});
