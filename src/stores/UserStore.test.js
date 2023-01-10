import UserStore from './UserStore';

const context = describe;

describe('UserStore', () => {
  let userStore;

  beforeEach(() => {
    userStore = new UserStore();
  });

  describe('Login', () => {
    context('로그인에 성공했을 경우', () => {
      it('AccessToken을 반환 받는다', async () => {
        const username = 'tjrxo1234@gmail.com';
        const password = 'Password1234!';

        const accessToken = await userStore.login({ username, password });

        expect(accessToken).toBeTruthy();
      });
    });

    context('로그인에 실패했을 경우', () => {
      it('AccessToken을 반환 받지 않고 error가 세팅된다', async () => {
        const username = 'xxx';
        const password = 'xxx';

        const accessToken = await userStore.login({ username, password });

        expect(accessToken).toBeFalsy();
        expect(userStore.errors.login).toBeTruthy();
      });
    });
  });
});
