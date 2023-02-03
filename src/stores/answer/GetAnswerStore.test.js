import GetAnswerStore from './GetAnswerStore';

const context = describe;

describe('GetAnswerStore', () => {
  let getAnswerStore;

  beforeEach(() => {
    getAnswerStore = new GetAnswerStore();
  });

  describe('FetchAnswers', () => {
    context('보내는 상품문의id에 답변이 있을 경우', () => {
      it('상품문의 답변을 받는다', async () => {
        let { answers } = getAnswerStore;
        const inquiryIds = [4];

        expect(answers.size).toBeFalsy();

        await getAnswerStore.fetchAnswers({ inquiryIds });

        answers = getAnswerStore.answers;

        expect(answers.size).toBeTruthy();
      });
    });
  });
});
