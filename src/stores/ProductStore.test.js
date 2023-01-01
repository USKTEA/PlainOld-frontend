import ProductStore from './ProductStore';

const context = describe;

describe('ProductStore', () => {
  let productStore;

  beforeEach(() => {
    productStore = new ProductStore();
  });

  context('존재하지 않는 상품을 불러오려는 경우', () => {
    it('errorMessages에서 해당 오류의 에러를 꺼내서 errors에 저장한다', async () => {
      expect(productStore.errors.loading).toBeFalsy();

      await productStore.fetchProduct({ id: 9_999_999 });

      expect(productStore.errors.loading).toBeTruthy();
    });
  });

  context('상품 목록을 불러올 경우', () => {
    it('카테고리에 해당하는 상품 목록을 불러온다', async () => {
      await productStore.fetchProducts({ category: 1, pageNumber: 1 });

      expect(productStore.products.length).toBe(1);
    });
  });

  context('상품을 한 가지를 선택했을 경우', () => {
    it('상품의 상세 정보를 불러온다', async () => {
      await productStore.fetchProduct({ id: 1 });

      const { product } = productStore;

      expect(product.name).toBe('T-shirt');
      expect(product.price).toBe(10_000);
      expect(product.status).toBe('ON_SALE');
      expect(product.shipping).not.toBeFalsy();
    });
  });
});
