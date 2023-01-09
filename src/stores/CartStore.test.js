import Item from '../models/Item';
import CartStore from './CartStore';

const context = describe;

describe('CartStore', () => {
  let cartStore;

  const item = new Item({
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

  const newItem = new Item({
    id: 2,
    productId: 2,
    price: 10_000,
    name: 'Pants',
    thumbnailUrl: '1',
    shippingFee: 2_500,
    freeShippingAmount: 50_000,
    option: {
      size: 'L',
      color: 'Black',
    },
  });

  beforeEach(() => {
    cartStore = new CartStore();
  });

  describe('AddItem', () => {
    context('추가할 상품이 있을 경우', () => {
      it('Cart에 상품이 추가된 것을 볼 수 있다', () => {
        expect(cartStore.cart.items.size).toBe(0);

        cartStore.addItem([item]);

        expect(cartStore.cart.items.size).toBe(1);

        cartStore.addItem([newItem]);

        expect(cartStore.cart.items.size).toBe(2);
      });
    });

    context('카트에 상품이 있었을 경우', () => {
      it('Cart에 기존 상품과 추가된 상품이 있는 것을 볼 수 있다', () => {
        expect(cartStore.cart.items.size).toBe(0);

        cartStore.addItem([item]);

        expect(cartStore.cart.items.size).toBe(1);
      });
    });

    context('추가할 상품이 없을 경우', () => {
      it('Cart에 상품이 추가되지 않는다', () => {
        expect(cartStore.cart.items.size).toBe(0);

        cartStore.addItem([]);

        expect(cartStore.cart.items.size).toBe(0);
      });

      it('Errors에 에러가 세팅된 것을 볼 수 있다', () => {
        expect(cartStore.errors.addItemFailed).toBeFalsy();

        cartStore.addItem([]);

        expect(cartStore.errors.addItemFailed).toBeTruthy();
      });
    });

    context('Errors에 error가 있을 경우', () => {
      it('상품이 추가되면 errors를 초기화한다', () => {
        expect(cartStore.errors.addItemFailed).toBeFalsy();

        cartStore.addItem([]);

        expect(cartStore.errors.addItemFailed).toBeTruthy();

        cartStore.addItem([item]);

        expect(cartStore.errors.addItemFailed).toBeFalsy();
      });
    });
  });

  describe('Items', () => {
    context('Cart에 상품이 없을 경우', () => {
      it('빈 Map을 반환한다', () => {
        expect(cartStore.cart.items.size).toBe(0);
      });
    });

    context('Cart에 상품이 있을 경우', () => {
      it(
        'Item의 name을 Key에 해당하는 item들을 배열로 가지고 있는 Map을 반환한다',
        () => {
          cartStore.addItem([item]);

          expect(cartStore.cart.items.size).toBe(1);

          expect(cartStore.cart.items.has('T-Shirt')).toBeTruthy();
        },
      );
    });
  });

  describe('SelectAll', () => {
    it('Cart에 있는 모든 상품의 이름을 selected에 저장한다', () => {
      expect(cartStore.selected).toHaveLength(0);

      cartStore.addItem([item]);

      cartStore.selectAll();

      expect(cartStore.selected).toHaveLength(1);
    });
  });

  describe('ToggleSelected', () => {
    context('selected에 해당 상품이 없을 경우', () => {
      it('selected에 해당 상품을 추가한다', () => {
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

        expect(cartStore.selected).toHaveLength(0);

        cartStore.toggleSelected({ name });

        expect(cartStore.selected).toHaveLength(1);
      });
    });

    context('selected에 해당 상품이 있을 경우', () => {
      it('selected에 해당 상품을 삭제한다', () => {
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

        expect(cartStore.selected).toHaveLength(0);

        cartStore.toggleSelected({ name });

        expect(cartStore.selected).toHaveLength(1);

        cartStore.toggleSelected({ name });

        expect(cartStore.selected).toHaveLength(0);
      });
    });
  });

  describe('CheckHasSelected', () => {
    context('Selected에 해당 item이 있을 경우', () => {
      it('true를 반환한다', () => {
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

        cartStore.toggleSelected({ name });

        expect(cartStore.checkIsSelected({ name })).toBeTruthy();
      });
    });

    context('Selected에 해당 item이 없을 경우', () => {
      it('false를 반환한다', () => {
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

        expect(cartStore.checkIsSelected({ name })).toBeFalsy();
      });
    });
  });

  describe('SelectChangeQuantityItem', () => {
    context('SelectChangeQuantityItem이 호출 되었을 경우', () => {
      it('파라미터로 받은 name과 일치하는 item을 itemsInChangeQuantity에 할당한다', () => {
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

        cartStore.selectChangeQuantityItem({ name });

        const { itemsInChangeQuantity } = cartStore;

        expect(itemsInChangeQuantity.name).toBe(name);
        expect(itemsInChangeQuantity.items[0].id).toBe(1);
      });
    });
  });

  describe('IncreaseQuantity', () => {
    it('id에 해당하는 item수량을 증가시킨다', () => {
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

      cartStore.selectChangeQuantityItem({ name });

      let { itemsInChangeQuantity } = cartStore;

      expect(itemsInChangeQuantity.name).toBe(name);
      expect(itemsInChangeQuantity.items[0].quantity).toBe(1);
      expect(itemsInChangeQuantity.items[0].totalPrice).toBe(10_000);

      cartStore.increaseQuantity({ id: 1, amount: 1 });

      itemsInChangeQuantity = cartStore.itemsInChangeQuantity;

      expect(itemsInChangeQuantity.items[0].quantity).toBe(2);
      expect(itemsInChangeQuantity.items[0].totalPrice).toBe(20_000);
    });
  });

  describe('DecreaseQuantity', () => {
    it('id에 해당하는 item수량을 감소시킨다', () => {
      const name = 'T-Shirt';

      const shirts = new Item({
        id: 1,
        productId: 1,
        price: 10_000,
        name,
        thumbnailUrl: '1',
        shippingFee: 2_500,
        freeShippingAmount: 50_000,
        quantity: 2,
        option: {
          size: 'L',
          color: 'Black',
        },
      });

      cartStore.addItem([shirts]);

      cartStore.selectChangeQuantityItem({ name });

      let { itemsInChangeQuantity } = cartStore;

      expect(itemsInChangeQuantity.name).toBe(name);
      expect(itemsInChangeQuantity.items[0].quantity).toBe(2);
      expect(itemsInChangeQuantity.items[0].totalPrice).toBe(20_000);

      cartStore.decreaseQuantity({ id: 1, amount: -1 });

      itemsInChangeQuantity = cartStore.itemsInChangeQuantity;

      expect(itemsInChangeQuantity.items[0].quantity).toBe(1);
      expect(itemsInChangeQuantity.items[0].totalPrice).toBe(10_000);
    });

    it('item수량을 1미만으로 감소시키지 않는다', () => {
      const name = 'T-Shirt';

      const shirts = new Item({
        id: 1,
        productId: 1,
        price: 10_000,
        name,
        thumbnailUrl: '1',
        shippingFee: 2_500,
        freeShippingAmount: 50_000,
        quantity: 1,
        option: {
          size: 'L',
          color: 'Black',
        },
      });

      cartStore.addItem([shirts]);

      cartStore.selectChangeQuantityItem({ name });

      const { itemsInChangeQuantity } = cartStore;

      expect(itemsInChangeQuantity.name).toBe(name);
      expect(itemsInChangeQuantity.items[0].quantity).toBe(1);
      expect(itemsInChangeQuantity.items[0].totalPrice).toBe(10_000);

      cartStore.decreaseQuantity({ id: 1, amount: -1 });

      expect(itemsInChangeQuantity.items[0].quantity).toBe(1);
      expect(itemsInChangeQuantity.items[0].totalPrice).toBe(10_000);
    });
  });

  describe('UpdateQuantity', () => {
    it('id에 해당하는 item수량을 업데이트 시킨다', () => {
      const name = 'T-Shirt';

      const shirts = new Item({
        id: 1,
        productId: 1,
        price: 10_000,
        name,
        thumbnailUrl: '1',
        shippingFee: 2_500,
        freeShippingAmount: 50_000,
        quantity: 1,
        option: {
          size: 'L',
          color: 'Black',
        },
      });

      cartStore.addItem([shirts]);

      cartStore.selectChangeQuantityItem({ name });

      let { itemsInChangeQuantity } = cartStore;

      expect(itemsInChangeQuantity.name).toBe(name);
      expect(itemsInChangeQuantity.items[0].quantity).toBe(1);
      expect(itemsInChangeQuantity.items[0].totalPrice).toBe(10_000);

      cartStore.updateQuantity({ id: 1, amount: 10 });

      itemsInChangeQuantity = cartStore.itemsInChangeQuantity;

      expect(itemsInChangeQuantity.items[0].quantity).toBe(10);
      expect(itemsInChangeQuantity.items[0].totalPrice).toBe(100_000);
    });
  });

  describe('SaveChange', () => {
    it('ItemsInChangeQuantity의 items를 cart에 저장시킨다', () => {
      const name = 'T-Shirt';

      const shirts = new Item({
        id: 1,
        productId: 1,
        price: 10_000,
        name,
        thumbnailUrl: '1',
        shippingFee: 2_500,
        freeShippingAmount: 50_000,
        quantity: 1,
        option: {
          size: 'L',
          color: 'Black',
        },
      });

      cartStore.addItem([shirts]);

      let { cart } = cartStore;

      expect(cart.items.get(name)[0].quantity).toBe(1);

      cartStore.selectChangeQuantityItem({ name });

      cartStore.updateQuantity({ id: 1, amount: 10 });

      cartStore.saveChange();

      cart = cartStore.cart;

      expect(cart.items.get(name)[0].quantity).toBe(10);
    });

    it('ItemsInChangeQuantity를 초기화 시킨다', () => {
      const name = 'T-Shirt';

      const shirts = new Item({
        id: 1,
        productId: 1,
        price: 10_000,
        name,
        thumbnailUrl: '1',
        shippingFee: 2_500,
        freeShippingAmount: 50_000,
        quantity: 1,
        option: {
          size: 'L',
          color: 'Black',
        },
      });

      cartStore.addItem([shirts]);

      cartStore.selectChangeQuantityItem({ name });

      let { itemsInChangeQuantity } = cartStore;

      expect(itemsInChangeQuantity).toBeTruthy();

      cartStore.saveChange();

      itemsInChangeQuantity = cartStore.itemsInChangeQuantity;

      expect(itemsInChangeQuantity).toBeFalsy();
    });
  });

  describe('DeleteItem', () => {
    it('name에 해당하는 item을 cart에서 제거한다', () => {
      const name = 'T-Shirt';

      const shirts = new Item({
        id: 1,
        productId: 1,
        price: 10_000,
        name,
        thumbnailUrl: '1',
        shippingFee: 2_500,
        freeShippingAmount: 50_000,
        quantity: 1,
        option: {
          size: 'L',
          color: 'Black',
        },
      });

      cartStore.addItem([shirts]);

      let { cart } = cartStore;

      expect(cart.items.size).toBe(1);

      cartStore.deleteItem({ name });

      cart = cartStore.cart;

      expect(cart.items.size).toBe(0);
    });
  });

  describe('DeleteOption', () => {
    context('name에 해당하는 item의 option이 1개 이상일 경우', () => {
      it('option을 삭제한다', () => {
        const name = 'T=Shirt';
        const largeBlack = new Item({
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

        const xlBlack = new Item({
          id: 2,
          productId: 1,
          price: 10_000,
          name,
          thumbnailUrl: '1',
          shippingFee: 2_500,
          freeShippingAmount: 50_000,
          option: {
            size: 'XL',
            color: 'Black',
          },
        });

        cartStore.addItem([largeBlack, xlBlack]);

        let { cart } = cartStore;

        expect(cart.items.get(name).length).toBe(2);

        cartStore.deleteOption({ id: 1, name });

        cart = cartStore.cart;

        expect(cart.items.get(name).length).toBe(1);
      });
    });

    context('name에 해당하는 item의 옵션이 1개일 경우', () => {
      it('옵션은 삭제되지 않는다', () => {
        const name = 'T=Shirt';
        const largeBlack = new Item({
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

        cartStore.addItem([largeBlack]);

        let { cart } = cartStore;

        expect(cart.items.get(name).length).toBe(1);

        cartStore.deleteOption({ id: 1, name });

        cart = cartStore.cart;

        expect(cart.items.get(name).length).toBe(1);
      });
    });
  });

  describe('deleteCartItemBySelected', () => {
    it('selected에 있는 name을 통해 cart에 있는 item을 삭제한다', () => {
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

      let { cart } = cartStore;

      expect(cart.items.size).toBe(1);

      expect(cartStore.selected).toHaveLength(0);

      cartStore.toggleSelected({ name });

      expect(cartStore.selected[0]).toBe(name);

      cartStore.deleteCartItemBySelected();

      cart = cartStore.cart;

      expect(cart.items.size).toBe(0);
    });
  });

  describe('SelectItemToPurchase', () => {
    it('구매하려는 상품의 name을 등록한다', () => {
      const name = 'T-Shirt';

      const shirts = new Item({
        id: 1,
        productId: 1,
        price: 10_000,
        name,
        thumbnailUrl: '1',
        shippingFee: 2_500,
        freeShippingAmount: 50_000,
        quantity: 1,
        option: {
          size: 'L',
          color: 'Black',
        },
      });

      cartStore.addItem([shirts]);

      let { itemInPurchase } = cartStore;

      expect(itemInPurchase).toHaveLength(0);

      cartStore.selectItemToPurchase({ name });

      itemInPurchase = cartStore.itemInPurchase;

      expect(itemInPurchase[0]).toBe('T-Shirt');
    });
  });

  describe('CompletePurchase', () => {
    it(
      'itemInPurchase과 itemInPurchase에 있는 name을 통해 cart에 있는 item을 삭제한다',
      () => {
        const name = 'T-Shirt';

        const shirts = new Item({
          id: 1,
          productId: 1,
          price: 10_000,
          name,
          thumbnailUrl: '1',
          shippingFee: 2_500,
          freeShippingAmount: 50_000,
          quantity: 1,
          option: {
            size: 'L',
            color: 'Black',
          },
        });

        cartStore.addItem([shirts]);

        cartStore.selectItemToPurchase({ name });

        let { cart, itemInPurchase } = cartStore;

        expect(cart.items.size).toBe(1);
        expect(itemInPurchase).toHaveLength(1);

        cartStore.completePurchase();

        cart = cartStore.cart;
        itemInPurchase = cartStore.itemInPurchase;

        expect(cart.items.size).toBe(0);
        expect(itemInPurchase).toHaveLength(0);
      },
    );
  });

  describe('SelectedTotalPrice', () => {
    it('selected에 해당하는 item의 총 금액을 반환한다', () => {
      const name = 'T-Shirt';

      const shirts = new Item({
        id: 1,
        productId: 1,
        price: 10_000,
        name,
        thumbnailUrl: '1',
        shippingFee: 2_500,
        freeShippingAmount: 50_000,
        quantity: 1,
        option: {
          size: 'L',
          color: 'Black',
        },
      });

      cartStore.addItem([shirts]);

      expect(cartStore.selectedTotalPrice()).toBe(0);

      cartStore.addSelected({ name });

      expect(cartStore.selectedTotalPrice()).toBe(10_000);
    });
  });

  describe('SelectedShippingFee', () => {
    context(
      'selected에 해당하는 모든 item의 총 금액이 무료 배송 금액과 같거나 높을 경우',
      () => {
        it(' 0을 반환한다', () => {
          const name = 'T-Shirt';

          const shirts = new Item({
            id: 1,
            productId: 1,
            price: 50_000,
            name,
            thumbnailUrl: '1',
            shippingFee: 2_500,
            freeShippingAmount: 50_000,
            quantity: 1,
            option: {
              size: 'L',
              color: 'Black',
            },
          });

          cartStore.addItem([shirts]);

          cartStore.addSelected({ name });

          expect(cartStore.selectedShippingFee()).toBe(0);
        });
      },
    );

    context(
      'selected에 해당하는 item의 총 금액이 하나라도 무료 배송 금액보다 낮을 경우',
      () => {
        it(' item 중 가장 높은 shippingFee를 반환한다', () => {
          const name = 'T-Shirt';

          const shirts = new Item({
            id: 1,
            productId: 1,
            price: 10_000,
            name,
            thumbnailUrl: '1',
            shippingFee: 2_500,
            freeShippingAmount: 50_000,
            quantity: 1,
            option: {
              size: 'L',
              color: 'Black',
            },
          });

          cartStore.addItem([shirts]);

          cartStore.addSelected({ name });

          expect(cartStore.selectedShippingFee()).toBe(2_500);
        });
      },
    );
  });
});
