import { render, screen } from '@testing-library/react';

import { getInquiryStore } from '../../stores/GetInquiryStore';

import QnASection from './QnASection';

const context = describe;

const setRef = () => jest.fn();

describe('QnASection', () => {
  const renderQnASection = () => render(<QnASection setRef={setRef} />);

  beforeEach(() => {
    getInquiryStore.clear();
  });

  context('등록된 상품문의가 없을 경우', () => {
    it('등록된 문의가 없습니다 메시지를 볼 수 있다', async () => {
      const productId = 2;

      await getInquiryStore.fetchInquiries({ productId });

      renderQnASection();

      const { inquiries } = getInquiryStore;

      expect(inquiries).toHaveLength(0);
      screen.getByText('등록된 문의가 없습니다');
    });
  });

  context('등록된 상품문의가 있을 경우', () => {
    it('등록된 문의를 볼 수 있다', async () => {
      const productId = 1;

      await getInquiryStore.fetchInquiries({ productId });

      renderQnASection();

      const { inquiries } = getInquiryStore;

      expect(inquiries).toHaveLength(2);

      screen.getByText('상태');
      screen.getByText('제목');
      screen.getByText('작성자');
      screen.getByText('등록일');

      screen.getByText('처리대기');
      screen.getByText('사이즈 문의드립니다');
      screen.getByText('김뚜루');
      screen.getByText('2023-01-29 14:32');

      screen.getByText('답변완료');
      screen.getByText('비밀글입니다. ⨶');
      screen.getByText('안김뚜루');
      screen.getByText('2023-01-30 14:32');
    });
  });
});
