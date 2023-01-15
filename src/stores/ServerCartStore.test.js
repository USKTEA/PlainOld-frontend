import ServerCartStore from './ServerCartStore';

describe('ServerCartStore', () => {
  let serverCartStore;

  beforeEach(() => {
    serverCartStore = new ServerCartStore();
  });

  describe('loadFormServer', () => {
    it('서버로 부터 회원 장바구니 데이터를 불러온다', async () => {
      await serverCartStore.load();

      const { cart: { items } } = serverCartStore;

      expect(items.size).not.toBe(0);
    });
  });
});
