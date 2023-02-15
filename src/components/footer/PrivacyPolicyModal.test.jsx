import { render, screen } from '@testing-library/react';
import PrivacyPolicyModal from './PrivacyPolicyModal';

describe('PrivacyPolicyModal', () => {
  it('개인정보처리방침을 보여준다', () => {
    render(<PrivacyPolicyModal />);

    screen.getByText('개인정보처리방침');
  });
});
