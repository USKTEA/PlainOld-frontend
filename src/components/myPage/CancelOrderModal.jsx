import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import useCancelOrderStore from '../../hooks/useCancelOrderStore';
import useCreateCancelRequestStore from '../../hooks/useCreateCancelRequestStore';
import useGetOrderStore from '../../hooks/useGetOrderStore';

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
  min-height: 20em;
  width: 35em;
  padding: 1.5em;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 3px;
  background-color: white;
`;

const Title = styled.h3`
  font-size: 1.2em;
`;

const Form = styled.div`
  margin-top: 2em;
  width: 100%;
  display: flex;
  flex-direction: column;

  label {
    display: none;
  }

  textarea {
    font-size: .9em;
    height: 15em;
    margin-bottom: 1em;
    padding: 1em;
    border: 1px solid ${defaultTheme.colors.fourth};
    color: ${defaultTheme.colors.primaryText};
    resize: none;
    :focus {
      outline: 1px solid ${defaultTheme.colors.fifth};
    }
  }
`;

const SubContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;

  button {
    height: 3em;
    width: 5em;
    margin-right: 1em;
    cursor: pointer;
  }
`;

const Cancel = styled.button`
  border: none;
  color: white;
  background-color: ${defaultTheme.colors.primary};
`;

const Submit = styled.button`
  border: 1px solid ${defaultTheme.colors.fourth};
  color: ${defaultTheme.colors.fifth};
  background-color: white;
`;

const ErrorMessage = styled.span`
  font-size: .9em;
  margin-top: .9em;
  margin-right: 1em;
  color: red;
`;

export default function CancelOrderModal() {
  const modalRef = useRef();
  const location = useLocation();

  const createCancelRequestStore = useCreateCancelRequestStore();
  const cancelOrderStore = useCancelOrderStore();
  const getOrderStore = useGetOrderStore();

  const { request } = createCancelRequestStore;

  const handler = ({ target }) => {
    if (modalRef.current && !modalRef.current.contains(target)) {
      createCancelRequestStore.clear();
    }
  };

  const handleCloseModal = () => {
    cancelOrderStore.clear();
    createCancelRequestStore.clear();
  };

  const handleChangeContent = (content) => {
    createCancelRequestStore.changeContent(content);
  };

  const handleCancelOrder = async () => {
    const orderNumber = await cancelOrderStore.cancel();

    if (orderNumber) {
      const id = await createCancelRequestStore.submit();

      if (id) {
        await getOrderStore.fetchUserOrders();
        await getOrderStore.fetchOrder({ orderNumber });

        handleCloseModal();
      }
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handler);

    return () => {
      cancelOrderStore.clear();
      createCancelRequestStore.clear();
      document.removeEventListener('mousedown', handler);
    };
  }, [location]);

  return (
    <Container>
      <Wrapper ref={modalRef}>
        <Title>주문 취소</Title>
        <Form>
          <label htmlFor="cancel-reason">취소사유</label>
          <textarea
            name="cancel-reason"
            id="cancel-reason"
            placeholder="사유 입력(선택사항)"
            value={request.content}
            onChange={(e) => handleChangeContent(e.target.value)}
            cols="30"
            rows="10"
          />
        </Form>
        <SubContainer>
          {cancelOrderStore.errors.cancel
            ? (
              <ErrorMessage>
                {cancelOrderStore.errors.cancel}
              </ErrorMessage>
            )
            : null}
          {createCancelRequestStore.errors.submit
            ? (
              <ErrorMessage>
                {createCancelRequestStore.errors.submit}
              </ErrorMessage>
            )
            : null}
          <Cancel
            type="button"
            onClick={handleCloseModal}
          >
            취소
          </Cancel>
          <Submit
            type="button"
            onClick={handleCancelOrder}
          >
            제출
          </Submit>
        </SubContainer>
      </Wrapper>
    </Container>
  );
}
