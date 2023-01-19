import GetReviewStore from './GetReviewStore';

describe('ReviewStore', () => {
  let getReviewStore;

  beforeEach(() => {
    getReviewStore = new GetReviewStore();
  });

  describe('FetchReviews', () => {
    it('ProductId를 통해 상품의 구매평을 서버로 부터 받아온다', async () => {
      const productId = 1;

      await getReviewStore.fetchReviews({ productId });

      const { reviews } = getReviewStore;

      expect(reviews).toHaveLength(1);
      expect(reviews[0].comment).toBe('좋은 상품입니다');
      expect(reviews[0].rate).toBe(5);
    });
  });
});
