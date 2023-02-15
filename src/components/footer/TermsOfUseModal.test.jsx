import { render, screen } from '@testing-library/react';
import TermsOfUseModal from './TermsOfUseModal';

describe('TermsOfUseModal', () => {
  it('이용약관을 볼 수 있다', () => {
    render(<TermsOfUseModal />);

    screen.getByText('이용약관');
  });
});
