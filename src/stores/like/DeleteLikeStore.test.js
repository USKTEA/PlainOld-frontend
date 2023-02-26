import DeleteLikeStore from './DeleteLikeStore';

const context = describe;

describe('DeleteLikeStore', () => {
  let deleteLikeStore;

  beforeEach(() => {
    deleteLikeStore = new DeleteLikeStore();
  });

  describe('Delete', () => {
    context('성공적으로 Like를 삭제했을 경우', () => {
      it('삭제한 Like의 id를 반환한다', async () => {
        const likeId = 1;

        const id = await deleteLikeStore.delete(likeId);

        expect(id).toBeTruthy();
      });
    });

    context('성공족으로 Like를 삭제하지 못했을 경우', () => {
      it('id를 반환하지 않고 error가 세팅된다', async () => {
        const likeId = 2;

        const id = await deleteLikeStore.delete(likeId);

        expect(id).toBeFalsy();

        const { errors } = deleteLikeStore;

        expect(errors).toBeTruthy();
      });
    });
  });
});
