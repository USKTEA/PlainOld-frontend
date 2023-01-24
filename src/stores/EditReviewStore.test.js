import EditReviewStore from './EditReviewStore';

const context = describe;

describe('EditReviewStore', () => {
  let editReviewStore;

  beforeEach(() => {
    editReviewStore = new EditReviewStore();
  });

  describe('SubmitReview', () => {
    context('comment가 비어있을 경우', () => {
      it('구매평은 제출되지 않고 error가 세팅된다', async () => {
        const review = {
          id: 1,
          rate: 5,
          comment: '',
        };

        editReviewStore.setReview(review);

        expect(editReviewStore.review.comment).toBe('');

        await editReviewStore.submitReview();

        const { errors } = editReviewStore;

        expect(errors.comment).toBeTruthy();
      });
    });

    context('구매평이 정상적으로 등록되지 않았을 경우', () => {
      it('구매평은 등록되지 않고 error가 세팅된다', async () => {
        const review = {
          id: 9_999_999,
          rate: 5,
          comment: '좋은 상품입니다',
        };

        editReviewStore.setReview(review);

        await editReviewStore.submitReview();

        const { errors } = editReviewStore;

        expect(errors.submit).toBeTruthy();
      });
    });

    context('구매평이 정상적으로 등록되었을 경우', () => {
      it('구매평은 서버에 등록되고 결과값으로 등록된 구매평의 id를 받는다', async () => {
        const review = {
          id: 1,
          rate: 5,
          comment: '아주 좋은 상품!',
        };

        editReviewStore.setReview(review);

        await editReviewStore.submitReview();

        const { reviewId } = editReviewStore;

        expect(reviewId).toBeTruthy();
      });
    });
  });

  describe('HasError', () => {
    context('세팅된 에러가 있을 경우', () => {
      it('true를 반환한다', async () => {
        const review = {
          id: 1,
          rate: 5,
          comment: '아주 좋은 상품!',
        };

        editReviewStore.setReview(review);

        editReviewStore.changeComment({ comment: '좋은상품' });

        await editReviewStore.submitReview();

        expect(editReviewStore.hasError()).toBeTruthy();
      });
    });

    context('세팅된 에러가 없을 경우', () => {
      it('false를 반환한다', () => {
        expect(editReviewStore.hasError()).toBeFalsy();
      });
    });
  });

  describe('GetError', () => {
    it('현재 세팅되어 있는 에러메시지를 반환한다', async () => {
      const review = {
        id: 1,
        rate: 5,
        comment: '아주 좋은 상품!',
      };

      editReviewStore.setReview(review);

      editReviewStore.changeComment({ comment: '좋은상품' });

      await editReviewStore.submitReview();

      expect(editReviewStore.getError()).toBeTruthy();
    });
  });

  describe('DeleteImage', () => {
    it('구매평의 이미지를 삭제한다', () => {
      const review = {
        id: 1,
        rate: 5,
        comment: '아주 좋은 상품!',
        imageUrl: '1',
      };

      editReviewStore.setReview(review);

      expect(editReviewStore.review.imageUrl).toBeTruthy();

      editReviewStore.deleteImage();

      expect(editReviewStore.review.imageUrl).toBeFalsy();
    });
  });

  describe('ChangeImage', () => {
    it('구매평의 이미지를 변경한다', () => {
      const review = {
        id: 1,
        rate: 5,
        comment: '아주 좋은 상품!',
        imageUrl: '1',
      };

      editReviewStore.setReview(review);

      expect(editReviewStore.review.imageUrl).toBe('1');

      editReviewStore.changeImage('2');

      expect(editReviewStore.review.imageUrl).toBe('2');
    });
  });
});
