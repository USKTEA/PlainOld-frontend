import GetLikeByUserStore from './GetLikeByUserStore';

const context = describe;

describe('GetLikeByUserStore', () => {
  let getLikeByUserStore;

  beforeEach(() => {
    localStorage.removeItem('accessToken');
    getLikeByUserStore = new GetLikeByUserStore();
  });

  describe('FetchLike', () => {
    context('User의 Like 중 해당 Product의 Like이 있을 경우', () => {
      it('해당 Like를 가져온다', async () => {
        localStorage.setItem('accessToken', JSON.stringify('ACCESSTOKEN'));

        const productId = 1;

        let { likes } = getLikeByUserStore;

        expect(likes).toBeFalsy();

        await getLikeByUserStore.fetchLikes(productId);

        likes = getLikeByUserStore.likes;

        expect(likes).toBeTruthy();
      });
    });

    context('User의 Like 중 해당 Product의 Like이 없을 경우', () => {
      it('아무 것도 가져오지 않는다', async () => {
        localStorage.setItem('accessToken', JSON.stringify('ACCESSTOKEN'));

        const productId = 2;

        let { likes } = getLikeByUserStore;

        expect(likes).toBeFalsy();

        await getLikeByUserStore.fetchLikes(productId);

        likes = getLikeByUserStore.likes;

        expect(likes).toBeFalsy();
      });
    });

    context('User의 Like을 가져오는 도중 에러가 발생했을 경우', () => {
      it('아무 것도 가져오지 않는다', async () => {
        localStorage.setItem('accessToken', 'ACCESSTOKEN');

        const productId = 3;

        let { likes } = getLikeByUserStore;

        expect(likes).toBeFalsy();

        await getLikeByUserStore.fetchLikes(productId);

        likes = getLikeByUserStore.likes;

        expect(likes).toBeFalsy();
      });
    });
  });
});
