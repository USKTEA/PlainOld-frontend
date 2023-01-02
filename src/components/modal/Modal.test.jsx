import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Modal from './Modal';

const context = describe;
const setModalOpen = jest.fn();

describe('Modal', () => {
  context('모달이 띄어질 경우', () => {
    it('props로 전달된 내용을 반영해 화면에 보여준다', () => {
      render(
        <MemoryRouter>
          <Modal
            setModalOpen={setModalOpen}
            message="선택하신 상품을 장바구니에 담았습니다."
            to="/cart"
            firstButton="계속 쇼핑"
            secondButton="장바구니"
          />
        </MemoryRouter>,
      );

      screen.getByText('선택하신 상품을 장바구니에 담았습니다.');
      screen.getByRole('button', { name: '계속 쇼핑' });

      expect(screen.getByText('장바구니').closest('a'))
        .toHaveAttribute('href', '/cart');
    });
  });
});
