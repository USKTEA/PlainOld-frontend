import {
  cleanup,
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import LoginForm from './LoginForm';

const context = describe;

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate() {
    return navigate;
  },
}));

describe('LoginForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  context('이메일과 비밀번호를 입력하지 않고 로그인 버튼을 클릭했을 경우', () => {
    it('로그인이 되지 않는다', async () => {
      render(<LoginForm />);

      fireEvent.click(screen.getByRole('button', { name: '로그인' }));

      await waitFor(() => {
        screen.getByText('이메일을 입력해주세요');
        expect(navigate).not.toBeCalled();
      });
    });
  });

  context('이메일을 입력하지 않고 로그인 버튼을 클릭했을 경우', () => {
    it('로그인이 되지 않는다', async () => {
      render(<LoginForm />);

      fireEvent.change(screen.getByPlaceholderText('비밀번호'), {
        target: { value: 'password1234!' },
      });

      fireEvent.click(screen.getByRole('button', { name: '로그인' }));

      await waitFor(() => {
        screen.getByText('이메일을 입력해주세요');
        expect(navigate).not.toBeCalled();
      });
    });
  });

  context('비밀번호를 입력하지 않고 로그인 버튼을 클릭했을 경우', () => {
    it('로그인이 되지 않는다', async () => {
      render(<LoginForm />);

      fireEvent.change(screen.getByPlaceholderText('이메일'), {
        target: { value: 'tjrxo1234@gmail.com' },
      });

      fireEvent.click(screen.getByRole('button', { name: '로그인' }));

      await waitFor(() => {
        screen.getByText('비밀번호를 입력해주세요');
        expect(navigate).not.toBeCalled();
      });
    });
  });

  context('유효한 이메일을 입력하지 않고 로그인 버튼을 클릭했을 경우', () => {
    it('로그인이 되지 않는다', async () => {
      render(<LoginForm />);

      fireEvent.change(screen.getByPlaceholderText('이메일'), {
        target: { value: 'invalidEmail' },
      });

      fireEvent.change(screen.getByPlaceholderText('비밀번호'), {
        target: { value: 'password1234!' },
      });

      fireEvent.click(screen.getByRole('button', { name: '로그인' }));

      await waitFor(() => {
        screen.getByText('아이디 혹은 비밀번호가 맞지 않습니다');
        expect(navigate).not.toBeCalled();
      });
    });
  });

  context('유효한 비밀번호를 입력하지 않고 로그인 버튼을 클릭했을 경우', () => {
    it('로그인이 되지 않는다', async () => {
      render(<LoginForm />);

      fireEvent.change(screen.getByPlaceholderText('이메일'), {
        target: { value: 'tjrxo1234@gmail.com' },
      });

      fireEvent.change(screen.getByPlaceholderText('비밀번호'), {
        target: { value: 'invalidPassword' },
      });

      fireEvent.click(screen.getByRole('button', { name: '로그인' }));

      await waitFor(() => {
        screen.getByText('아이디 혹은 비밀번호가 맞지 않습니다');
        expect(navigate).not.toBeCalled();
        cleanup();
      });
    });
  });

  context('유효한 이메일과 비밀번호를 입력하고 로그인 버튼을 클릭했을 경우', () => {
    it('로그인이 된다', async () => {
      render(<LoginForm />);

      fireEvent.change(screen.getByPlaceholderText('이메일'), {
        target: { value: 'tjrxo1234@gmail.com' },
      });

      fireEvent.change(screen.getByPlaceholderText('비밀번호'), {
        target: { value: 'Password1234!' },
      });

      fireEvent.click(screen.getByRole('button', { name: '로그인' }));

      await waitFor(() => {
        expect(navigate).toBeCalled();
      });
    });
  });
});
