import Item from './Item';

const context = describe;

describe('Item', () => {
  describe('hasOption', () => {
    context('Option이 없거나 size가 Free이고 color가 빈값인 경우', () => {
      it('false를 반환한다', () => {
        const item = new Item({
          id: 1,
          productId: 1,
          price: 10_000,
          name: 'T-Shirt',
          thumbnailUrl: '1',
          shippingFee: 2_500,
          freeShippingAmount: 50_000,
          option: {
            size: 'FREE',
            color: '',
          },
        });

        expect(item.hasOption()).toBeFalsy();
      });
    });

    context('Option이 있고 size가 FREE가 아니고 color도 빈값이 아닌 경우', () => {
      it('true를 반환한다', () => {
        const item = new Item({
          id: 1,
          productId: 1,
          price: 10_000,
          name: 'T-Shirt',
          thumbnailUrl: '1',
          shippingFee: 2_500,
          freeShippingAmount: 50_000,
          option: {
            size: 'XL',
            color: 'Red',
          },
        });

        expect(item.hasOption()).toBeTruthy();
      });
    });
  });
});
