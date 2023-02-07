import { render, screen } from '@testing-library/react';

import { userStore } from '../../stores/user/UserStore';

import UserInformation from './UserInformation';

describe('UserInformation', () => {
  it('유저 정보를 볼 수 있다', async () => {
    localStorage.setItem('accessToken', JSON.stringify('ACCESSTOKEN'));

    await userStore.fetchUserInformation();

    render(<UserInformation />);

    screen.getByText(/김뚜루/);
    screen.getByText(/누적 구매금액:/);
  });
});
