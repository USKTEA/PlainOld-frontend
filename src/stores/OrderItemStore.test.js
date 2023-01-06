import OrderItemStore from './OrderItemStore';

const context = describe;

describe('OrderItemStore', () => {
  let orderItemStore;

  const setProductToChoiceOption = () => {
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

  beforeEach(() => {
    orderItemStore = new OrderItemStore();
  });

  describe('OrderItems', () => {
    context('Product에 OptionData가 없을 경우', () => {
      it('전달받은 상품 정보를 이용해 orderItems에 Item을 추가한다', () => {
        expect(orderItemStore.orderItems.items.length).toBe(0);

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

        expect(orderItemStore.orderItems.items.length).toBe(1);
      });
    });

    context('Product에 OptionData가 있을 경우', () => {
      it('OrderItems에 item을 바로 추가하지 않는다', () => {
        expect(orderItemStore.orderItems.items.length).toBe(0);

        setProductToChoiceOption();

        expect(orderItemStore.orderItems.items.length).toBe(0);
      });

      it('현재 옵션 선택해야 하는 상품의 정보를 저장한다', () => {
        expect(orderItemStore.product).toBeFalsy();

        setProductToChoiceOption();

        expect(orderItemStore.product).toBeTruthy();
      });

      it('선택할 수 있는 Option값이 생성된다', () => {
        expect(orderItemStore.colors).toBeFalsy();
        expect(orderItemStore.sizes).toBeFalsy();

        setProductToChoiceOption();

        expect(orderItemStore.colors).toHaveLength(3);
        expect(orderItemStore.sizes).toHaveLength(3);
      });

      it('SetOption이 호출되면 선택된 Option의 값이 설정된다', () => {
        expect(orderItemStore.option.size).toBeFalsy();
        expect(orderItemStore.option.color).toBeFalsy();

        setProductToChoiceOption();

        orderItemStore.setOption({ option: 'size', value: 'M' });

        expect(orderItemStore.option.size).toBe('M');
      });

      context('동일한 옵션의 상품을 다시 선택했을 경우', () => {
        it('해당 옵션의 상품의 수량을 1만큼 증가시킨다', () => {
          setProductToChoiceOption();

          orderItemStore.setOption({ option: 'size', value: 'M' });
          orderItemStore.setOption({ option: 'color', value: 'red' });

          expect(orderItemStore.orderItems.items.length).toBe(1);

          orderItemStore.setOption({ option: 'size', value: 'M' });
          orderItemStore.setOption({ option: 'color', value: 'red' });

          expect(orderItemStore.orderItems.items[0].quantity).toBe(2);
        });
      });
    });

    context('Option을 모두 선택했을 경우', () => {
      it('선택한 옵션 내용이 포함된 item을 orderItems에 추가한다', () => {
        setProductToChoiceOption();

        orderItemStore.setOption({ option: 'size', value: 'M' });
        orderItemStore.setOption({ option: 'color', value: 'red' });

        const { orderItems } = orderItemStore;

        expect(orderItems.items.length).toBe(1);
      });

      it('선택했던 Option은 초기화된다', () => {
        setProductToChoiceOption();

        orderItemStore.setOption({ option: 'size', value: 'M' });

        expect(orderItemStore.option.size).toBe('M');

        orderItemStore.setOption({ option: 'color', value: 'red' });

        expect(orderItemStore.option.size).toBe('');
        expect(orderItemStore.option.color).toBe('');
      });
    });
  });

  describe('IsItemSelected', () => {
    context('OrderItems에 Item이 있을 경우', () => {
      it('True를 반환한다', () => {
        setProductToChoiceOption();

        orderItemStore.setOption({ option: 'size', value: 'M' });
        orderItemStore.setOption({ option: 'color', value: 'red' });

        const { orderItems } = orderItemStore;

        expect(orderItems.items.length).toBe(1);

        expect(orderItemStore.isItemSelected()).toBeTruthy();
      });
    });

    context('OrderItems에 Item을 추가할 경우', () => {
      it('notSelected error를 초기화한다', () => {
        setProductToChoiceOption();

        expect(orderItemStore.errors.notSelected).toBeFalsy();

        orderItemStore.isItemSelected();

        expect(orderItemStore.errors.notSelected).toBeTruthy();

        orderItemStore.setOption({ option: 'size', value: 'M' });
        orderItemStore.setOption({ option: 'color', value: 'red' });

        expect(orderItemStore.errors.notSelected).toBeFalsy();
      });
    });

    context('OrderItems에 Item이 없을 경우', () => {
      it('False를 반환한다', () => {
        setProductToChoiceOption();

        const { orderItems } = orderItemStore;

        expect(orderItems.items.length).toBe(0);

        expect(orderItemStore.isItemSelected()).toBeFalsy();
      });

      it('Errors에 notSelected에러를 세팅한다', () => {
        setProductToChoiceOption();

        expect(orderItemStore.errors.notSelected).toBeFalsy();

        orderItemStore.isItemSelected();

        expect(orderItemStore.errors.notSelected).toBeTruthy();
      });
    });
  });
});
