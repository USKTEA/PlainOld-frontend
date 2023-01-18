import { render, screen } from '@testing-library/react';

import ScrollCommand from './ScrollCommand';

describe('ScrollCommand', () => {
  it('페이지 스크롤을 조작할 수 있는 버튼을 볼 수 있다', () => {
    render(<ScrollCommand />);

    screen.getByRole('button', { name: '상세정보' });
    screen.getByRole('button', { name: 'Review' });
    screen.getByRole('button', { name: 'Q&A' });
  });
});
