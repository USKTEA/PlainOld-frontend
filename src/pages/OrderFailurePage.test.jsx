import { render, screen } from '@testing-library/react';

import OrderFailurePage from './OrderFailurePage';

describe('OrderFailurePage', () => {
  it('주문 결과를 알려준다', () => {
    render(<OrderFailurePage />);

    screen.getByText('주문이 정상적으로 처리되지 않았습니다.');
  });
});
