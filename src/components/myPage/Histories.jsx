import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';

import styled from 'styled-components';
import defaultTheme from '../../styles/defaultTheme';

import useCancelOrderStore from '../../hooks/useCancelOrderStore';
import useCreateCancelRequestStore from '../../hooks/useCreateCancelRequestStore';
import useGetOrderStore from '../../hooks/useGetOrderStore';

import numberFormat from '../../utils/numberFormat';
import useGetCancelRequestStore from '../../hooks/useGetCancelRequestStore';

const Container = styled.ul`
  margin-top: 1em;
  margin-right: 2em;
`;

const Order = styled.li`
  height: 10em;
  margin-bottom: 1em;
`;

const OrderSummary = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  span {
    font-weight: 300;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${defaultTheme.colors.primaryText};
  }

  button {
    font-size: 1em;
    font-weight: 300;
    border: none;
    margin-left: -6px;
    color: ${defaultTheme.colors.primaryText};
    background-color: white;
    cursor: pointer;
  }
`;

const OrderDetailWrapper = styled.div`
  width: 100%;
  display: flex;
  margin-top: .5em;
  border: 1px solid ${defaultTheme.colors.fourth};
`;

const OrderItem = styled.div`
  width: 90%;
  display: flex;
`;

const OrderDetail = styled.button`
  height: 8em;
  width: 80%;
  border: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  cursor: pointer;
`;

const ImageWrapper = styled.div`
  height: 6em;
  width: 6em;
  display: flex;
  margin-left: 1em;
  margin-right: 1em;
  align-items: center;
  justify-content: center;
  border: 1px solid ${defaultTheme.colors.fourth};
`;

const OrderInformation = styled.div`
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

const Status = styled.div`
  font-size: 1.1em;
  font-weight: 700;
  width: 10%;
  color: ${(props) => (props.canceled ? 'red' : '#2E2C6F')};
`;

const ButtonContainer = styled.div`
  width: 20%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 2em;

  button {
    height: 2.5em;
    width: 5em;
    margin-bottom: .2em;
    border: 1px solid ${defaultTheme.colors.fourth};
    color: ${defaultTheme.colors.primaryText};
    background-color: white;
    cursor: pointer;
  }
`;

export default function Histories({ orders }) {
  const navigate = useNavigate();
  const [, setCurrentOrder] = useLocalStorage('currentOrder', '');

  const getOrderStore = useGetOrderStore();
  const cancelOrderStore = useCancelOrderStore();
  const createCancelRequestStore = useCreateCancelRequestStore();
  const getCancelRequestStore = useGetCancelRequestStore();

  const toDate = (time) => time.split(' ')[0];

  const hasOption = (option) => {
    if (option.size === 'FREE' && option.color === '') {
      return false;
    }

    return true;
  };

  const handleClickOrder = async (orderNumber) => {
    await getOrderStore.fetchOrder({ orderNumber });

    const { order } = getOrderStore;

    if (order) {
      setCurrentOrder(order.orderNumber);
      navigate(`order/${orderNumber}`);
    }
  };

  const handleOpenOrderCancelModal = (orderNumber) => {
    cancelOrderStore.setOrderNumber(orderNumber);
    createCancelRequestStore.setOrderNumber(orderNumber);
  };

  const handleGetCancelRequest = async (orderNumber) => {
    await getCancelRequestStore.fetchCancelRequest({ orderNumber });
  };

  return (
    <Container>
      {orders.map((order) => (
        <Order key={order.orderNumber}>
          <OrderSummary>
            <button
              type="button"
              onClick={() => handleClickOrder(order.orderNumber)}
            >
              {`주문번호  ${order.orderNumber} ▸`}
            </button>
            <span>{`주문일자 ${toDate(order.createdAt)}`}</span>
          </OrderSummary>
          <OrderDetailWrapper>
            <OrderDetail
              type="button"
              onClick={() => handleClickOrder(order.orderNumber)}
            >
              <OrderItem>
                <ImageWrapper>
                  <img
                    src={`/assets/images/${order.orderLines[0].thumbnailUrl}.png`}
                    alt="상품사진"
                    height={60}
                    width={60}
                  />
                </ImageWrapper>
                <OrderInformation>
                  <strong>
                    {order.orderLines[0].productName}
                  </strong>
                  {hasOption(order.orderLines[0].option)
                    ? (
                      <span>
                        {
                          `${order.orderLines[0].option.size}
                        / ${order.orderLines[0].option.color}`
                        }
                      </span>
                    )
                    : null}
                  <span>
                    {`${numberFormat(order.orderLines[0].totalPrice)}원`}
                    {' '}
                    /
                    {' '}
                    {`${order.orderLines[0].quantity} 개`}
                  </span>
                </OrderInformation>
              </OrderItem>
              <Status
                canceled={order.status === '취소완료'}
              >
                {order.status}
              </Status>
            </OrderDetail>
            <ButtonContainer>
              {order.status === '취소완료' ? (
                <button
                  type="button"
                  onClick={() => handleGetCancelRequest(order.orderNumber)}
                >
                  취소상세
                </button>
              ) : null}
              {order.status === '입금대기' || order.status === '배송준비중' ? (
                <button
                  type="button"
                  onClick={() => handleOpenOrderCancelModal(order.orderNumber)}
                >
                  취소
                </button>
              ) : null}
            </ButtonContainer>
          </OrderDetailWrapper>
        </Order>
      ))}
    </Container>
  );
}
