import DeleteAnswerStore from './DeleteAnswerStore';

const context = describe;

describe('DeleteAnswerStore', () => {
  let deleteAnswerStore;

  beforeEach(() => {
    deleteAnswerStore = new DeleteAnswerStore();
  });

  describe('Delete', () => {
    context('답변을 성공적으로 삭제했을 경우', () => {
      it('삭제된 answer의 id를 반환한다', async () => {
        const answerId = 1;

        const id = await deleteAnswerStore.delete({ answerId });

        expect(id).toBeTruthy();
      });
    });

    context('답변삭제를 실패했을 경우', () => {
      it('answer은 삭제되지 않고 에러가 세팅된다', async () => {
        const answerId = 9_999_999;

        const id = await deleteAnswerStore.delete({ answerId });

        expect(id).toBeFalsy();

        expect(deleteAnswerStore.errors.delete).toBeTruthy();
      });
    });
  });
});
