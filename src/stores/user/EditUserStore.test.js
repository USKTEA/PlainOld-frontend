import EditUserStore from './EditUserStore';

const context = describe;

describe('EditUserStore', () => {
  let editUserStore;

  beforeEach(() => {
    editUserStore = new EditUserStore();
  });

  describe('ChangeNickname', () => {
    it('닉네임을 변경한다', () => {
      let { nickname } = editUserStore;

      expect(nickname).toBeFalsy();

      editUserStore.changeNickname('김뚜루');

      nickname = editUserStore.nickname;

      expect(nickname).toBe('김뚜루');
    });
  });

  describe('ChangeUsername', () => {
    it('username을 변경한다', () => {
      let { username } = editUserStore;

      expect(username).toBeFalsy();

      editUserStore.changeUsername('tjrxo1234@gmail.com');

      username = editUserStore.username;

      expect(username).toBe('tjrxo1234@gmail.com');
    });
  });

  describe('Edit', () => {
    context('username을 정확하게 입력했을 경우', () => {
      it('nickname을 변경하고 변경된 nickname을 반환한다', async () => {
        editUserStore.changeUsername('tjrxo1234@gmail.com');
        editUserStore.changeNickname('김뚜루');

        const nickname = await editUserStore.edit();

        expect(nickname).toBeTruthy();
      });
    });

    context('username을 정확하게 입력하지 않았을 경우', () => {
      it('nickname을 반환하지 않고 에러가 세팅된다', async () => {
        editUserStore.changeUsername('INVALID');
        editUserStore.changeNickname('김뚜루');

        const nickname = await editUserStore.edit();

        expect(nickname).toBeFalsy();
        expect(editUserStore.errors).toBeTruthy();
      });
    });
  });
});
