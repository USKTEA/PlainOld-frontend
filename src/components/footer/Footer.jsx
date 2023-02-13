import styled from 'styled-components';
import defaultTheme from '../../styles/defaultTheme';

const Container = styled.footer`
  font-size: .8em;
  height: 9em;
  width: 95%;
  display: flex;
  margin-left: 3em;
  padding-top: 1.5em;
  padding-bottom: 2em;
  z-index: 1;
  bottom: 0;
  position: fixed;
  border-top: 1px solid ${defaultTheme.colors.fourth};
  background-color: white;
  color: ${defaultTheme.colors.primaryText};

  div {
    width: 35%;
  }

  div:nth-child(3) {
    width: 15%;
  }

  div:last-child {
    width: 15%;
  }
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  letter-spacing: 1.5px;
  strong {
    font-weight: 700;
    margin-bottom: .3em;
  }

  span {
    margin-bottom: .3em;
    margin-bottom: .3em;
  }
`;

export default function Footer() {
  return (
    <Container>
      <Wrapper>
        <strong>Developer</strong>
        <span>Back end / WEB / JAVA / JS</span>
        <span>Republic of Korea</span>
        <span>+82 (0)2-1234-5678 (Mon-Fri 00:00-23:59)</span>
        <span>contact: tjrxo1234@gmail.com</span>
      </Wrapper>
      <Wrapper>
        <strong>notice</strong>
        <span>all product images from</span>
        <span>무신사닷컴(www.musinsa.com)</span>
      </Wrapper>
      <Wrapper>
        <span>Github</span>
        <span>Tistory</span>
      </Wrapper>
      <Wrapper>
        <span>Terms of Use</span>
        <span>Privacy Policy</span>
      </Wrapper>
    </Container>
  );
}
