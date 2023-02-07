import { fireEvent, render, screen } from '@testing-library/react';
import CancelRequestInformationModal from './CancelRequestInformationModal';

const clear = jest.fn();

jest.mock('../../hooks/useGetCancelRequestStore', () => () => ({
  cancelRequest: {
    id: 1,
    orderNumber: 'tjrxo1234-11111111',
    createdAt: '20230210 12:22',
    content: '이래서 취소합니다',
  },
  clear,
}));

const context = describe;

describe('CancelRequestInformationModal', () => {
  it('취소 상세정보를 보여준다', () => {
    render(<CancelRequestInformationModal />);

    screen.getByText('취소 상세정보');
    screen.getByText('취소사유');
    screen.getByRole('button', { name: '확인' });
  });

  context('확인 버튼을 클릭했을 경우', () => {
    it('clear 메서드가 호출된다', () => {
      render(<CancelRequestInformationModal />);

      fireEvent.click(screen.getByRole('button', { name: '확인' }));

      expect(clear).toBeCalled();
    });
  });
});
