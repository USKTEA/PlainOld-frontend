import EditAnswerStore from './EditAnswerStore';

const context = describe;

describe('EditAnswerStore', () => {
  let editAnswerStore;

  beforeEach(() => {
    editAnswerStore = new EditAnswerStore();
  });

  describe('SetAnswer', () => {
    it('수정할 답변을 세팅한다', () => {
      let { answer } = editAnswerStore;

      expect(answer).toBeFalsy();

      editAnswerStore.setAnswer({ id: 1, content: '이런 답변' });

      answer = editAnswerStore.answer;

      expect(answer.id).toBe(1);
      expect(answer.content).toBe('이런 답변');
    });
  });

  describe('ChangeContent', () => {
    it('content를 변경한다', () => {
      let { answer } = editAnswerStore;

      expect(answer).toBeFalsy();

      editAnswerStore.setAnswer({ id: 1, content: '이런 답변' });

      answer = editAnswerStore.answer;

      expect(answer.content).toBe('이런 답변');

      editAnswerStore.changeContent('저런 답변');

      answer = editAnswerStore.answer;

      expect(answer.content).toBe('저런 답변');
    });
  });

  describe('IsAnswerComplete', () => {
    context('answer에 id가 없을 경우', () => {
      it('false를 반환하고 에러를 세팅시킨다', () => {
        expect(editAnswerStore.errors.edit).toBeFalsy();

        editAnswerStore.setAnswer({ id: '', content: '이런 답변' });

        expect(editAnswerStore.isAnswerComplete()).toBeFalsy();

        expect(editAnswerStore.errors.edit).toBeTruthy();
      });
    });

    context('answer에 content가 없을 경우', () => {
      it('false를 반환하고 에러를 세팅시킨다', () => {
        expect(editAnswerStore.errors.edit).toBeFalsy();

        editAnswerStore.setAnswer({ id: 1, content: '' });

        expect(editAnswerStore.isAnswerComplete()).toBeFalsy();

        expect(editAnswerStore.errors.edit).toBeTruthy();
      });
    });

    context('answer에 id content 모두 있을 경우', () => {
      it('true를 반환한다', () => {
        editAnswerStore.setAnswer({ id: 1, content: '이런 답변' });

        expect(editAnswerStore.isAnswerComplete()).toBeTruthy();
      });
    });
  });

  describe('HasError', () => {
    context('에러가 세팅되어 있을 경우', () => {
      it('true를 반환한다', () => {
        expect(editAnswerStore.errors.edit).toBeFalsy();

        editAnswerStore.setAnswer({ id: 1, content: '' });

        expect(editAnswerStore.isAnswerComplete()).toBeFalsy();

        expect(editAnswerStore.errors.edit).toBeTruthy();

        expect(editAnswerStore.hasError()).toBeTruthy();
      });
    });

    context('에러가 없을 경우', () => {
      it('false를 반환한다', () => {
        expect(editAnswerStore.errors.edit).toBeFalsy();
        expect(editAnswerStore.errors.submit).toBeFalsy();

        expect(editAnswerStore.hasError()).toBeFalsy();
      });
    });
  });

  describe('submit', () => {
    context('상품문의를 성공적으로 수정했을 경우', () => {
      it('수정된 상품문의 id를 반환한다', async () => {
        editAnswerStore.setAnswer(
          { id: 1, content: '저런 답변' },
        );

        editAnswerStore.changeContent('이런 답변');

        const id = await editAnswerStore.submit();

        expect(id).toBeTruthy();
      });
    });

    context('상품문의 수정에 실패했을 경우', () => {
      it('에러가 세팅된다', async () => {
        editAnswerStore.setAnswer(
          { id: 9_999_999, content: '이런 답변' },
        );

        editAnswerStore.changeContent('저런 답변');

        const id = await editAnswerStore.submit();

        expect(id).toBeFalsy();

        expect(editAnswerStore.errors.submit).toBeTruthy();
      });
    });
  });
});
