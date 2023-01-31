import CreateInquiryStore from './CreateInquiryStore';

const context = describe;

describe('CreateInquiryStore', () => {
  let createInquiryStore;

  beforeEach(() => {
    createInquiryStore = new CreateInquiryStore();
  });

  describe('isInquiryComplete', () => {
    context('제목을 작성하지 않았을 경우', () => {
      it('false를 반환한다', () => {
        const { inquiry } = createInquiryStore;

        expect(inquiry.title).toBeFalsy();

        expect(createInquiryStore.isInquiryComplete()).toBeFalsy();
      });
    });
  });

  describe('SubmitInquiry', () => {
    context('상품문의 등록을 성공했을 경우', () => {
      it('등록된 상품문의 id를 반환한다', async () => {
        createInquiryStore.setProductId({ id: 1 });
        createInquiryStore.changeTitle('사이즈 문의');
        createInquiryStore.changeContent('이렇게 입으면 될까요');

        const id = await createInquiryStore.submitInquiry();

        expect(id).toBeTruthy();
      });
    });

    context('상품문의 등록을 실패했을 경우', () => {
      it('에러가 세팅된다', async () => {
        createInquiryStore.setProductId({ id: 9_999_999 });
        createInquiryStore.changeTitle('등록되지 않은 문의');
        createInquiryStore.changeContent('이것도 등록되지 않는다');

        const id = await createInquiryStore.submitInquiry();

        const { errors } = createInquiryStore;

        expect(id).toBeFalsy();
        expect(errors.create).toBeTruthy();
      });
    });
  });

  describe('ChangeTitle', () => {
    it('inquiry의 title을 변경한다', () => {
      let { inquiry } = createInquiryStore;

      expect(inquiry.title).toBeFalsy();

      createInquiryStore.changeTitle('사이즈 문의');

      inquiry = createInquiryStore.inquiry;

      expect(inquiry.title).toBe('사이즈 문의');
    });
  });

  describe('ChangeContent', () => {
    it('inquiry의 content을 변경한다', () => {
      let { inquiry } = createInquiryStore;

      expect(inquiry.content).toBeFalsy();

      createInquiryStore.changeContent('이렇게 입으면 될까요');

      inquiry = createInquiryStore.inquiry;

      expect(inquiry.content).toBe('이렇게 입으면 될까요');
    });
  });

  describe('HasErrors', () => {
    context('Error가 없을 경우', () => {
      it('false를 반환한다', () => {
        const { errors } = createInquiryStore;

        expect(Object.values(errors).filter((error) => error)).toHaveLength(0);
        expect(createInquiryStore.hasErrors()).toBeFalsy();
      });
    });

    context('Error가 있을 경우', () => {
      it('true를 반환한다', () => {
        createInquiryStore.isInquiryComplete();

        const { errors } = createInquiryStore;

        expect(Object.values(errors).filter((error) => error).length).toBeTruthy();
        expect(createInquiryStore.hasErrors()).toBeTruthy();
      });
    });
  });

  describe('ToggleSecret', () => {
    context('inquiry type이 PUBLIC인 경우', () => {
      it('SECRET으로 변경한다', () => {
        let { inquiry } = createInquiryStore;

        expect(inquiry.type).toBe('PUBLIC');

        createInquiryStore.toggleSecret();

        inquiry = createInquiryStore.inquiry;

        expect(inquiry.type).toBe('SECRET');
      });
    });

    context('inquiry type이 SECRET인 경우', () => {
      it('PUBLIC으로 변경한다', () => {
        let { inquiry } = createInquiryStore;

        createInquiryStore.toggleSecret();

        inquiry = createInquiryStore.inquiry;

        expect(inquiry.type).toBe('SECRET');

        createInquiryStore.toggleSecret();

        inquiry = createInquiryStore.inquiry;

        expect(inquiry.type).toBe('PUBLIC');
      });
    });
  });
});
