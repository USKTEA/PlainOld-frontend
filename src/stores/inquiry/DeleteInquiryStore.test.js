import DeleteInquiryStore from './DeleteInquiryStore';

const context = describe;

describe('DeleteInquiryStore', () => {
  let deleteInquiryStore;

  beforeEach(() => {
    deleteInquiryStore = new DeleteInquiryStore();
  });

  describe('Delete', () => {
    context('상품문의를 성공적으로 삭제했을 경우', () => {
      it('삭제한 상품문의의 id를 반환받는다', async () => {
        const inquiryId = 1;

        const id = await deleteInquiryStore.delete({ inquiryId });

        expect(id).toBeTruthy();
      });
    });

    context('상품문의를 삭제하는데 실패했을 경우', () => {
      it('상품문의는 삭제되지 않고 에러가 세팅된다', async () => {
        const inquiryId = 9_999_999;

        const id = await deleteInquiryStore.delete({ inquiryId });

        expect(id).toBeFalsy();

        expect(deleteInquiryStore.errors.delete).toBeTruthy();
      });
    });
  });
});
