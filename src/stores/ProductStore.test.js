import ProductStore from './ProductStore';

describe('ProductStore', () => {
  let productStore;

  beforeEach(() => {
    productStore = new ProductStore();
  });

  it('상품을 로드한다', async () => {
    await productStore.fetchProducts();

    expect(productStore.products.length).toBe(1);
  });
});
