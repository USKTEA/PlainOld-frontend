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

  describe('FetchUserInformation', () => {
    context('AccessToken이 유효한 경우', () => {
      it('AccessToken에 담긴 데이터로 유저정보를 서버로 부터 받아온다', async () => {
        localStorage.setItem('accessToken', JSON.stringify('ACCESSTOKEN'));

        await userStore.fetchUserInformation();

        const { username } = userStore;

        expect(username).toBe('tjrxo1234@gmail.com');
      });
    });

    context('AccessToken이 유효하지 않은 경우', () => {
      it('AccessToken을 삭제한다', async () => {
        localStorage.setItem('accessToken', JSON.stringify('INVALIDACCESSTOKEN'));

        await userStore.fetchUserInformation();

        const accessToken = localStorage.getItem('accessToken');

        expect(accessToken).toBeFalsy();
      });
    });
  });
});
