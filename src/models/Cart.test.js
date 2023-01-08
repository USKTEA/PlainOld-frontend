import Item from './Item';
import Cart from './Cart';

const context = describe;

describe('Cart', () => {
  let cart;

  beforeEach(() => {
    cart = new Cart();
  });

  context('GenerateId가 호출되는 경우', () => {
    it('Cart Item에서 가장 큰 Id보다 1이 큰 숫자를 반환한다', () => {
      const firstId = cart.generateId();

      expect(firstId).toBe(1);

      const item = new Item({
        id: firstId,
        productId: 1,
        price: 10_000,
        name: 'T-Shirt',
        thumbnailUrl: '1',
        shippingFee: 2_500,
        freeShippingAmount: 50_000,
      });

      cart = cart.addItem(item);

      const secondId = cart.generateId();

      expect(secondId).toBe(2);
    });
  });

  describe('AddItem', () => {
    context('Item을 추가할 경우', () => {
      it('Cart에 item이 저장된다', () => {
        expect(cart.items.size).toBe(0);

        const item = new Item({
          productId: 1,
          price: 10_000,
          name: 'T-Shirt',
          thumbnailUrl: '1',
          shippingFee: 2_500,
          freeShippingAmount: 50_000,
        });

        cart = cart.addItem(item);

        expect(cart.items.size).toBe(1);
      });
    });

    context('Cart에 다른 상품을 추가할 경우', () => {
      it('Cart에 기존 상품과 새로 들어온 상품이 저장된다', () => {
        expect(cart.items.size).toBe(0);

        const shirts = new Item({
          productId: 1,
          price: 10_000,
          name: 'T-Shirt',
          thumbnailUrl: '1',
          shippingFee: 2_500,
          freeShippingAmount: 50_000,
        });

        const pants = new Item({
          productId: 1,
          price: 10_000,
          name: 'Pants',
          thumbnailUrl: '1',
          shippingFee: 2_500,
          freeShippingAmount: 50_000,
        });

        const items = [shirts, pants];

        cart = items.reduce(
          (acc, item) => (acc.addItem(item)),
          cart,
        );

        expect(cart.totalQuantity()).toBe(2);
      });
    });

    context('옵션이 없는 동일한 Item을 추가할 경우', () => {
      it('Cart에 있는 Item의 수량이 1만큼 증가한다', () => {
        const name = 'T-Shirt';
        const item = new Item({
          productId: 1,
          price: 10_000,
          name,
          thumbnailUrl: '1',
          shippingFee: 2_500,
          freeShippingAmount: 50_000,
        });

        cart = cart.addItem(item);

        expect(cart.items.size).toBe(1);

        expect(cart.items.get(name)[0].quantity).toBe(1);

        cart = cart.addItem(item);

        expect(cart.items.size).toBe(1);

        expect(cart.items.get(name)[0].quantity).toBe(2);
      });
    });

    context('동일한 옵션의 Item을 추가할 경우', () => {
      it('해당 옵션의 Item의 수량을 1만큼 증가시킨다', () => {
        expect(cart.items.size).toBe(0);

        const name = 'T-Shirt';

        const item = new Item({
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

        cart = cart.addItem(item);

        expect(cart.items.size).toBe(1);
        expect(cart.items.get(name)[0].quantity).toBe(1);

        cart = cart.addItem(item);

        expect(cart.items.size).toBe(1);
        expect(cart.items.get(name)[0].quantity).toBe(2);
      });
    });
  });

  describe('TotalQuantity', () => {
    context('Cart에 item이 없는 경우', () => {
      it('0을 반환한다', () => {
        expect(cart.totalQuantity()).toBe(0);
      });
    });

    context('Cart에 item이 있는 경우', () => {
      it('Cart에 Name이 다른 item 갯수를 반환한다', () => {
        expect(cart.totalQuantity()).toBe(0);

        const item1 = new Item({
          id: 1,
          productId: 1,
          price: 10_000,
          name: 'T-Shirt',
          thumbnailUrl: '1',
          shippingFee: 2_500,
          freeShippingAmount: 50_000,
        });

        const item2 = new Item({
          id: 2,
          productId: 2,
          price: 10_000,
          name: 'Pants',
          thumbnailUrl: '1',
          shippingFee: 2_500,
          freeShippingAmount: 50_000,
          quantity: 10,
        });

        const items = [item1, item2];

        cart = items.reduce(
          (acc, item) => (acc.addItem(item)),
          cart,
        );

        expect(cart.totalQuantity()).toBe(2);
      });
    });
  });

  describe('TotalCost', () => {
    context('Cart에 item이 없는 경우', () => {
      it('0을 반환한다', () => {
        expect(cart.totalCost()).toBe(0);
      });
    });

    context('Cart에 item이 있는 경우', () => {
      it('Cart의 totalPrice 총합을 반환한다', () => {
        expect(cart.totalCost()).toBe(0);

        const item1 = new Item({
          id: 1,
          productId: 1,
          price: 10_000,
          name: 'Jeans',
          thumbnailUrl: '1',
          shippingFee: 2_500,
          freeShippingAmount: 50_000,
          quantity: 10,
        });

        const item2 = new Item({
          id: 2,
          productId: 1,
          price: 10_000,
          name: 'Jeans',
          thumbnailUrl: '1',
          shippingFee: 2_500,
          freeShippingAmount: 50_000,
        });

        const items = [item1, item2];

        cart = items.reduce(
          (acc, item) => (acc.addItem(item)),
          cart,
        );

        expect(cart.totalCost()).toBe(110_000);
      });
    });
  });

  describe('ItemPrice', () => {
    it(
      '파라미터로 들어온 name으로 Cart에 있는 item을 찾아 해당하는 item의 금액합을 반환한다',
      () => {
        const item1 = new Item({
          id: 1,
          productId: 1,
          price: 10_000,
          name: 'Jeans',
          thumbnailUrl: '1',
          shippingFee: 2_500,
          freeShippingAmount: 50_000,
        });

        const item2 = new Item({
          id: 2,
          productId: 2,
          price: 20_000,
          name: 'T-Shirts',
          thumbnailUrl: '2',
          shippingFee: 2_500,
          freeShippingAmount: 50_000,
        });

        const items = [item1, item2];

        cart = items.reduce(
          (acc, item) => (acc.addItem(item)),
          cart,
        );

        expect(cart.itemPrice({ name: 'Jeans' })).toBe(10_000);
        expect(cart.itemPrice({ name: 'T-Shirts' })).toBe(20_000);
      },
    );
  });

  describe('CheckHasOption', () => {
    context('Name에 해당하는 item이 Option이 있을 경우', () => {
      it('True를 반환한다', () => {
        const name = 'T-Shirt';

        const item = new Item({
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

        cart = cart.addItem(item);

        expect(cart.checkHasOption({ name })).toBeTruthy();
      });
    });

    context('Name에 해당하는 item이 Option이 없을 경우', () => {
      it('False를 반환한다', () => {
        const name = 'T-Shirt';

        const item = new Item({
          productId: 1,
          price: 10_000,
          name,
          thumbnailUrl: '1',
          shippingFee: 2_500,
          freeShippingAmount: 50_000,
        });

        cart = cart.addItem(item);

        expect(cart.checkHasOption({ name })).toBeFalsy();
      });
    });
  });

  describe('ItemQuantity', () => {
    it('파라미터로 받은 name과 name이 일치하는 Item의 총 수량을 반환한다', () => {
      const name = 'T-Shirt';

      const item = new Item({
        productId: 1,
        price: 10_000,
        name,
        thumbnailUrl: '1',
        shippingFee: 2_500,
        freeShippingAmount: 50_000,
      });

      cart = cart.addItem(item);

      expect(cart.itemQuantity({ name })).toBe(1);

      cart = cart.addItem(item);

      expect(cart.itemQuantity({ name })).toBe(2);
    });
  });

  describe('Update', () => {
    it('파리미터로 받은 name에 해당하는 item을 업데이트 한다', () => {
      const name = 'T-Shirt';

      const item = new Item({
        productId: 1,
        price: 10_000,
        name,
        thumbnailUrl: '1',
        shippingFee: 2_500,
        freeShippingAmount: 50_000,
      });

      const updated = new Item({
        productId: 1,
        price: 10_000,
        name,
        thumbnailUrl: '1',
        shippingFee: 2_500,
        freeShippingAmount: 50_000,
        quantity: 10,
      });

      cart = cart.addItem(item);

      cart = cart.update({ name, items: [updated] });

      const { items } = cart;

      expect(items.get(name)[0].quantity).toBe(10);
    });
  });

  describe('DeleteByItemName', () => {
    it('Cart에 있는 item 중 name과 일치하는 item을 삭제한다', () => {
      const name = 'T-Shirt';

      const item = new Item({
        productId: 1,
        price: 10_000,
        name,
        thumbnailUrl: '1',
        shippingFee: 2_500,
        freeShippingAmount: 50_000,
      });

      cart = cart.addItem(item);

      expect(cart.items.size).toBe(1);

      cart = cart.deleteByItemName({ name });

      expect(cart.items.size).toBe(0);
    });
  });

  describe('DeleteOption', () => {
    context('Cart에 있는 item 중 name과 일치하는 item의 옵션이 1개 이상인 경우', () => {
      it('option을 삭제한다', () => {
        const name = 'T-Shirt';

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

        const items = [largeBlack, xlBlack];

        cart = items.reduce(
          (acc, item) => (acc.addItem(item)),
          cart,
        );

        expect(cart.items.get(name).length).toBe(2);

        cart = cart.deleteOption({ id: 1, name });

        expect(cart.items.get(name).length).toBe(1);
      });
    });

    context('Cart에 있는 item 중 name과 일치하는 item의 옵션이 1개인 경우', () => {
      it('option을 삭제하지 않는다', () => {
        const name = 'T-Shirt';

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

        cart = cart.addItem(largeBlack);

        expect(cart.items.get(name).length).toBe(1);

        cart = cart.deleteOption({ id: 1, name });

        expect(cart.items.get(name).length).toBe(1);
      });
    });
  });

  describe('ShippingFee', () => {
    context(
      'Cart에 있는 item 중 name과 일치하는 item의 총 금액이 무료배송 금액과 같거나 높을 경우',
      () => {
        it('0을 반환한다', () => {
          const name = 'T-Shirt';

          const item = new Item({
            productId: 1,
            price: 50_000,
            name,
            thumbnailUrl: '1',
            shippingFee: 2_500,
            freeShippingAmount: 50_000,
          });

          cart = cart.addItem(item);

          expect(cart.shippingFee({ name })).toBe(0);
        });
      },
    );

    context(
      'Cart에 있는 item 중 name과 일치하는 item의 총 금액이 무료배송 금액보다 낮을 경우',
      () => {
        it('0을 반환한다', () => {
          const name = 'T-Shirt';

          const item = new Item({
            productId: 1,
            price: 10_000,
            name,
            thumbnailUrl: '1',
            shippingFee: 2_500,
            freeShippingAmount: 50_000,
          });

          cart = cart.addItem(item);

          expect(cart.shippingFee({ name })).toBe(2_500);
        });
      },
    );
  });
  // describe('Item 수량 조작', () => {
  //   context('Cart에 있는 item의 수량을 증가시키는 경우', () => {
  //     it('id값에 해당하는 item의 quantity를 증가시킨다', () => {
  //       const id = 1;

  //       const item = new Item({
  //         id: 1,
  //         productId: 1,
  //         price: 10_000,
  //         name: 'T-Shirt',
  //         thumbnailUrl: '1',
  //         shippingFee: 2_500,
  //         freeShippingAmount: 50_000,
  //       });

  //       cart = cart.addItem(item);

  //       expect(cart.items[0].quantity).toBe(1);

  //       cart = cart.increaseQuantity(
  //         { id, amount: 1 },
  //       );

  //       expect(cart.items[0].quantity).toBe(2);
  //     });
  //   });

  //   context('Cart에 있는 item 수량을 감소시키는 경우', () => {
  //     it('id에 해당하는 item의 quantity를 감소시킨다', () => {
  //       const id = 1;

  //       const item = new Item({
  //         id: 1,
  //         productId: 1,
  //         price: 10_000,
  //         name: 'T-Shirt',
  //         thumbnailUrl: '1',
  //         shippingFee: 2_500,
  //         freeShippingAmount: 50_000,
  //       });

  //       cart = cart.addItem(item);

  //       cart = cart.increaseQuantity(
  //         { id, amount: 1 },
  //       );

  //       expect(cart.items[0].quantity).toBe(2);

  //       cart = cart.decreaseQuantity(
  //         { id, amount: -1 },
  //       );

  //       expect(cart.items[0].quantity).toBe(1);
  //     });
  //   });

  //   context('Item의 수량을 1개 미만으로 감소시키는 경우', () => {
  //     it('Item의 수량은 1개 미만으로 감소하지 않는다', () => {
  //       const id = 1;

  //       const item = new Item({
  //         id: 1,
  //         productId: 1,
  //         price: 10_000,
  //         name: 'T-Shirt',
  //         thumbnailUrl: '1',
  //         shippingFee: 2_500,
  //         freeShippingAmount: 50_000,
  //       });

  //       cart = cart.addItem(item);

  //       cart = cart.increaseQuantity(
  //         { id, amount: 1 },
  //       );

  //       expect(cart.items[0].quantity).toBe(2);

  //       cart = cart.decreaseQuantity(
  //         { id, amount: -1 },
  //       );

  //       expect(cart.items[0].quantity).toBe(1);

  //       cart = cart.decreaseQuantity(
  //         { id, amount: -1 },
  //       );

  //       expect(cart.items[0].quantity).toBe(1);
  //     });
  //   });

  //   context('Item 수량을 직접 변경시키는 경우', () => {
  //     it('Item 수량은 입력값으로 변경된다', () => {
  //       const id = 1;

  //       const item = new Item({
  //         id: 1,
  //         productId: 1,
  //         price: 10_000,
  //         name: 'T-Shirt',
  //         thumbnailUrl: '1',
  //         shippingFee: 2_500,
  //         freeShippingAmount: 50_000,
  //       });

  //       cart = cart.addItem(item);

  //       expect(cart.items.length).toBe(1);

  //       cart = cart.updateQuantity(
  //         { id, amount: 10 },
  //       );

  //       expect(cart.items[0].quantity).toBe(10);
  //     });
  //   });
  // });

  // describe('배송비를 계산하는 경우', () => {
  //   context('Item 중 가장 큰 freeShippingAmount보다 totalCost가 적을 경우', () => {
  //     it('배송비는 Item 중 가장 큰 shippingFee가 된다', () => {
  //       const item = new Item({
  //         id: 1,
  //         productId: 1,
  //         price: 10_000,
  //         name: 'T-Shirt',
  //         thumbnailUrl: '1',
  //         shippingFee: 2_500,
  //         freeShippingAmount: 50_000,
  //       });

  //       cart = cart.addItem(item);

  //       expect(cart.calculateShippingFee()).toBe(2_500);
  //     });
  //   });

  //   context(
  //     'Item 중 가장 큰 freeShippingAmount보다 totalCost가 크거나 같을 경우',
  //     () => {
  //       it('배송비는 0원이 된다', () => {
  //         const item = new Item({
  //           id: 1,
  //           productId: 1,
  //           price: 100_000,
  //           name: 'T-Shirt',
  //           thumbnailUrl: '1',
  //           shippingFee: 2_500,
  //           freeShippingAmount: 50_000,
  //         });

  //         cart = cart.addItem(item);

  //         expect(cart.calculateShippingFee()).toBe(0);
  //       });
  //     },
  //   );
  // });
});
