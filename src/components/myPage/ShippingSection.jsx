import styled from 'styled-components';
import useEditOrderStore from '../../hooks/useEditOrderStore';
import defaultTheme from '../../styles/defaultTheme';
import EditOrderModal from './EditOrderModal';

const Container = styled.div`
  width: 100%;
  margin-top: 3em;
`;

const Title = styled.h3`
  font-size: 1.2em;
  font-weight: 700;
  color: ${defaultTheme.colors.primaryText};
`;

const Wrapper = styled.div`
  font-size: .95em;
  height: 13em;
  width: 100%;
  margin-top: 1em;
  padding: 1.5em;
  border: 1px solid ${defaultTheme.colors.fourth};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: ${defaultTheme.colors.primaryText};

  span {
    font-weight: 300;
  }
`;

const Receiver = styled.div`
  span {
    margin-right: 4em;
  }
`;

const PhoneNumber = styled.div`
  span {
    margin-right: 4em;
  }
`;

const AddressWrapper = styled.div`
  display: flex;

  span {
    margin-right: 4em;
  }
`;

const Address = styled.div`
  display: flex;
  flex-direction: column;

  strong {
    margin-bottom: .2em;
  }

  button {
    height: 1.5em;
    width: 4em;
    border: 1px solid ${defaultTheme.colors.fourth};
    background-color: white;
    cursor: pointer;
  }
`;

export default function ShippingSection(
  { orderNumber, shippingInformation, status },
) {
  const editOrderStore = useEditOrderStore();
  const { receiver, address, messages } = shippingInformation;

  const handleEditShippingInformation = () => {
    editOrderStore.setOrder({ orderNumber, shippingInformation });
  };

  return (
    <>
      <Container>
        <Title>배송지 정보</Title>
        <Wrapper>
          <Receiver>
            <span>수령인</span>
            <strong>{receiver.name}</strong>
          </Receiver>
          <PhoneNumber>
            <span>연락처</span>
            <strong>{receiver.phoneNumber}</strong>
          </PhoneNumber>
          <AddressWrapper>
            <span>배송지</span>
            <Address>
              <strong>{`(${address.zipCode}) ${address.address1}`}</strong>
              <strong>{address.address2}</strong>
              {status === '입금대기' || status === '배송준비중'
                ? (
                  <button
                    type="button"
                    onClick={handleEditShippingInformation}
                  >
                    수정
                  </button>
                )
                : null }
            </Address>
          </AddressWrapper>
          <div>
            <span>배송메모</span>
            {messages
              ? <span>{messages}</span>
              : null }
          </div>
        </Wrapper>
      </Container>
      {editOrderStore.order
        ? <EditOrderModal />
        : null }
    </>
  );
}
