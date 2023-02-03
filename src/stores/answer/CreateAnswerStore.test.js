import CreateAnswerStore from './CreateAnswerStore';

const context = describe;

describe('CreateAnswerStore', () => {
  let createAnswerStore;

  beforeEach(() => {
    createAnswerStore = new CreateAnswerStore();
  });

  describe('SetInquiryId', () => {
    it('답변할 상품문의를 세팅한다', () => {
      let { answer } = createAnswerStore;
      const inquiryId = 1;

      expect(answer.inquiryId).toBeFalsy();

      createAnswerStore.setInquiryId({ inquiryId });

      answer = createAnswerStore.answer;
      expect(answer.inquiryId).toBe(1);
    });
  });

  describe('ChangeContent', () => {
    it('답변 내용을 변경한다', () => {
      let { answer } = createAnswerStore;

      expect(answer.content).toBeFalsy();

      createAnswerStore.changeContent('이런 답변');

      answer = createAnswerStore.answer;

      expect(answer.content).toBe('이런 답변');
    });
  });

  describe('IsAnswerComplete', () => {
    context('inquiryId와 content 모두 값이 경우', () => {
      it('true를 반환한다', () => {
        const inquiryId = 1;

        createAnswerStore.setInquiryId({ inquiryId });
        createAnswerStore.changeContent('이런 답변');

        expect(createAnswerStore.isAnswerComplete()).toBeTruthy();
      });
    });
  });

  context('inquiryId 혹은 content 값이 없을 경우', () => {
    it('false를 반환하고 에러가 세팅된다', () => {
      expect(createAnswerStore.answer.inquiryId).toBeFalsy();
      expect(createAnswerStore.errors).toBeFalsy();

      expect(createAnswerStore.isAnswerComplete()).toBeFalsy();
      expect(createAnswerStore.errors).toBeTruthy();
    });
  });

  describe('Submit', () => {
    context('답변이 성공적으로 제출되었을 경우', () => {
      it('등록된 답변의 id를 반환한다', async () => {
        const inquiryId = 1;

        createAnswerStore.setInquiryId({ inquiryId });
        createAnswerStore.changeContent('이런 답변');

        const id = await createAnswerStore.submit();

        expect(id).toBeTruthy();
      });
    });

    context('답변이 등록되지 않았을 경우', () => {
      it('반환받는 id가 없고 에러가 세팅된다', async () => {
        const inquiryId = 9_999_999;

        createAnswerStore.setInquiryId({ inquiryId });
        createAnswerStore.changeContent('이런 답변');

        const id = await createAnswerStore.submit();

        expect(id).toBeFalsy();
        expect(createAnswerStore.errors).toBeTruthy();
      });
    });
  });
});
