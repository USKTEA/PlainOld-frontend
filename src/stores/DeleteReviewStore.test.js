import DeleteReviewStore from './DeleteReviewStore';

const context = describe;

describe('DeleteReviewStore', () => {
  let deleteReviewStore;

  beforeEach(() => {
    deleteReviewStore = new DeleteReviewStore();
  });

  context('구매평 삭제가 정상적으로 이루어진 경우', () => {
    it('삭제된 구매평의 id를 받는다', async () => {
      await deleteReviewStore.delete({ id: 1 });

      const { reviewId } = deleteReviewStore;

      expect(reviewId).toBe(1);
    });
  });

  context('구매평 삭제가 정상적으로 이루어지지 않은 경우', () => {
    it('reviewId는 null값이다', async () => {
      await deleteReviewStore.delete({ id: 9_999_999 });

      const { reviewId } = deleteReviewStore;

      expect(reviewId).toBeFalsy();
    });
  });
});
