import ProductStore from './ProductStore';

describe('ProductStore', () => {
  let productStore;

  beforeEach(() => {
    productStore = new ProductStore();
  });

  it('상품을 불러온다', async () => {
    await productStore.fetchProducts({ category: 1, pageNumber: 1 });

    expect(productStore.products.length).toBe(1);
  });
});
