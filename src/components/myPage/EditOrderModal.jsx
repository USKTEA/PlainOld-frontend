import { useEffect, useRef } from 'react';

import styled from 'styled-components';

import useEditOrderStore from '../../hooks/useEditOrderStore';
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
  transform: translate(20%, 50%);
  min-height: 21em;
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

const EditForm = styled.div`
  width: 100%;
  margin-top: 2em;
  margin-left: 2em;

  div {
    width: 95%;
    margin-bottom: 1.5em;
    display: flex;

    label {
      width: 20%;
      font-weight: 300;
      margin-right: 1em;
      display: flex;

      color: ${defaultTheme.colors.primaryText};
    }

    input {
      font-size: 1em;
      height: 1.5em;
      width: 70%;
      padding-bottom: .4em;
      border: none;
      border-bottom: 1px solid ${defaultTheme.colors.fourth};
      :focus {
        outline: none;
      }
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
    border: none;
    color: ${defaultTheme.colors.thirdText};
    background-color: white;
    cursor: pointer;
  }
`;

const ErrorMessage = styled.span`
  font-size: .9em;
  margin-top: .9em;
  color: red;
`;

export default function EditOrderModal() {
  const modalRef = useRef(null);

  const editOrderStore = useEditOrderStore();
  const getOrderStore = useGetOrderStore();

  const { order } = editOrderStore;

  const handler = ({ target }) => {
    if (modalRef.current && !modalRef.current.contains(target)) {
      editOrderStore.clear();
    }
  };

  const handleCloseModal = () => {
    editOrderStore.clear();
  };

  const handleChangeInformation = (item) => {
    editOrderStore.changeInformation(item);
  };

  const handleSubmitOrder = async () => {
    if (!editOrderStore.isComplete()) {
      return;
    }

    const orderNumber = await editOrderStore.submit();

    if (orderNumber) {
      await getOrderStore.fetchOrder({ orderNumber });

      editOrderStore.clear();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handler);

    return () => {
      editOrderStore.clear();
      document.removeEventListener('mousedown', handler);
    };
  }, []);

  return (
    <Container>
      <Wrapper ref={modalRef}>
        <Title>배송정보 수정</Title>
        <EditForm>
          <div>
            <label htmlFor="receiver-name">수령인 이름</label>
            <input
              id="receiver-name"
              name="receiver"
              type="text"
              value={order.name}
              onChange={(e) => handleChangeInformation({ name: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="phone-number">연락처</label>
            <input
              id="phone-number"
              name="phoneNumber"
              type="text"
              value={order.phoneNumber}
              onChange={(e) => handleChangeInformation(
                { phoneNumber: e.target.value },
              )}
            />
          </div>
          <div>
            <label htmlFor="zip-code">우편번호</label>
            <input
              id="zip-code"
              name="zipCode"
              type="text"
              value={order.zipCode}
              onChange={(e) => handleChangeInformation(
                { zipCode: e.target.value },
              )}
            />
          </div>
          <div>
            <label htmlFor="address1">주소</label>
            <input
              id="address1"
              name="address"
              type="text"
              value={order.address1}
              onChange={(e) => handleChangeInformation(
                { address1: e.target.value },
              )}
            />
          </div>
          <div>
            <label htmlFor="address2">상세주소</label>
            <input
              id="address2"
              name="addressDetail"
              type="text"
              value={order.address2}
              onChange={(e) => handleChangeInformation(
                { address2: e.target.value },
              )}
            />
          </div>
          <div>
            <label htmlFor="message">배송메모</label>
            <input
              id="message"
              name="message"
              type="text"
              value={order.message}
              onChange={(e) => handleChangeInformation(
                { message: e.target.value },
              )}
            />
          </div>
        </EditForm>
        <SubContainer>
          {editOrderStore.isComplete()
            ? null
            : <ErrorMessage>{editOrderStore.getError()}</ErrorMessage>}
          <button
            type="button"
            onClick={handleCloseModal}
          >
            취소
          </button>
          <button
            type="button"
            onClick={handleSubmitOrder}
          >
            저장
          </button>
        </SubContainer>
      </Wrapper>
    </Container>
  );
}
