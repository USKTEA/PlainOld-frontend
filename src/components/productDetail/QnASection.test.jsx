import { fireEvent, render, screen } from '@testing-library/react';

import { getInquiryStore } from '../../stores/GetInquiryStore';
import { productStore } from '../../stores/ProductStore';
import { userStore } from '../../stores/UserStore';

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
});
