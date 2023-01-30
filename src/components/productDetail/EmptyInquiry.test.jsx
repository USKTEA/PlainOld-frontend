import { render, screen } from '@testing-library/react';
import EmptyInquiry from './EmptyInquiry';

describe('EmptyInquiry', () => {
  it('등록된 문의가 없습니다 메시지를 볼 수 있다', () => {
    render(<EmptyInquiry />);

    screen.getByText('등록된 문의가 없습니다');
  });
});
