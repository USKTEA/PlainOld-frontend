import CreateReviewStore from './CreateReviewStore';

const context = describe;

describe('CreateReviewStore', () => {
  let createReviewStore;

  beforeEach(() => {
    createReviewStore = new CreateReviewStore();
  });

  describe('SubmitReview', () => {
    context('orderNumber가 없을 경우', () => {
      it('구매평은 제출되지 않고 error가 세팅된다', async () => {
        const { errors } = createReviewStore;
        const productId = 1;

        await createReviewStore.submitReview({ orderNumber: '', productId });

        expect(errors.orderNumber).toBeTruthy();
      });
    });

    context('productId가 없을 경우', () => {
      it('구매평은 제출되지 않고 error가 세팅된다', async () => {
        const { errors } = createReviewStore;
        const orderNumber = 'orderNumber';

        await createReviewStore.submitReview({ orderNumber, productId: '' });

        expect(errors.productId).toBeTruthy();
      });
    });

    context('comment가 비어있을 경우', () => {
      it('구매평은 제출되지 않고 error가 세팅된다', async () => {
        const { review, errors } = createReviewStore;

        const orderNumber = 'orderNumber';
        const productId = 'productId';

        expect(review.comment).toBe('');

        await createReviewStore.submitReview({ orderNumber, productId });

        expect(errors.comment).toBeTruthy();
      });
    });

    context('구매평이 정상적으로 등록되지 않았을 경우', () => {
      it('구매평은 등록되지 않고 error가 세팅된다', async () => {
        createReviewStore.changeComment({ comment: '좋은 상품' });

        const orderNumber = 'invalidOrderNumber';
        const productId = 1;

        await createReviewStore.submitReview({ orderNumber, productId });

        const { errors } = createReviewStore;

        expect(errors.submit).toBeTruthy();
      });
    });

    context('구매평이 정상적으로 등록되었을 경우', () => {
      it('구매평은 서버에 등록되고 결과값으로 등록된 구매평의 id를 받는다', async () => {
        createReviewStore.changeComment({ comment: '아주 좋은 상품!' });

        const orderNumber = 'orderNumber';
        const productId = '1';

        await createReviewStore.submitReview({ orderNumber, productId });

        const { reviewId } = createReviewStore;

        expect(reviewId).toBeTruthy();
      });
    });
  });

  describe('HasError', () => {
    context('세팅된 에러가 있을 경우', () => {
      it('true를 반환한다', async () => {
        createReviewStore.changeComment({ comment: '좋은 상품' });

        const orderNumber = 'invalidOrderNumber';
        const productId = 1;

        await createReviewStore.submitReview({ orderNumber, productId });

        expect(createReviewStore.hasError()).toBeTruthy();
      });
    });

    context('세팅된 에러가 없을 경우', () => {
      it('false를 반환한다', () => {
        expect(createReviewStore.hasError()).toBeFalsy();
      });
    });
  });

  describe('GetError', () => {
    it('현재 세팅되어 있는 에러메시지를 반환한다', async () => {
      createReviewStore.changeComment({ comment: '좋은 상품' });

      const orderNumber = 'invalidOrderNumber';
      const productId = 1;

      await createReviewStore.submitReview({ orderNumber, productId });

      expect(createReviewStore.getError()).toBeTruthy();
    });
  });
});
