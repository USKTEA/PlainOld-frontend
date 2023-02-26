import CreateLikeStore from './CreateLikeStore';

const context = describe;

describe('CreateLikeStore', () => {
  let createLikeStore;

  beforeEach(() => {
    localStorage.removeItem('accessToken');
    createLikeStore = new CreateLikeStore();
  });

  describe('Create', () => {
    context('정상적으로 Like를 생성했을 경우', () => {
      it('생성된 Like의 id를 반환한다', async () => {
        localStorage.setItem('accessToken', JSON.stringify('ACCESSTOKEN'));

        const productId = 2;

        const id = await createLikeStore.create({ productId });

        expect(id).toBeTruthy();
      });
    });

    context('정상적으로 Like를 생성하지 못 했을 경우', () => {
      it('id를 반환하지 않고 에러가 세팅된다', async () => {
        localStorage.setItem('accessToken', JSON.stringify('ACCESSTOKEN'));

        const productId = 1;

        const id = await createLikeStore.create({ productId });

        expect(id).toBeFalsy();

        const { errors } = createLikeStore;

        expect(errors).toBeTruthy();
      });
    });
  });
});
