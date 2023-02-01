import GetInquiryStore from './GetInquiryStore';

const context = describe;

describe('GetInquiryStore', () => {
  let getInquiryStore;

  beforeEach(() => {
    getInquiryStore = new GetInquiryStore();
  });

  context('상품문의가 있을 경우', () => {
    it('상품문의들을 받아온다', async () => {
      let { inquiries } = getInquiryStore;

      expect(inquiries).toHaveLength(0);

      await getInquiryStore.fetchInquiries({ productId: 1 });

      inquiries = getInquiryStore.inquiries;

      expect(inquiries).toHaveLength(3);
    });
  });

  context('상품문의가 없을 경우', () => {
    it('빈 배열을 반환한다', async () => {
      let { inquiries } = getInquiryStore;

      expect(inquiries).toHaveLength(0);

      await getInquiryStore.fetchInquiries({ productId: 2 });

      inquiries = getInquiryStore.inquiries;

      expect(inquiries).toEqual([]);
    });
  });
});
