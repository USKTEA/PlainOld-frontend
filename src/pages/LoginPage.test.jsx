import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import defaultTheme from '../styles/defaultTheme';

import LoginPage from './LoginPage';

describe('LoginPage', () => {
  it('로그인 화면이 보인다', () => {
    render(
      <ThemeProvider theme={defaultTheme}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </ThemeProvider>,
    );

    screen.getByPlaceholderText('이메일');
    screen.getByPlaceholderText('비밀번호');
    screen.getByRole('button', { name: '로그인' });
  });
});
