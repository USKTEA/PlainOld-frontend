import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { createCancelRequestStore } from '../../stores/cancelRequest/CreateCancelRequestStore';
import { cancelOrderStore } from '../../stores/order/CancelOrderStore';

import CancelOrderModal from './CancelOrderModal';

const context = describe;

describe('CancelOrderModal', () => {
  const renderCancelOrderModal = () => {
    render((
      <MemoryRouter>
        <CancelOrderModal />
      </MemoryRouter>));
  };

  beforeEach(() => {
    createCancelRequestStore.clear();
  });

  it('주문취소 모달을 보여준다', () => {
    renderCancelOrderModal();

    screen.getByText('주문 취소');
    screen.getByLabelText('취소사유');
    screen.getByRole('button', { name: '취소' });
    screen.getByRole('button', { name: '제출' });
  });

  describe('주문취소', () => {
    context('주문 취소를 실패했을 경우', () => {
      it('에러메시지를 볼 수 있다', async () => {
        const orderNumber = 'INVALID';

        cancelOrderStore.setOrderNumber(orderNumber);
        createCancelRequestStore.setOrderNumber(orderNumber);

        renderCancelOrderModal();

        fireEvent.click(screen.getByRole('button', { name: '제출' }));

        await waitFor(() => {
          screen.getByText('잠시 후 다시 시도해주세요');
        });
      });
    });
  });
});
