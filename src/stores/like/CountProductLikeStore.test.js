import CountProductLikeStore from './CountProductLikeStore';

const context = describe;

describe('CountProductLikeStore', () => {
  let countProductLikeStore;

  beforeEach(() => {
    countProductLikeStore = new CountProductLikeStore();
  });

  describe('CountProductLikes', () => {
    context('상품의 Like 수를 정상적으로 받아왔을 경우', () => {
      it('Like의 수를 반환한다', async () => {
        const productId = 1;

        await countProductLikeStore.countProductLikes({ productId });

        const { counts } = countProductLikeStore;

        expect(counts).toBeTruthy();
      });
    });

    context('정상적으로 Like 수를 불러오지 못한 경우', () => {
      it('Like 수는 0을 반환한다', async () => {
        const productId = 3;

        await countProductLikeStore.countProductLikes({ productId });

        const { counts } = countProductLikeStore;

        expect(counts).toBe(0);
      });
    });
  });
});
