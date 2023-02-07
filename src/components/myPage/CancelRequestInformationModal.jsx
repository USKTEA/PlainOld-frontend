import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import useGetCancelRequestStore from '../../hooks/useGetCancelRequestStore';
import defaultTheme from '../../styles/defaultTheme';

const Container = styled.div`
  position: absolute;
  width: 120%;
  height: 120em;
  top: -10em;
  left: -10em;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 999;
`;

const Wrapper = styled.div`
  top: 50%;
  left: 50%;
  transform: translate(20%, -30%);
  min-height: 13em;
  width: 25em;
  padding: 1.5em;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 3px;
  background-color: white;
`;

const Title = styled.h3`
  font-size: 1.1em;
  width: 100%;
  padding-bottom: .2em;
  border-bottom: 1px solid ${defaultTheme.colors.fourth};
`;

const Information = styled.div`
  height: 5em;
  width: 100%;
  margin-top: 1em;
  border-bottom: 1px solid ${defaultTheme.colors.fourth};

  div {
    height: 2em;
    width: 100%;
    font-size: .9em;

    span {
      margin-right: 2em;
      color: ${defaultTheme.colors.fourthText};
    }

    strong {
      color: ${defaultTheme.colors.thirdText}
    }
  }
`;

const ButtonWrapper = styled.div`
  width: 100%;
  margin-top: 1em;
  display: flex;
  justify-content: end;
`;

const Button = styled.button`
  height: 2em;
  width: 3em;
  border: none;
  color: white;
  background-color: ${defaultTheme.colors.primary};
  cursor: pointer;
`;

export default function CancelRequestInformationModal() {
  const modalRef = useRef();

  const getCancelRequestStore = useGetCancelRequestStore();
  const { cancelRequest } = getCancelRequestStore;

  const handler = ({ target }) => {
    if (modalRef.current && !modalRef.current.contains(target)) {
      getCancelRequestStore.clear();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handler);

    return () => {
      getCancelRequestStore.clear();
      document.removeEventListener('mousedown', handler);
    };
  }, []);

  return (
    <Container>
      <Wrapper ref={modalRef}>
        <Title>취소 상세정보</Title>
        <Information>
          <div>
            <span>주문번호</span>
            <strong>{cancelRequest.orderNumber}</strong>
          </div>
          <div>
            <span>취소 시간</span>
            <strong>{cancelRequest.createdAt}</strong>
          </div>
          <div>
            <span>취소사유</span>
            <strong>
              {cancelRequest.content
                ? cancelRequest.content
                : '-'}
            </strong>
          </div>
        </Information>
        <ButtonWrapper>
          <Button
            type="button"
            onClick={() => getCancelRequestStore.clear()}
          >
            확인
          </Button>
        </ButtonWrapper>
      </Wrapper>
    </Container>
  );
}
