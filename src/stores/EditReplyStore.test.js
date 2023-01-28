import EditReplyStore from './EditReplyStore';

const context = describe;

describe('EditReplyStore', () => {
  let editReplyStore;

  beforeEach(() => {
    editReplyStore = new EditReplyStore();
  });

  describe('SetToEdit', () => {
    it('수정할 reply를 세팅한다', () => {
      let { toEdit } = editReplyStore;

      expect(toEdit).toEqual({ id: '', reviewId: '', comment: '' });

      editReplyStore.setToEdit({ id: 1, reviewId: 1, comment: '좋습니다' });

      toEdit = editReplyStore.toEdit;

      expect(toEdit.id).toBe(1);
      expect(toEdit.comment).toBe('좋습니다');
    });
  });

  describe('EditComment', () => {
    it('toEdit의 comment를 변경한다', () => {
      let { toEdit } = editReplyStore;

      editReplyStore.setToEdit({ id: 1, reviewId: 1, comment: '좋습니다' });

      toEdit = editReplyStore.toEdit;

      expect(toEdit.comment).toBe('좋습니다');

      editReplyStore.editComment('생각해보니 아주 좋네요');

      toEdit = editReplyStore.toEdit;

      expect(toEdit.comment).toBe('생각해보니 아주 좋네요');
    });
  });

  describe('Validate', () => {
    context('toEdit의 comment가 1글자 이상인 경우', () => {
      it('true를 반환한다', () => {
        expect(editReplyStore.toEdit.comment).toBe('');

        editReplyStore.setToEdit({ id: 1, reviewId: 1, comment: '좋습니다' });

        expect(editReplyStore.toEdit.comment).toBe('좋습니다');

        expect(editReplyStore.validate()).toBeTruthy();
      });
    });

    context('toEdit의 comment가 1글자 미만인 경우', () => {
      it('false를 반환한다', () => {
        expect(editReplyStore.toEdit.comment).toBe('');

        expect(editReplyStore.validate()).toBeFalsy();
      });
    });
  });

  describe('SubmitEdited', () => {
    context('reply 수정이 성공적했을 경우', () => {
      it('수정된 reply의 id를 반환한다', async () => {
        editReplyStore.setToEdit({ id: 1, reviewId: 1, comment: '좋습니다' });

        const id = await editReplyStore.submitEdited();

        expect(id).toBe(1);
      });
    });

    context('reply 수정이 실패했을 경우', () => {
      it('error가 세팅된다', async () => {
        editReplyStore.setToEdit({ id: 9_999_999, reviewId: 1, comment: '좋습니다' });

        const id = await editReplyStore.submitEdited();

        expect(id).toBeFalsy();
        expect(editReplyStore.errors.edit).toBeTruthy();
      });
    });
  });
});
