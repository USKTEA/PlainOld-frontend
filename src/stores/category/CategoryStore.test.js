import CategoryStore from './CategoryStore';

describe('CategoryStore', () => {
  let categoryStore;

  beforeEach(() => {
    categoryStore = new CategoryStore();
  });

  it('카테고리를 로드한다', async () => {
    await categoryStore.fetchCategories();

    expect(categoryStore.categories.length).toBe(1);
  });
});
