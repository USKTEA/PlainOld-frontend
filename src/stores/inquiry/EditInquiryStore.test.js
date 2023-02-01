import EditInquiryStore from './EditInquiryStore';

const context = describe;

describe('EditInquiryStore', () => {
  let editInquiryStore;

  const toEdit = {
    id: 1,
    productId: 1,
    status: 'PENDING',
    type: 'PUBLIC',
    title: '사이즈 문의드립니다',
    content: '이렇게 입으면 클까요',
    querist: {
      username: 'tjrxo1234@gmail.com',
      nickname: '김뚜루',
    },
    createdAt: '2023-01-29 14:32',
  };

  beforeEach(() => {
    editInquiryStore = new EditInquiryStore();
  });

  describe('SetInquiry', () => {
    it('편집할 상품문의를 세팅한다', () => {
      let { inquiry } = editInquiryStore;

      expect(inquiry).toBeFalsy();

      editInquiryStore.setInquiry(
        { id: toEdit.id, title: toEdit.title, content: toEdit.content },
      );

      inquiry = editInquiryStore.inquiry;

      expect(inquiry).toBeTruthy();
    });
  });

  describe('ChangeTitle', () => {
    it('수정할 상품문의 제목을 변경한다', () => {
      editInquiryStore.setInquiry(
        { id: toEdit.id, title: toEdit.title, content: toEdit.content },
      );

      let { inquiry } = editInquiryStore;

      expect(inquiry.content).toBe('이렇게 입으면 클까요');

      editInquiryStore.changeTitle('실은 이런 제목입니다');

      inquiry = editInquiryStore.inquiry;

      expect(inquiry.title).toBe('실은 이런 제목입니다');
    });
  });

  describe('ChangeContent', () => {
    it('수정할 상품문의 내용을 변경한다', () => {
      editInquiryStore.setInquiry(
        { id: toEdit.id, title: toEdit.title, content: toEdit.content },
      );

      let { inquiry } = editInquiryStore;

      expect(inquiry.content).toBe('이렇게 입으면 클까요');

      editInquiryStore.changeContent('이렇게 입으면 작겠죠');

      inquiry = editInquiryStore.inquiry;

      expect(inquiry.content).toBe('이렇게 입으면 작겠죠');
    });
  });

  describe('IsInquiryComplete', () => {
    context('inquiry에 id가 없을 경우', () => {
      it('false를 반환하고 에러를 세팅시킨다', () => {
        expect(editInquiryStore.errors.edit).toBeFalsy();

        editInquiryStore.setInquiry({ id: '', title: toEdit.title, content: toEdit.content });

        expect(editInquiryStore.isInquiryComplete()).toBeFalsy();

        expect(editInquiryStore.errors.edit).toBeTruthy();
      });
    });

    context('inquiry에 title이 없을 경우', () => {
      it('false를 반환하고 에러를 세팅시킨다', () => {
        expect(editInquiryStore.errors.edit).toBeFalsy();

        editInquiryStore.setInquiry(
          { id: 1, title: '', content: toEdit.content },
        );

        expect(editInquiryStore.isInquiryComplete()).toBeFalsy();

        expect(editInquiryStore.errors.edit).toBeTruthy();
      });
    });

    context('inquiry에 content가 없을 경우', () => {
      it('false를 반환하고 에러를 세팅시킨다', () => {
        expect(editInquiryStore.errors.edit).toBeFalsy();

        editInquiryStore.setInquiry({ id: 1, content: '' });

        expect(editInquiryStore.isInquiryComplete()).toBeFalsy();

        expect(editInquiryStore.errors.edit).toBeTruthy();
      });
    });

    context('inquiry에 id, title, content 모두 있을 경우', () => {
      it('true를 반환한다', () => {
        editInquiryStore.setInquiry({ id: 1, title: '이런 제목', content: '이런 상품문의' });

        expect(editInquiryStore.isInquiryComplete()).toBeTruthy();
      });
    });
  });

  describe('HasError', () => {
    context('에러가 세팅되어 있을 경우', () => {
      it('true를 반환한다', () => {
        expect(editInquiryStore.errors.edit).toBeFalsy();

        editInquiryStore.setInquiry({ id: 1, content: '' });

        expect(editInquiryStore.isInquiryComplete()).toBeFalsy();

        expect(editInquiryStore.errors.edit).toBeTruthy();

        expect(editInquiryStore.hasError()).toBeTruthy();
      });
    });

    context('에러가 없을 경우', () => {
      it('false를 반환한다', () => {
        expect(editInquiryStore.errors.edit).toBeFalsy();
        expect(editInquiryStore.errors.submit).toBeFalsy();

        expect(editInquiryStore.hasError()).toBeFalsy();
      });
    });
  });

  describe('submit', () => {
    context('상품문의를 성공적으로 수정했을 경우', () => {
      it('수정된 상품문의 id를 반환한다', async () => {
        editInquiryStore.setInquiry(
          { id: toEdit.id, title: toEdit.title, content: toEdit.content },
        );

        editInquiryStore.changeContent('이렇게 입으면 작겠죠');

        const id = await editInquiryStore.submit();

        expect(id).toBeTruthy();
      });
    });

    context('상품문의 수정에 실패했을 경우', () => {
      it('에러가 세팅된다', async () => {
        editInquiryStore.setInquiry(
          { id: 9_999_999, title: toEdit.title, content: toEdit.content },
        );

        editInquiryStore.changeContent('이렇게 입으면 작겠죠');

        const id = await editInquiryStore.submit();

        expect(id).toBeFalsy();

        expect(editInquiryStore.errors.submit).toBeTruthy();
      });
    });
  });
});
