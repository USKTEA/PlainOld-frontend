import DeleteReplyStore from './DeleteReplyStore';

const context = describe;

describe('DeleteReplyStore', () => {
  let deleteReplyStore;

  beforeEach(() => {
    deleteReplyStore = new DeleteReplyStore();
  });

  context('댓글 삭제를 성공했을 경우', () => {
    it('삭제된 댓글의 id를 받는다', async () => {
      const id = await deleteReplyStore.delete({ id: 1 });

      expect(id).toBe(1);
    });
  });

  context('댓글 삭제를 실패했을 경우', () => {
    it('댓글은 삭제되지 않고 에러가 세팅된다', async () => {
      let { errors } = deleteReplyStore;

      expect(errors.delete).toBeFalsy();

      const id = await deleteReplyStore.delete({ id: 9_999_999 });

      expect(id).toBeFalsy();

      errors = deleteReplyStore.errors;

      expect(errors.delete).toBeTruthy();
    });
  });
});
