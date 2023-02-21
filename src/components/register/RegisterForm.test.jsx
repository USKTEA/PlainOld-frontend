import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import { createUserStore } from '../../stores/user/CreateUserStore';
import RegisterForm from './RegisterForm';

const context = describe;

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate() {
    return navigate;
  },
}));

describe('RegisterForm', () => {
  window.alert = jest.fn();

  beforeEach(() => {
    createUserStore.clear();
  });

  it('회원가입 폼을 볼 수 있다', () => {
    render(<RegisterForm />);

    screen.getByRole('heading', { name: '회원가입' });
    screen.getByLabelText('이메일:');
    screen.getByLabelText('닉네임:');
    screen.getByLabelText('비밀번호:');
    screen.getByRole('button', { name: '회원가입' });
  });

  context('이메일을 정확하게 입력하지 않았을 경우', () => {
    it('이메일 관련 에러메시지를 볼 수 있다', () => {
      render(<RegisterForm />);

      fireEvent.change(screen.getByLabelText('이메일:'), {
        target: {
          value: 'Invalid.com',
        },
      });

      screen.getByText('올바른 이메일을 입력해주세요');
    });
  });

  context('비밀번호를 정확하게 입력하지 않았을 경우', () => {
    it('비밀번호 관련 에러메시지를 볼 수 있다', () => {
      render(<RegisterForm />);

      fireEvent.change(screen.getByLabelText('비밀번호:'), {
        target: {
          value: 'invalid',
        },
      });

      screen.getByText('올바른 비밀번호를 입력해주세요');
    });
  });

  context('비밀번호 확인과 비밀번호가 일치하지 않는 경우', () => {
    it('비밀번호 확인 관련 에러메시지를 볼 수 있다', () => {
      render(<RegisterForm />);

      fireEvent.change(screen.getByLabelText('비밀번호:'), {
        target: {
          value: 'Password1234!',
        },
      });

      fireEvent.change(screen.getByLabelText('비밀번호 확인:'), {
        target: {
          value: 'notPassword1234!',
        },
      });

      screen.getByText('비밀번호가 일치하지 않습니다');
    });
  });

  context('닉네임을 입력하지 않고 회원가입 버튼을 클릭했을 경우', () => {
    it('닉네임을 입력해주세요 에러메시지를 볼 수 있다', () => {
      render(<RegisterForm />);

      fireEvent.change(screen.getByLabelText('이메일:'), {
        target: {
          value: 'tjrxo1234@gmail.com',
        },
      });

      fireEvent.change(screen.getByLabelText('비밀번호:'), {
        target: {
          value: 'Password1234!',
        },
      });

      fireEvent.change(screen.getByLabelText('비밀번호 확인:'), {
        target: {
          value: 'Password1234!',
        },
      });

      fireEvent.click(screen.getByRole('button', { name: '회원가입' }));

      screen.getByText('닉네임을 입력해주세요');
    });
  });

  context('이메일을 입력하지 않고 회원가입 버튼을 클릭했을 경우', () => {
    it('이메일을 입력해주세요 에러메시지를 볼 수 있다', () => {
      render(<RegisterForm />);

      fireEvent.change(screen.getByLabelText('닉네임:'), {
        target: {
          value: '이것은 닉네임',
        },
      });

      fireEvent.change(screen.getByLabelText('비밀번호:'), {
        target: {
          value: 'Password1234!',
        },
      });

      fireEvent.change(screen.getByLabelText('비밀번호 확인:'), {
        target: {
          value: 'Password1234!',
        },
      });

      fireEvent.click(screen.getByRole('button', { name: '회원가입' }));

      screen.getByText('이메일을 입력해주세요');
    });
  });

  context('비밀번호를 입력하지 않고 회원가입 버튼을 클릭했을 경우', () => {
    it('이메일을 입력해주세요 에러메시지를 볼 수 있다', () => {
      render(<RegisterForm />);

      fireEvent.change(screen.getByLabelText('닉네임:'), {
        target: {
          value: '이것은 닉네임',
        },
      });

      fireEvent.change(screen.getByLabelText('이메일:'), {
        target: {
          value: 'tjrxo1234@gmail.com',
        },
      });

      fireEvent.click(screen.getByRole('button', { name: '회원가입' }));

      expect(screen.getAllByText('비밀번호를 입력해주세요')).toHaveLength(2);
    });
  });

  context('회원가입을 성공적으로 진행됐을 경우', () => {
    it('로그인페이지로 이동된다', async () => {
      render(<RegisterForm />);

      fireEvent.change(screen.getByLabelText('닉네임:'), {
        target: {
          value: '이것은 닉네임',
        },
      });

      fireEvent.change(screen.getByLabelText('이메일:'), {
        target: {
          value: 'tjrxo1234@gmail.com',
        },
      });

      fireEvent.change(screen.getByLabelText('비밀번호:'), {
        target: {
          value: 'Password1234!',
        },
      });

      fireEvent.change(screen.getByLabelText('비밀번호 확인:'), {
        target: {
          value: 'Password1234!',
        },
      });

      fireEvent.click(screen.getByRole('button', { name: '회원가입' }));

      await waitFor(() => {
        expect(navigate).toBeCalledWith('/login');
      });
    });
  });
});
