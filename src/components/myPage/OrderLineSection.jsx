import styled from 'styled-components';
import defaultTheme from '../../styles/defaultTheme';
import numberFormat from '../../utils/numberFormat';

const Container = styled.div`
  width: 100%;
`;

const OrderLineHeader = styled.div`
  height: 2.5em;
  width: 100%;
  display: flex;
  align-items: center;
  border: 1px solid ${defaultTheme.colors.fourth};

  div {
    font-size: .9em;
    font-weight: 300;
    height: 100%;
    padding-left: 1em;
    display: flex;
    align-items: center;
    border-right: 1px solid ${defaultTheme.colors.fourth};
    color: ${defaultTheme.colors.primaryText}
  }

  div:first-child {
    width: 60%;
  }

  div:nth-child(2) {
    width: 15%;
    padding-left: 0;
    justify-content: center;
  }

  div:nth-child(3) {
    width: 25%;
    padding-left: 3em;
    border: none;
  }
`;

const OrderLineDetail = styled.div`
  width: 100%;
  border-left: 1px solid ${defaultTheme.colors.fourth};
  border-right: 1px solid ${defaultTheme.colors.fourth};
  display: flex;

  ul {
    width: 60%;
  }
`;

const OrderItem = styled.li`
  font-size: .9em;
  height: 7em;
  width: 100%;
  padding: 1em;
  display: flex;
  align-items: center;
  border-right: 1px solid ${defaultTheme.colors.fourth};
  border-bottom: 1px solid ${defaultTheme.colors.fourth};
`;

const ImageWrapper = styled.div`
  height: 5.5em;
  width: 5.5em;
  display: flex;
  margin-left: 1em;
  margin-right: 1em;
  padding: 1em;
  align-items: center;
  justify-content: center;
  border: 1px solid ${defaultTheme.colors.fourth};
`;

const OrderInformation = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: left;
  color: ${defaultTheme.colors.primaryText};

  strong {
    font-size: 1.1em;
    font-weight: 700;
    margin-bottom: .2em;
  }
`;

const ShippingFee = styled.div`
  width: 15%;
  padding-left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 1px solid ${defaultTheme.colors.fourth};
  border-bottom: 1px solid ${defaultTheme.colors.fourth};
  color: ${defaultTheme.colors.primaryText};
`;

const Status = styled.div`
  width: 25%;
  padding-left: 3em;
  padding-right: 2em;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid ${defaultTheme.colors.fourth};

  div {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
      font-weight: 700;
      color: ${(props) => (props.canceled ? 'red' : '#2E2C6F')};
    }
  }

  button {
    font-size: .9em;
    height: 2.5em;
    width: 5em;
    border: 1px solid ${defaultTheme.colors.fourth};
    color: ${defaultTheme.colors.primaryText};
    background-color: white;
    cursor: pointer;
  }
`;

export default function OrderLineSection({ orderLines, shippingFee, status }) {
  const hasOption = (option) => {
    if (option.size === 'FREE' && option.color === '') {
      return false;
    }

    return true;
  };

  return (
    <Container>
      <OrderLineHeader>
        <div>상품 정보</div>
        <div>배송비</div>
        <div>진행상태</div>
      </OrderLineHeader>
      <OrderLineDetail>
        <ul>
          {orderLines.map((orderLine) => (
            <OrderItem key={orderLine.productName
            + orderLine.option.color
            + orderLine.option.size}
            >
              <ImageWrapper>
                <img
                  src={`/assets/images/${orderLine.thumbnailUrl}.png`}
                  alt="상품사진"
                  height={60}
                  width={60}
                />
              </ImageWrapper>
              <OrderInformation>
                <strong>
                  {orderLine.productName}
                </strong>
                {hasOption(orderLine.option)
                  ? (
                    <span>
                      {
                        `${orderLine.option.size}
                    / ${orderLine.option.color}`
                      }
                    </span>
                  )
                  : null}
                <span>
                  {`${numberFormat(orderLine.totalPrice)}원`}
                  {' '}
                  /
                  {' '}
                  {`${orderLine.quantity} 개`}
                </span>
              </OrderInformation>
            </OrderItem>
          ))}
        </ul>
        <ShippingFee>
          {shippingFee
            ? <span>{`${numberFormat(shippingFee)}원`}</span>
            : <span>무료</span>}
        </ShippingFee>
        <Status
          canceled={status === '취소완료'}
        >
          <div>
            <span>{status}</span>
            <button
              type="button"
            >
              취소
            </button>
          </div>
        </Status>
      </OrderLineDetail>
    </Container>
  );
}
