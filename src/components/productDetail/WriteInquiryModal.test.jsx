import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';

import { createInquiryStore } from '../../stores/CreateInquiryStore';
import { productStore } from '../../stores/ProductStore';
import { userStore } from '../../stores/UserStore';

import WriteInquiryModal from './WriteInquiryModal';

const setModalOpen = jest.fn();

const context = describe;

describe('WriteInquiryModal', () => {
  const renderWriteInquiryModal = () => render(
    <WriteInquiryModal
      setModalOpen={setModalOpen}
    />,
  );

  beforeEach(() => {
    localStorage.removeItem('accessToken');
    productStore.clear();
    userStore.clear();
    createInquiryStore.clear();
  });

  it('상품문의 작성 폼과 문의를 작성할 상품이름을 보여준다', async () => {
    localStorage.setItem('accessToken', JSON.stringify('ACCESSTOKEN'));

    const productId = 1;

    await userStore.fetchUserInformation();
    await productStore.fetchProduct({ id: productId });

    renderWriteInquiryModal();

    screen.getByLabelText('상품문의 작성');
    screen.getByText('T-shirt');
    screen.getByPlaceholderText('제목');
    screen.getByPlaceholderText('내용을 입력해주세요');
    screen.getByRole('button', { name: '등록' });
  });

  context('제목을 입력하지 않고 등록 버튼을 클릭했을 경우', () => {
    it('제목 혹은 내용을 입력해주세요 에러메시지를 볼 수 있다', async () => {
      localStorage.setItem('accessToken', JSON.stringify('ACCESSTOKEN'));

      const productId = 1;

      await userStore.fetchUserInformation();
      await productStore.fetchProduct({ id: productId });

      renderWriteInquiryModal();

      fireEvent.change(screen.getByLabelText('제목'), { target: { value: '' } });
      fireEvent.click(screen.getByRole('button', { name: '등록' }));

      screen.getByText('제목 혹은 내용을 입력해주세요');
    });
  });

  context('내용을 입력하지 않고 등록 버튼을 클릭했을 경우', () => {
    it('제목 혹은 내용을 입력해주세요 에러메시지를 볼 수 있다', async () => {
      localStorage.setItem('accessToken', JSON.stringify('ACCESSTOKEN'));

      const productId = 1;

      await userStore.fetchUserInformation();
      await productStore.fetchProduct({ id: productId });

      renderWriteInquiryModal();

      fireEvent.change(screen.getByLabelText('제목'), {
        target: { value: '사이즈 문의' },
      });

      fireEvent.change(screen.getByLabelText('상품문의 작성'), {
        target: { value: '' },
      });

      fireEvent.click(screen.getByRole('button', { name: '등록' }));

      screen.getByText('제목 혹은 내용을 입력해주세요');
    });
  });

  context('비밀글 설정 버튼을 클릭했을 경우', () => {
    it('상품문의가 비밀글로 설정된 것을 볼 수 있다', async () => {
      localStorage.setItem('accessToken', JSON.stringify('ACCESSTOKEN'));

      const productId = 1;

      await userStore.fetchUserInformation();
      await productStore.fetchProduct({ id: productId });

      const { container } = renderWriteInquiryModal();

      const toggleButton = container.getElementsByClassName('toggle-secret')[0];

      expect(createInquiryStore.inquiry.type).toBe('PUBLIC');

      fireEvent.click(toggleButton);

      expect(createInquiryStore.inquiry.type).toBe('SECRET');
    });
  });

  context('상품문의가 성공적으로 등록되었을 경우', () => {
    it('상품문의 모달이 닫힌다', async () => {
      localStorage.setItem('accessToken', JSON.stringify('ACCESSTOKEN'));

      const productId = 1;

      await userStore.fetchUserInformation();
      await productStore.fetchProduct({ id: productId });

      renderWriteInquiryModal();

      fireEvent.change(screen.getByLabelText('제목'), {
        target: { value: '사이즈 문의' },
      });

      fireEvent.change(screen.getByLabelText('상품문의 작성'), {
        target: { value: '이렇게 입으면 될까요' },
      });

      fireEvent.click(screen.getByRole('button', { name: '등록' }));

      await waitFor(() => {
        expect(setModalOpen).toBeCalled();
      });
    });
  });
});
