import CreateUserStore from './CreateUserStore';

const context = describe;

describe('CreateUserStore', () => {
  let createUserStore;

  beforeEach(() => {
    createUserStore = new CreateUserStore();
  });

  describe('ChangeField', () => {
    context('올바르지 않은 이메일을 입력했을 경우', () => {
      it('errors의 username에 에러가 세팅된다', () => {
        let { errors } = createUserStore;

        expect(errors.username).toBeFalsy();

        createUserStore.changeField({ username: 'invalid.com' });

        errors = createUserStore.errors;

        expect(errors.username).toBeTruthy();
      });
    });

    context('올바르지 않은 비밀번호를 입력했을 경우', () => {
      it('errors의 password에 에러가 세팅된다', () => {
        let { errors } = createUserStore;

        expect(errors.password).toBeFalsy();

        createUserStore.changeField({ password: 'invalid' });

        errors = createUserStore.errors;

        expect(errors.password).toBeTruthy();
      });
    });

    context('비밀번호와 비밀번호 확인이 일치하지 않는 경우', () => {
      it('errors의 confirmPassword에 에러가 세팅된다', () => {
        let { errors } = createUserStore;

        expect(errors.confirmPassword).toBeFalsy();

        createUserStore.changeField({ password: 'Password1234!' });
        createUserStore.changeField({ confirmPassword: 'notPassword1234!' });

        errors = createUserStore.errors;

        expect(errors.confirmPassword).toBeTruthy();
      });
    });
  });

  describe('HasError', () => {
    it('error가 있을 경우 true를 반환한다', () => {
      const { fields } = createUserStore;

      expect(fields.nickname).toBeFalsy();

      expect(createUserStore.hasError()).toBeTruthy();
    });
  });

  describe('Create', () => {
    context('User를 성공적으로 생성했을 경우', () => {
      it('생성된 user의 username을 반환한다', async () => {
        createUserStore.changeField({ nickname: '김뚜루' });
        createUserStore.changeField({ username: 'tjrxo1234@gmail.com' });
        createUserStore.changeField({ password: 'Password1234!' });
        createUserStore.changeField({ confirmPassword: 'Password1234!' });

        const username = await createUserStore.create();

        expect(username).toBeTruthy();
      });
    });

    context('이메일이 중복인 경우', () => {
      it('errors의 username에  에러가 세팅된다', async () => {
        createUserStore.changeField({ nickname: '김뚜루' });
        createUserStore.changeField({ username: 'rlatjrxo1234@gmail.com' });
        createUserStore.changeField({ password: 'Password1234!' });
        createUserStore.changeField({ confirmPassword: 'Password1234!' });

        await createUserStore.create();

        const { errors } = createUserStore;

        expect(errors.username).toBeTruthy();
      });
    });

    context('User가 정상적으로 생성되지 않았을 경우', () => {
      it('errors의 create에 에러가 세팅된다', async () => {
        createUserStore.changeField({ nickname: '김뚜루' });
        createUserStore.changeField({ username: 'invalid@gmail.com' });
        createUserStore.changeField({ password: 'Password1234!' });
        createUserStore.changeField({ confirmPassword: 'Password1234!' });

        await createUserStore.create();

        const { errors } = createUserStore;

        expect(errors.create).toBeTruthy();
      });
    });
  });
});
