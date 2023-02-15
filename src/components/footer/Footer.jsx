import { useState } from 'react';
import styled from 'styled-components';
import defaultTheme from '../../styles/defaultTheme';
import PrivacyPolicyModal from './PrivacyPolicyModal';
import TermsOfUseModal from './TermsOfUseModal';

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

  a {
    color: ${defaultTheme.colors.primaryText};
  }

  button {
    font-size: .9em;
    letter-spacing: 1.5px;
    padding: 0;
    border: none;
    display: inline-flex;
    align-items: flex-start;
    background-color: white;
    color: ${defaultTheme.colors.primaryText};
    cursor: pointer;
  }
`;

export default function Footer() {
  const [termsOfUseOpen, setTermsOfUseOpen] = useState(false);
  const [privacyPolicyOpen, setPrivacyPolicyOpen] = useState(false);

  const handleOpenTermsOfUse = () => {
    setTermsOfUseOpen(true);
  };

  const handleOpenPrivacyPolicy = () => {
    setPrivacyPolicyOpen(true);
  };

  return (
    <>
      <Container>
        <Wrapper>
          <strong>Developer</strong>
          <span>Back End / WEB / JAVA / JS</span>
          <span>Republic of Korea</span>
          <span>010-5237-2189 (Mon-Fri 08:00-22:00)</span>
          <span>contact: tjrxo1234@gmail.com</span>
        </Wrapper>
        <Wrapper>
          <strong>notice</strong>
          <span>all product images from</span>
          <span>무신사닷컴(www.musinsa.com)</span>
        </Wrapper>
        <Wrapper>
          <a
            href="https://github.com/USKTEA"
          >
            Github
          </a>
          <a
            href="https://ddurubird.tistory.com/"
          >
            Tistory
          </a>
        </Wrapper>
        <Wrapper>
          <button
            type="button"
            onClick={handleOpenTermsOfUse}
          >
            Terms of Use
          </button>
          <button
            type="button"
            onClick={handleOpenPrivacyPolicy}
          >
            Privacy Policy
          </button>
        </Wrapper>
      </Container>
      {termsOfUseOpen
      && (
        <TermsOfUseModal
          setModalOpen={setTermsOfUseOpen}
        />
      )}
      {privacyPolicyOpen
      && (
        <PrivacyPolicyModal
          setModalOpen={setPrivacyPolicyOpen}
        />
      )}
    </>
  );
}
