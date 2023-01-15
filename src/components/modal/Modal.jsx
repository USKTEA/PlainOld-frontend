import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';
import defaultTheme from '../../styles/defaultTheme';

const Container = styled.div`
  position: absolute;
  width: 130%;
  height: 120%;
  display: flex;
  top: -10em;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 999;
`;

const Wrapper = styled.div`
  height: 10em;
  width: 18em;
  background-color: white;
  border-radius: 3px;
  box-shadow: 1px 1px 5px 0px;

  p {
    font-size: .9em;
    color: ${defaultTheme.colors.thirdText};
  }
`;

const Message = styled.p`
  height: 8em;
  border-bottom: 1px solid ${defaultTheme.colors.fourth};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonContainer = styled.div`
  font-size: .7em;
  height: 4em;
  width: 100%;
  display: flex;
  color: ${defaultTheme.colors.thirdText};
`;

const OrderButton = styled.button`
  font-size: .9em;
  border: none;
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 3px;
  cursor: pointer;
`;

const RedirectButton = styled(Link)`
  font-size: .9em;
  width: 50%;
  border-left: 1px solid ${defaultTheme.colors.fourth};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export default function Modal({
  setModalOpen, message, to, firstButton, secondButton,
}) {
  const closeModal = () => {
    setModalOpen((previous) => !previous);
  };

  const modalRef = useRef(null);

  const handler = ({ target }) => {
    if (modalRef.current && !modalRef.current.contains(target)) {
      setModalOpen((previous) => !previous);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handler);

    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <Container>
      <Wrapper ref={modalRef}>
        <Message>
          {message}
        </Message>
        <ButtonContainer>
          <OrderButton
            type="button"
            onClick={closeModal}
          >
            {firstButton}
          </OrderButton>
          <RedirectButton
            to={to}
          >
            {secondButton}
          </RedirectButton>
        </ButtonContainer>
      </Wrapper>
    </Container>
  );
}
