import CreateReplyStore from './CreateReplyStore';

const context = describe;

describe('CreateReplyStore', () => {
  let createReplyStore;

  beforeEach(() => {
    createReplyStore = new CreateReplyStore();
  });

  describe('대댓글', () => {
    describe('Create', () => {
      context('댓글 생성에 성공했을 경우', () => {
        it('reply 정보를 서버에 제출하고 생성된 reply의 id를 반환받는다', async () => {
          createReplyStore.change('이것은 댓글!');

          const id = await createReplyStore.create({ reviewId: 1 });

          expect(id).toBe(1);
        });
      });

      context('댓글 생성에 실패했을 경우', () => {
        it('reply는 생성되지 않고 에러가 세팅된다', async () => {
          createReplyStore.change('이것은 댓글!');

          const id = await createReplyStore.create({ reviewId: 9_999_999 });

          expect(id).toBeFalsy();

          expect(createReplyStore.errors.create).toBeTruthy();
        });
      });
    });

    describe('Change', () => {
      it('comment 변경한다', () => {
        let { reply } = createReplyStore;

        expect(reply.comment).toBe('');

        createReplyStore.change('이것은 댓글!');

        reply = createReplyStore.reply;

        expect(reply.comment).toBe('이것은 댓글!');
      });
    });

    describe('Validate', () => {
      context('comment가 1글자 이상인 경우', () => {
        it('true를 반환한다', () => {
          let { reply } = createReplyStore;

          expect(reply.comment).toBe('');

          createReplyStore.change('한글자');

          reply = createReplyStore.reply;

          expect(reply.comment).toBe('한글자');

          expect(createReplyStore.validate()).toBeTruthy();
        });
      });

      context('comment값이 없는 경우', () => {
        it('false를 반환한다', () => {
          const { reply } = createReplyStore;

          expect(reply.comment).toBe('');

          expect(createReplyStore.validate()).toBeFalsy();
        });
      });
    });
  });

  describe('댓글', () => {
    describe('SetToReply', () => {
      it('어떤 댓글에 댓글을 달지 세팅한다', () => {
        let { toReply } = createReplyStore;

        expect(toReply).toBeFalsy();

        createReplyStore.setToReply({ replyId: 1 });

        toReply = createReplyStore.toReply;

        expect(toReply).toBe(1);
      });
    });

    describe('SetParent', () => {
      it('댓글을 달 대댓글을 세팅한다', () => {
        let { replyToReply } = createReplyStore;

        expect(replyToReply.parent).toBeFalsy();

        createReplyStore.setParent(1);

        replyToReply = createReplyStore.replyToReply;

        expect(replyToReply.parent).toBe(1);
      });
    });
  });

  describe('ChangeReplyToReply', () => {
    it('replyToReply의 comment를 변경한다', () => {
      let { replyToReply } = createReplyStore;

      expect(replyToReply.comment).toBeFalsy();

      createReplyStore.changeReplyToReply('정말 좋나요?');

      replyToReply = createReplyStore.replyToReply;

      expect(replyToReply.comment).toBe('정말 좋나요?');
    });
  });

  describe('ValidateReplyToReply', () => {
    context('comment가 1글자 이상인 경우', () => {
      it('true를 반환한다', () => {
        let { replyToReply } = createReplyStore;

        expect(replyToReply.comment).toBe('');

        createReplyStore.changeReplyToReply('한글자');

        replyToReply = createReplyStore.replyToReply;

        expect(replyToReply.comment).toBe('한글자');

        expect(createReplyStore.validateReplyToReply()).toBeTruthy();
      });
    });

    context('comment값이 없는 경우', () => {
      it('false를 반환한다', () => {
        const { replyToReply } = createReplyStore;

        expect(replyToReply.comment).toBe('');

        expect(createReplyStore.validateReplyToReply()).toBeFalsy();
      });
    });
  });

  describe('CreateReplyToReply', () => {
    context('댓글 생성에 성공했을 경우', () => {
      it('reply 정보를 서버에 제출하고 생성된 reply의 id를 반환받는다', async () => {
        createReplyStore.changeReplyToReply('이것은 댓글!');

        const id = await createReplyStore.createReplyToReply({ reviewId: 1 });

        expect(id).toBe(1);
      });
    });

    context('댓글 생성에 실패했을 경우', () => {
      it('reply는 생성되지 않고 에러가 세팅된다', async () => {
        createReplyStore.changeReplyToReply('이것은 댓글!');

        const id = await createReplyStore.createReplyToReply(
          { reviewId: 9_999_999 },
        );

        expect(id).toBeFalsy();

        expect(createReplyStore.errors.create).toBeTruthy();
      });
    });
  });
});
