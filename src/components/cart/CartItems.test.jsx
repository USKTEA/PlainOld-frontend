import { fireEvent, render, screen } from '@testing-library/react';

import { cartStore } from '../../stores/cart/CartStore';

import Item from '../../models/Item';

import CartItems from './CartItems';

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  Link({ children, to }) {
    return (
      <a href={to}>
        {children}
      </a>
    );
  },
  useNavigate() {
    return navigate;
  },
}));

const context = describe;

describe('CartItem', () => {
  const itemWithOption = new Item({
    id: 1,
    productId: 1,
    price: 10_000,
    name: 'T-Shirt',
    thumbnailUrl: '1',
    shippingFee: 2_500,
    freeShippingAmount: 50_000,
    option: {
      size: 'L',
      color: 'Black',
    },
  });

  const itemWithoutOption = new Item({
    id: 1,
    productId: 1,
    price: 10_000,
    name: 'T-Shirt',
    thumbnailUrl: '1',
    shippingFee: 2_500,
    freeShippingAmount: 50_000,
  });

  beforeEach(() => {
    cartStore.reset();
  });

  describe('Items', () => {
    context('장바구니에 상품이 있을 경우', () => {
      it('상품 정보를 볼 수 있다', () => {
        cartStore.addItem([itemWithoutOption]);

        render(<CartItems />);

        expect(screen.getAllByText('T-Shirt').length).toBeTruthy();
        screen.getByText('10,000원');
      });
    });

    context('장바구니에 옵션이 있는 상품이 있을 경우', () => {
      it('옵션 정보를 포함한 상품 정보를 볼 수 있다', () => {
        cartStore.addItem([itemWithOption]);

        render(<CartItems />);

        expect(screen.getAllByText('T-Shirt').length).toBeTruthy();
        screen.getByText(/L/);
        screen.getByText(/Black/);
        screen.getByText(/1개/);
        screen.getByText('10,000원');
      });
    });
  });

  describe('Quantity', () => {
    it('장바구니에 있는 개별 상품의 총 갯수를 볼 수 있다', () => {
      cartStore.addItem([itemWithOption]);
      cartStore.addItem([itemWithOption]);

      render(<CartItems />);

      screen.getByText(2);
    });
  });

  describe('수량 변경 버튼', () => {
    context('수량 변경 버튼을 클릭했을 경우', () => {
      it('수량을 변경할 수 있는 모달을 볼 수 있다', () => {
        cartStore.addItem([itemWithOption]);

        render(<CartItems />);

        fireEvent.click(screen.getByRole('button', { name: '수량 변경' }));

        screen.getByRole('heading', { name: '수량 변경' });
      });
    });

    context('옵션이 있는 아이템의 수량 변경 버튼을 클릭했을 경우', () => {
      it('모달에서 기존 선택되어 있는 옵션의 정보를 볼 수 있다', () => {
        cartStore.addItem([itemWithOption]);

        render(<CartItems />);

        fireEvent.click(screen.getByRole('button', { name: '수량 변경' }));

        screen.getByText('L / Black');
        screen.getByText('총 수량 1개');
        expect(screen.getAllByText('10,000원').length).toBeTruthy();
      });
    });

    describe('수량 변경', () => {
      context('아이템 수량을 증가시킬 경우', () => {
        it('아이템의 수량과 금액이 증가된 것을 볼 수 있다', () => {
          cartStore.addItem([itemWithOption]);

          render(<CartItems />);

          screen.getByText('1');
          screen.getByText('10,000원');

          fireEvent.click(screen.getByRole('button', { name: '수량 변경' }));

          fireEvent.click(screen.getByRole('button', { name: '+' }));

          fireEvent.click(screen.getByRole('button', { name: '변경' }));

          screen.getByText('2');
          screen.getByText('20,000원');
        });
      });

      context('아이템 수량을 감소시킬 경우', () => {
        it('아이템의 수량이 증가된 것을 볼 수 있다', () => {
          cartStore.addItem([itemWithOption, itemWithOption]);

          render(<CartItems />);

          screen.getByText('2');
          screen.getByText('20,000원');

          fireEvent.click(screen.getByRole('button', { name: '수량 변경' }));

          fireEvent.click(screen.getByRole('button', { name: '-' }));

          fireEvent.click(screen.getByRole('button', { name: '변경' }));

          screen.getByText('1');
          screen.getByText('10,000원');
        });
      });

      context('수량을 직접 변경시키는 경우', () => {
        it('아이템의 수량이 입력된 숫자만큼 변경된 것을 볼 수 있다', () => {
          cartStore.addItem([itemWithOption]);

          render(<CartItems />);

          screen.getByText('1');
          screen.getByText('10,000원');

          fireEvent.click(screen.getByRole('button', { name: '수량 변경' }));

          fireEvent.change(screen.getByLabelText('L / Black'), {
            target: {
              value: 10,
            },
          });

          fireEvent.click(screen.getByRole('button', { name: '변경' }));

          screen.getByText('10');
          screen.getByText('100,000원');
        });
      });

      context('취소 버튼을 클릭했을 경우', () => {
        it('아이템 수량과 금액이 변경하지 않는다', () => {
          cartStore.addItem([itemWithOption, itemWithOption]);

          render(<CartItems />);

          screen.getByText('2');
          screen.getByText('20,000원');

          fireEvent.click(screen.getByRole('button', { name: '수량 변경' }));

          fireEvent.click(screen.getByRole('button', { name: '-' }));

          fireEvent.click(screen.getByRole('button', { name: '취소' }));

          screen.getByText('2');
          screen.getByText('20,000원');
        });
      });
    });

    describe('아이템 삭제', () => {
      it('선택된 아이템이 삭제된 것을 볼 수 있다', () => {
        cartStore.addItem([itemWithOption]);

        const { container } = render(<CartItems />);

        expect(screen.getAllByText('T-Shirt').length).toBeTruthy();

        fireEvent.click(
          container.getElementsByClassName('item-delete-button')[0],
        );

        expect(screen.queryAllByText('T-Shirt').length).toBeFalsy();
      });
    });

    describe('옵션 삭제', () => {
      context('선텍된 아이템의 옵션이 하나 밖에 없을 경우', () => {
        it('장바구니에서 상품이 삭제된다', () => {
          cartStore.addItem([itemWithOption]);

          const { container } = render(<CartItems />);

          expect(screen.getAllByText('T-Shirt').length).toBeTruthy();

          fireEvent.click(
            container.getElementsByClassName('option-delete-button')[0],
          );

          expect(screen.queryAllByText('T-Shirt').length).toBeFalsy();
        });
      });

      context('선택된 아이템의 옵션이 한 개 이상 있을 경우', () => {
        it('선택된 옵션을 삭제한다', () => {
          const largeBlack = new Item({
            id: 1,
            productId: 1,
            price: 10_000,
            name: 'T-Shirt',
            thumbnailUrl: '1',
            shippingFee: 2_500,
            freeShippingAmount: 50_000,
            option: {
              size: 'L',
              color: 'Black',
            },
          });

          const xlBlack = new Item({
            id: 1,
            productId: 1,
            price: 10_000,
            name: 'T-Shirt',
            thumbnailUrl: '1',
            shippingFee: 2_500,
            freeShippingAmount: 50_000,
            option: {
              size: 'XL',
              color: 'Black',
            },
          });

          cartStore.addItem([largeBlack, xlBlack]);

          const { container } = render(<CartItems />);

          screen.getByText('L / Black - 1개');
          screen.getByText('XL / Black - 1개');

          fireEvent.click(
            container.getElementsByClassName('option-delete-button')[0],
          );

          expect(screen.queryByText('L / Black - 1개')).toBeFalsy();
        });
      });
    });

    describe('바로구매', () => {
      it('주문 작성 화면으로 이동한다', () => {
        cartStore.addItem([itemWithOption]);

        render(<CartItems />);

        fireEvent.click(screen.getByRole('button', { name: '바로구매' }));

        expect(navigate).toBeCalledWith('/order');
      });
    });

    describe('배송 정보', () => {
      context('아이템 총 금액이 무료 배송금액과 같거나 높을 경우', () => {
        it('택배비는 무료인 것을 볼 수 있다', () => {
          const expensive = new Item({
            id: 1,
            productId: 1,
            price: 50_000,
            name: 'T-Shirt',
            thumbnailUrl: '1',
            shippingFee: 2_500,
            freeShippingAmount: 50_000,
          });

          cartStore.addItem([expensive]);

          render(<CartItems />);

          screen.getByText('무료');
        });
      });

      context('아이템 총 금액이 무료 배송금액 보다 낮을 경우', () => {
        it('아이템에 해당하는 택배비를 볼 수 있다', () => {
          const shippingFee = 2_500;

          const notFreeShipping = new Item({
            id: 1,
            productId: 1,
            price: 10_000,
            name: 'T-Shirt',
            thumbnailUrl: '1',
            shippingFee,
            freeShippingAmount: 50_000,
          });

          cartStore.addItem([notFreeShipping]);

          render(<CartItems />);

          screen.getByText('2,500원');
        });
      });
    });

    describe('체크박스', () => {
      context('전체 선택을 체크했을 경우', () => {
        it('모든 아이템의 체크박스가 선택된 것을 볼 수 있다', () => {
          const name = 'T-Shirt';

          const shirts = new Item({
            id: 1,
            productId: 1,
            price: 10_000,
            name,
            thumbnailUrl: '1',
            shippingFee: 2_500,
            freeShippingAmount: 50_000,
            option: {
              size: 'L',
              color: 'Black',
            },
          });

          cartStore.addItem([shirts]);

          render(<CartItems />);

          fireEvent.click(screen.getByLabelText('전체선택'));

          expect(screen.getByLabelText('전체선택')).toBeChecked();
          expect(screen.getByLabelText(name)).toBeChecked();
        });
      });

      context('아이템의 체크박스를 체크했을 경우', () => {
        it('해당 아이템의 체크박스체 체크된 것을 볼 수 있다', () => {
          const name = 'T-Shirt';

          const shirts = new Item({
            id: 1,
            productId: 1,
            price: 10_000,
            name,
            thumbnailUrl: '1',
            shippingFee: 2_500,
            freeShippingAmount: 50_000,
            option: {
              size: 'L',
              color: 'Black',
            },
          });

          cartStore.addItem([shirts]);

          render(<CartItems />);

          fireEvent.click(screen.getByLabelText(name));

          expect(screen.getByLabelText(name)).toBeChecked();
        });
      });

      context('카트에 있는 모든 아이템을 체크했을 경우', () => {
        it('전체선택 체크박스가 체크되어 있는 것을 볼 수 있다', () => {
          const shirts = 'T-Shirt';

          const item1 = new Item({
            id: 1,
            productId: 1,
            price: 10_000,
            name: shirts,
            thumbnailUrl: '1',
            shippingFee: 2_500,
            freeShippingAmount: 50_000,
            option: {
              size: 'L',
              color: 'Black',
            },
          });

          const pants = 'Pants';

          const item2 = new Item({
            id: 1,
            productId: 1,
            price: 10_000,
            name: pants,
            thumbnailUrl: '1',
            shippingFee: 2_500,
            freeShippingAmount: 50_000,
            option: {
              size: 'L',
              color: 'Black',
            },
          });

          cartStore.addItem([item1, item2]);

          render(<CartItems />);

          expect(screen.getByLabelText('전체선택')).not.toBeChecked();

          fireEvent.click(screen.getByLabelText(shirts));
          fireEvent.click(screen.getByLabelText(pants));

          expect(screen.getByLabelText('전체선택')).toBeChecked();
        });
      });

      context('카트에 있는 모든 아이템 중 하나라도 체크가 되지 않았을 경우', () => {
        it('전체선택 체크박스가 체크해제 되어 있는 것을 볼 수 있다', () => {
          const shirts = 'T-Shirt';

          const item1 = new Item({
            id: 1,
            productId: 1,
            price: 10_000,
            name: shirts,
            thumbnailUrl: '1',
            shippingFee: 2_500,
            freeShippingAmount: 50_000,
            option: {
              size: 'L',
              color: 'Black',
            },
          });

          const pants = 'T-Shirt';

          const item2 = new Item({
            id: 1,
            productId: 1,
            price: 10_000,
            name: pants,
            thumbnailUrl: '1',
            shippingFee: 2_500,
            freeShippingAmount: 50_000,
            option: {
              size: 'L',
              color: 'Black',
            },
          });

          cartStore.addItem([item1, item2]);

          render(<CartItems />);

          fireEvent.click(screen.getByLabelText('전체선택'));

          expect(screen.getByLabelText('전체선택')).toBeChecked();

          fireEvent.click(screen.getByLabelText(shirts));

          expect(screen.getByLabelText('전체선택')).not.toBeChecked();
        });
      });
    });

    describe('선택상품 삭제', () => {
      it('선택되어 있는 상품을 장바구니에서 삭제한다', () => {
        const shirts = 'T-Shirt';

        const item1 = new Item({
          id: 1,
          productId: 1,
          price: 10_000,
          name: shirts,
          thumbnailUrl: '1',
          shippingFee: 2_500,
          freeShippingAmount: 50_000,
          option: {
            size: 'L',
            color: 'Black',
          },
        });

        const pants = 'T-Shirt';

        const item2 = new Item({
          id: 1,
          productId: 1,
          price: 10_000,
          name: pants,
          thumbnailUrl: '1',
          shippingFee: 2_500,
          freeShippingAmount: 50_000,
          option: {
            size: 'L',
            color: 'Black',
          },
        });

        cartStore.addItem([item1, item2]);

        render(<CartItems />);

        fireEvent.click(screen.getByLabelText(pants));

        expect(screen.getByLabelText(pants)).toBeChecked();

        fireEvent.click(screen.getByRole('button', { name: '선택상품 삭제' }));

        expect(screen.queryByText(pants)).toBeFalsy();
      });
    });
  });
});
