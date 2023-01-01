import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import OrdererInformation from './OrdererInformation';

import defaultTheme from '../../styles/defaultTheme';

const context = describe;

describe('OrdererInformation', () => {
  const renderOrdererInformation = () => {
    render((
      <ThemeProvider theme={defaultTheme}>
        <MemoryRouter>
          <OrdererInformation />
        </MemoryRouter>
      </ThemeProvider>));
  };

  context('모든 fields를 유효한 값으로 입력한 경우', () => {
    it('에러메시지가 보이지 않는다', () => {
      renderOrdererInformation();

      fireEvent.change(screen.getByPlaceholderText('이름'), {
        target: { value: '김뚜루' },
      });

      fireEvent.change(screen.getByPlaceholderText('연락처'), {
        target: { value: '010-5237-2189' },
      });

      fireEvent.change(screen.getByPlaceholderText('이메일'), {
        target: { value: 'tjrxo1234@gmail.com' },
      });

      expect(screen.queryByText('이름을 다시 확인해주세요')).toBeFalsy();
      expect(screen.queryByText('올바른 전화번호를 입력하세요')).toBeFalsy();
      expect(screen.queryByText('올바른 이메일 입력하세요')).toBeFalsy();
    });
  });

  describe('주문자 이름', () => {
    context('이름을 입력하지 않은 경우', () => {
      it('주문자 이름을 입력해주세요 에러메시지가 보인다', () => {
        renderOrdererInformation();

        fireEvent.change(screen.getByPlaceholderText('이름'), {
          target: { value: '' },
        });

        expect(screen.getByText('주문자 이름을 입력해주세요')).toBeTruthy();
      });
    });

    context('입력한 이름의 길이가 여덟 자가 넘는 경우', () => {
      it('이름을 다시 확인해주세요 에러메시지가 보인다', () => {
        renderOrdererInformation();

        fireEvent.change(screen.getByPlaceholderText('이름'), {
          target: { value: '이건여덟자가넘는이름입니다' },
        });

        expect(screen.getByText('이름을 다시 확인해주세요')).toBeTruthy();
      });
    });

    context('입력한 이름의 길이가 두 글자 미만인 경우', () => {
      it('이름을 다시 확인해주세요 에러메시지가 보인다', () => {
        renderOrdererInformation();

        fireEvent.change(screen.getByPlaceholderText('이름'), {
          target: { value: '두' },
        });

        expect(screen.getByText('이름을 다시 확인해주세요')).toBeTruthy();
      });
    });
  });

  describe('주문자 연락처', () => {
    context('연락처를 입력하지 않았을 경우', () => {
      it('전화번호를 입력하세요 에러메시지가 보인다', () => {
        renderOrdererInformation();

        fireEvent.change(screen.getByPlaceholderText('연락처'), {
          target: { value: '' },
        });

        expect(screen.getByText('전화번호를 입력하세요')).toBeTruthy();
      });
    });

    context('입력한 연락처가 무효한 연락처인 경우', () => {
      it('올바른 전화번호를 입력하세요 에러메시지가 보인다', () => {
        renderOrdererInformation();

        fireEvent.change(screen.getByPlaceholderText('연락처'), {
          target: { value: '213123' },
        });

        expect(screen.getByText('올바른 전화번호를 입력하세요')).toBeTruthy();
      });
    });
  });

  describe('주문자 이메일', () => {
    context('이메일을 입력하지 않았을 경우', () => {
      it('이메일을 입력해주세요 에러메시지가 보인다', () => {
        renderOrdererInformation();

        fireEvent.change(screen.getByPlaceholderText('이메일'), {
          target: { value: '' },
        });

        expect(screen.getByText('이메일을 입력해주세요')).toBeTruthy();
      });
    });

    context('무효한 이메일을 입력했을 경우', () => {
      it('올바른 이메일 입력하세요 에러메시지가 보인다', () => {
        renderOrdererInformation();

        fireEvent.change(screen.getByPlaceholderText('이메일'), {
          target: { value: 'invalidEmail' },
        });

        expect(screen.getByText('올바른 이메일 입력하세요')).toBeTruthy();
      });
    });
  });
});
