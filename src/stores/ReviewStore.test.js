import ReviewStore from './ReviewStore';

describe('CreateReviewStore', () => {
  let reviewStore;

  beforeEach(() => {
    reviewStore = new ReviewStore();
  });

  it('작성하는 review의 rate은 초기 값으로 5가 세팅되어 있다', () => {
    const { review } = reviewStore;

    expect(review.rate).toBe(5);
  });

  describe('ChangeRate', () => {
    it('작성 중인 review의 rate을 변경한다', () => {
      let { review } = reviewStore;

      expect(review.rate).toBe(5);

      reviewStore.changeRate(4);

      review = reviewStore.review;

      expect(review.rate).toBe(4);
    });
  });

  describe('ChangeComment', () => {
    it('작성 중인 review의 comment를 변경한다', () => {
      let { review } = reviewStore;

      expect(review.comment).toBe('');

      reviewStore.changeComment({ comment: '좋은 상품!' });

      review = reviewStore.review;

      expect(review.comment).toBe('좋은 상품!');
    });
  });
});
