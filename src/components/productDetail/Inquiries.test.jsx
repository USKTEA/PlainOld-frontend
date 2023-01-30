import { render, screen } from '@testing-library/react';

import { getInquiryStore } from '../../stores/GetInquiryStore';

import Inquiries from './Inquiries';

describe('Inquiries', () => {
  beforeEach(() => {
    getInquiryStore.clear();
  });

  it('상품문의를 보여준다', async () => {
    const productId = 1;

    await getInquiryStore.fetchInquiries({ productId });

    render(<Inquiries />);

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
