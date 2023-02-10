import OAuthStore from './OAuthStore';

const context = describe;

describe('OAuthStore', () => {
  let oAuthStore;

  beforeEach(() => {
    oAuthStore = new OAuthStore();
  });

  describe('GetRedirectUrl', () => {
    context('정상적인 provider인 경우', () => {
      it('redirectUrl을 반환한다', async () => {
        const provider = 'kakao';
        const redirectUrl = await oAuthStore.getRedirectUrl(
          { provider },
        );

        expect(redirectUrl).toBeTruthy();
      });
    });

    context('비정상적인 provider인 경우', () => {
      it('redirectUrl을 반환하지 않는다', async () => {
        const provider = 'INVALID';
        const redirectUrl = await oAuthStore.getRedirectUrl(
          { provider },
        );

        expect(redirectUrl).toBeFalsy();
      });
    });
  });

  describe('LoginWithOAuth', () => {
    context('성공적으로 로그인을 했을 경우', () => {
      it('accessToken을 반환받는다', async () => {
        const code = 'CODE';
        const provider = 'kakao';

        const accessToken = await oAuthStore.login({ provider, code });

        expect(accessToken).toBeTruthy();
      });
    });

    context('로그인에 실패했을 경우', () => {
      it('accessToken을 반환받지 않는다', async () => {
        const code = 'INVALIDCODE';
        const provider = 'kakao';

        const accessToken = await oAuthStore.login({ provider, code });

        expect(accessToken).toBeFalsy();
      });
    });
  });
});
