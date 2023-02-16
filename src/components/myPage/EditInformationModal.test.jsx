import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';

import { editUserStore } from '../../stores/user/EditUserStore';
import { getUserStore } from '../../stores/user/GetUserStore';

import EditInformationModal from './EditInformationModal';

const context = describe;

const setModalOpen = jest.fn();

describe('EditInformationModal', () => {
  const renderEditInformation = () => {
    render(<EditInformationModal setModalOpen={setModalOpen} />);
  };

  beforeEach(() => {
    localStorage.removeItem('accessToken');
    jest.clearAllMocks();
    editUserStore.clear();
  });

  describe('닉네임 변경', () => {
    context('이메일을 정확하게 입력했을 경우', () => {
      it('모달창은 닫힌다', async () => {
        localStorage.setItem('accessToken', JSON.stringify('ACCESSTOKEN'));

        await getUserStore.fetchUserInformation();

        renderEditInformation();

        fireEvent.change(screen.getByLabelText('E-mail*'), {
          target: {
            value: 'tjrxo1234@gamil.com',
          },
        });

        fireEvent.change(screen.getByLabelText('닉네임*'), {
          target: {
            value: '김뚜루루',
          },
        });

        fireEvent.click(screen.getByRole('button', { name: '확인' }));

        await waitFor(() => {
          expect(setModalOpen).toBeCalled();
        });
      });
    });

    context('이메일을 정확하게 입력하지 않았을 경우', () => {
      it('모달창은 닫히지 않고 에러메시지를 볼 수 있다', async () => {
        localStorage.setItem('accessToken', JSON.stringify('ACCESSTOKEN'));

        await getUserStore.fetchUserInformation();

        renderEditInformation();

        fireEvent.change(screen.getByLabelText('E-mail*'), {
          target: {
            value: 'INVALID',
          },
        });

        fireEvent.change(screen.getByLabelText('닉네임*'), {
          target: {
            value: '김뚜루루',
          },
        });

        fireEvent.click(screen.getByRole('button', { name: '확인' }));

        await waitFor(() => {
          screen.getByText('정확한 정보를 입력해주세요');
          expect(setModalOpen).not.toBeCalled();
        });
      });
    });
  });
});
