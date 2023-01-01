import { render, screen } from '@testing-library/react';
import ErrorPage from './ErrorPage';

describe('ErrorPage', () => {
  it('잘못된 요청임을 알려준다', () => {
    render(<ErrorPage />);

    screen.getByText('잘못된 요청입니다');
  });
});
