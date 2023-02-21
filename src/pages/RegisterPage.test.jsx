import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import RegisterPage from './RegisterPage';

describe('RegisterPage', () => {
  it('회원가입 폼을 볼 수 있다', () => {
    render(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>,
    );

    screen.getByRole('heading', { name: '회원가입' });
  });
});
