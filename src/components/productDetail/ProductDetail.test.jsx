import {
  render, screen, fireEvent, waitFor,
} from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import { orderItemStore } from '../../stores/OrderItemStore';
import { productStore } from '../../stores/ProductStore';
import { cartStore } from '../../stores/CartStore';

import ProductDetail from './ProductDetail';

import defaultTheme from '../../styles/defaultTheme';

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate() {
    return navigate;
  },
  Link({ children, to }) {
    return (
      <a href={to}>
        {children}
      </a>
    );
  },
}));

const context = describe;

describe('ProductDetail', () => {
  const renderProductDetail = () => {
    render((
      <ThemeProvider theme={defaultTheme}>
        <ProductDetail />
      </ThemeProvider>
    ));
  };

  beforeEach(() => {
    productStore.clear();
    orderItemStore.reset();
    cartStore.reset();
  });

  describe('구매하기', () => {
    context('선택한 상품이 있고 구매하기 버튼을 누를 경우', () => {
      it('해당 상품의 주문 정보가 보이는 결제화면으로 이동한다', async () => {
        const id = 1;

        await productStore.fetchProduct({ id });

        const { product } = productStore;

        orderItemStore.addOrderItem({ product });

        renderProductDetail();

        fireEvent.click(screen.getByRole('button', { name: '구매하기' }));

        expect(navigate).toBeCalledWith('/order');
      });
    });

    context('선택한 상품이 없는데 구매하기 버튼을 누를 경우', () => {
      it('주문하실 상품을 선택해주세요 메세지를 볼 수 있다', async () => {
        const id = 3;

        await productStore.fetchProduct({ id });

        renderProductDetail();

        fireEvent.click(screen.getByRole('button', { name: '구매하기' }));

        screen.getByText('상품 옵션을 선택해주세요');
      });
    });
  });

  describe('장바구니', () => {
    context('선택한 상품이 있고 장바구니 버튼을 누를 경우', () => {
      it('선택한 상품이 장바구니에 담긴 것을 볼 수 있다', async () => {
        const id = 1;

        await productStore.fetchProduct({ id });

        const { product } = productStore;

        orderItemStore.addOrderItem({ product });

        renderProductDetail();

        expect(cartStore.cart.items.size).toBe(0);

        fireEvent.click(screen.getByRole('button', { name: '장바구니' }));

        expect(screen.getByText('선택하신 상품을 장바구니에 담았습니다.'));

        expect(cartStore.cart.items.size).toBe(1);
      });
    });

    context('선택한 상품이 없을 때 장바구니 버튼을 누를 경우', () => {
      it('장바구니에 넣을 상품을 선택해주세요 메세지를 볼 수 있다', async () => {
        const id = 3;

        await productStore.fetchProduct({ id });

        renderProductDetail();

        fireEvent.click(screen.getByRole('button', { name: '장바구니' }));

        screen.getByText('장바구니에 넣을 상품을 선택해주세요');

        expect(cartStore.cart.items.size).toBe(0);
      });
    });
  });

  describe('로딩', () => {
    context('상품 id가 1인 상품을 선택한 경우', () => {
      it('상품 id가 1인 상품의 정보를 불러온다', async () => {
        const id = 1;

        await productStore.fetchProduct({ id });

        renderProductDetail();

        await waitFor(() => {
          screen.getByText('T-shirt');
        });
      });
    });

    context('상품 id가 2인 상품을 선택한 경우', () => {
      it('상품 id가 1인 상품의 정보를 불러온다', async () => {
        const id = 2;

        await productStore.fetchProduct({ id });

        renderProductDetail();

        await waitFor(() => {
          screen.getByText('Pants');
        });
      });
    });

    context('상품이 존재하지 않는 경우', () => {
      it('해당 상품은 존재하지 않습니다 메시지가 보인다', async () => {
        const id = 9_999_999;

        await productStore.fetchProduct({ id });

        renderProductDetail();

        await waitFor(() => {
          screen.getByText('해당 상품은 존재하지 않습니다');
        });
      });
    });
  });

  describe('상품', () => {
    describe('Option이 없는 상품', () => {
      context('Option이 없는 상품을 선택했을 경우', () => {
        it('기본으로 1개의 상품이 설정되어 있는 것을 볼 수 있다', async () => {
          const id = 1;

          await productStore.fetchProduct({ id });

          const { product } = productStore;

          orderItemStore.addOrderItem({ product });

          renderProductDetail();

          await waitFor(() => {
            screen.getByText('총 상품금액(1개)');
          });
        });
      });

      describe('상품 수량을 변경시킬 경우', () => {
        context('상품 수량을 증가시킬 경우', () => {
          it('주문하는 상품의 수량이 증가하는 것을 볼 수 있다', async () => {
            const id = 1;

            await productStore.fetchProduct({ id });

            const { product } = productStore;

            orderItemStore.addOrderItem({ product });

            renderProductDetail();

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

            orderItemStore.addOrderItem({ product });

            renderProductDetail();

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

            orderItemStore.addOrderItem({ product });

            renderProductDetail();

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

            orderItemStore.addOrderItem({ product });

            renderProductDetail();

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

    describe('Option이 있는 상품', () => {
      context('Option이 있는 상품을 선택했을 경우', () => {
        it('선택되어 있는 상품이 없는 것을 볼 수 있다', async () => {
          const id = 3;

          await productStore.fetchProduct({ id });

          const { product } = productStore;

          orderItemStore.setProductToChoiceOption({ product });

          renderProductDetail();

          expect(screen.queryByText(/총 상품금액/)).toBeFalsy();
        });

        it('상품의 옵션을 볼 수 있다', async () => {
          const id = 3;

          await productStore.fetchProduct({ id });

          const { product } = productStore;

          orderItemStore.setProductToChoiceOption({ product });

          renderProductDetail();

          await waitFor(() => {
            screen.getByText('사이즈 *');
            screen.getByText('컬러 *');
          });
        });
      });

      context('사이즈를 선택하지 않았을 경우', () => {
        it('사이즈 옵션을 선택해주세요 메시지를 볼 수 있다', async () => {
          const id = 3;

          await productStore.fetchProduct({ id });

          const { product } = productStore;

          orderItemStore.setProductToChoiceOption({ product });

          renderProductDetail();

          await waitFor(() => {
            screen.getByText('사이즈 옵션을 선택해주세요.');
          });
        });
      });
    });
  });
});
