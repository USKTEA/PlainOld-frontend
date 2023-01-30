import styled from 'styled-components';
import defaultTheme from '../../styles/defaultTheme';

const Container = styled.div`
  width: 100%;
  height: 8em;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid ${defaultTheme.colors.fourth};

  strong {
    font-size: .7em;
    font-weight: 100;
    color: ${defaultTheme.colors.primaryText};
  }
`;

export default function EmptyInquiry() {
  return (
    <Container>
      <strong>
        등록된 문의가 없습니다
      </strong>
    </Container>
  );
}
