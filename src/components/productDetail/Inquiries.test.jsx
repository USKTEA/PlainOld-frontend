import { fireEvent, render, screen } from '@testing-library/react';

import { getAnswerStore } from '../../stores/answer/GetAnswerStore';
import { getInquiryStore } from '../../stores/inquiry/GetInquiryStore';
import { productStore } from '../../stores/product/ProductStore';
import { userStore } from '../../stores/user/UserStore';

import Inquiries from './Inquiries';

const context = describe;

describe('Inquiries', () => {
  beforeEach(() => {
    getAnswerStore.clear();
    getInquiryStore.clear();
    productStore.clear();
    userStore.clear();
  });

  it('상품문의를 보여준다', async () => {
    const productId = 1;

    await getInquiryStore.fetchInquiries({ productId });

    render(<Inquiries />);

    const { inquiries } = getInquiryStore;

    expect(inquiries).toHaveLength(3);

    screen.getByText('상태');
    screen.getByText('제목');
    screen.getByText('작성자');
    screen.getByText('등록일');

    expect(screen.getAllByText('처리대기').length).toBeTruthy();
    screen.getByText(/사이즈 문의드립니다/);
    screen.getByText('김뚜루');
    screen.getByText('2023-01-29 14:32');

    screen.getByText('답변완료');
    screen.getByText('비밀글입니다. ⨶');
    expect(screen.getAllByText('안김뚜루').length).toBeTruthy();
    screen.getByText('2023-01-30 14:32');
  });

  describe('상품문의 클릭', () => {
    context('내가 작성한 상품문의일 경우', () => {
      it('문의내용과 수정 및 삭제버튼을 볼 수 있다', async () => {
        localStorage.setItem('accessToken', JSON.stringify('ACCESSTOKEN'));
        const productId = 1;

        await userStore.fetchUserInformation();
        await productStore.fetchProduct({ id: productId });
        await getInquiryStore.fetchInquiries({ productId });

        render(<Inquiries />);

        fireEvent.click(screen.getByRole('button', { name: /사이즈 문의드립니다/ }));

        screen.getByText('이렇게 입으면 클까요');
        expect(screen.queryByRole('button', { name: '수정' })).toBeTruthy();
        expect(screen.queryByRole('button', { name: '삭제' })).toBeTruthy();
      });
    });

    context('내가 작성한 상품문의가 아닐 경우', () => {
      it('문의내용은 보이나 수정 및 삭제버튼은 보이지 않는다', async () => {
        localStorage.setItem('accessToken', JSON.stringify('ACCESSTOKEN'));
        const productId = 1;

        await userStore.fetchUserInformation();
        await productStore.fetchProduct({ id: productId });
        await getInquiryStore.fetchInquiries({ productId });

        render(<Inquiries />);

        fireEvent.click(screen.getByRole('button', { name: /색상 문의드립니다/ }));

        screen.getByText('이런 색상인가요');
        expect(screen.queryByRole('button', { name: '수정' })).toBeFalsy();
        expect(screen.queryByRole('button', { name: '삭제' })).toBeFalsy();
      });
    });

    context('비밀글일 경우', () => {
      it('상품문의 모달은 보이지 않는다', async () => {
        localStorage.setItem('accessToken', JSON.stringify('ACCESSTOKEN'));
        const productId = 1;

        await userStore.fetchUserInformation();
        await productStore.fetchProduct({ id: productId });
        await getInquiryStore.fetchInquiries({ productId });

        render(<Inquiries />);

        fireEvent.click(screen.getByRole('button', { name: '비밀글입니다. ⨶' }));

        expect(screen.queryByRole('button', { name: '✕' })).toBeFalsy();
        expect(screen.queryByRole('button', { name: '작성' })).toBeFalsy();
      });
    });
  });

  describe('상품문의에 답변이 있을 경우', () => {
    it('답변의 개수를 볼 수 있다', async () => {
      localStorage.setItem('accessToken', JSON.stringify('ACCESSTOKEN'));
      const productId = 3;
      const inquiryIds = [4];

      await userStore.fetchUserInformation();
      await productStore.fetchProduct({ id: productId });
      await getInquiryStore.fetchInquiries({ productId });
      await getAnswerStore.fetchAnswers({ inquiryIds });

      render(<Inquiries />);

      screen.getByText('이렇게 입으면 될까요 1');
    });
  });
});
