import GetReplyStore from './GetReplyStore';

const context = describe;

describe('GetReplyStore', () => {
  let getReplyStore;

  beforeEach(() => {
    getReplyStore = new GetReplyStore();
  });

  context('fetchReplies', () => {
    context('review에 해당하는 reply가 있을 경우', () => {
      it('reviewId에 해당하는 reply를 서버로 부터 받아온다', async () => {
        expect(getReplyStore.replies.size).toBe(0);

        const reviewIds = [3, 4];

        await getReplyStore.fetchReplies({ reviewIds });

        expect(getReplyStore.replies.size).toBe(1);
      });
    });
  });
});
