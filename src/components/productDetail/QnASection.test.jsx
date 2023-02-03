import { fireEvent, render, screen } from '@testing-library/react';

import { getInquiryStore } from '../../stores/inquiry/GetInquiryStore';
import { productStore } from '../../stores/product/ProductStore';
import { userStore } from '../../stores/user/UserStore';

import QnASection from './QnASection';

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate() {
    return navigate;
  },
}));

const context = describe;

describe('QnASection', () => {
  const setRef = () => jest.fn();

  const renderQnASection = () => render(<QnASection setRef={setRef} />);

  beforeEach(() => {
    localStorage.removeItem('accessToken');
    getInquiryStore.clear();
    userStore.clear();
    productStore.clear();
  });

  describe('상품문의', () => {
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
    });
  });

  describe('상품문의 작성', () => {
    context('로그인을 하지 않았을 경우', () => {
      it('상품문의 작성 버튼을 클릭하면 로그인화면으로 이동한다', async () => {
        const productId = 1;

        await productStore.fetchProduct({ id: productId });
        await getInquiryStore.fetchInquiries({ productId });

        renderQnASection();

        fireEvent.click(screen.getByRole('button', { name: '상품문의' }));

        expect(navigate).toBeCalledWith('/login');
      });
    });

    context('로그인을 했을 경우', () => {
      it('상품문의 작성 모달을 볼 수 있다', async () => {
        localStorage.setItem('accessToken', JSON.stringify('ACCESSTOKEN'));
        const productId = 1;

        await userStore.fetchUserInformation();
        await productStore.fetchProduct({ id: productId });
        await getInquiryStore.fetchInquiries({ productId });

        renderQnASection();

        fireEvent.click(screen.getByRole('button', { name: '상품문의' }));

        screen.getByLabelText('상품문의 작성');
      });
    });
  });

  describe('상품문의 클릭', () => {
    context('내가 작성한 상품문의일 경우', () => {
      it('문의내용과 수정 및 삭제버튼을 볼 수 있다', async () => {
        localStorage.setItem('accessToken', JSON.stringify('ACCESSTOKEN'));
        const productId = 1;

        await userStore.fetchUserInformation();
        await productStore.fetchProduct({ id: productId });
        await getInquiryStore.fetchInquiries({ productId });

        renderQnASection();

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

        renderQnASection();

        fireEvent.click(screen.getByRole('button', { name: /색상 문의드립니다/ }));

        screen.getByText('이런 색상인가요');
        expect(screen.queryByRole('button', { name: '수정' })).toBeFalsy();
        expect(screen.queryByRole('button', { name: '삭제' })).toBeFalsy();
      });
    });
  });
});
