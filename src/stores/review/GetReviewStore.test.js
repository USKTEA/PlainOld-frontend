import GetReviewStore from './GetReviewStore';

const context = describe;

describe('ReviewStore', () => {
  let getReviewStore;

  beforeEach(() => {
    getReviewStore = new GetReviewStore();
  });

  describe('FetchReviews', () => {
    context('fetchPhotoReviewsOnly가 false인 경우', () => {
      it('상품의 모든 구매평을 서버로 부터 받아온다', async () => {
        const productId = 1;

        expect(getReviewStore.fetchPhotoReviewsOnly).toBeFalsy();

        await getReviewStore.fetchReviews({ productId });

        const { reviews } = getReviewStore;

        expect(reviews).toHaveLength(2);
        expect(reviews[0].comment).toBe('좋은 상품입니다');
        expect(reviews[0].rate).toBe(5);
      });
    });

    context('fetchPhotoReviewsOnly가 True인 경우', () => {
      it('상품의 포토 구매평만 서버로 부터 받아온다', async () => {
        const productId = 1;

        getReviewStore.toggleFetchPhotoReviewsOnly();

        expect(getReviewStore.fetchPhotoReviewsOnly).toBeTruthy();

        await getReviewStore.fetchReviews({ productId });

        const { reviews } = getReviewStore;

        expect(reviews).toHaveLength(1);
      });
    });
  });

  describe('ToggleFetchPhotoReviewsOnly', () => {
    it('fetchPhotoReviewsOnly를 true 혹은 false로 변경시킨다', () => {
      expect(getReviewStore.fetchPhotoReviewsOnly).toBeFalsy();

      getReviewStore.toggleFetchPhotoReviewsOnly();

      expect(getReviewStore.fetchPhotoReviewsOnly).toBeTruthy();

      getReviewStore.toggleFetchPhotoReviewsOnly();

      expect(getReviewStore.fetchPhotoReviewsOnly).toBeFalsy();
    });
  });
});
