import styled from 'styled-components';

import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';

import useOrderItemStore from '../hooks/useOrderItemStore';
import useProductStore from '../hooks/useProductStore';

import OrderItem from '../models/OrderItem';

import defaultTheme from '../styles/defaultTheme';

import numberFormat from '../utils/numberFormat';

const Container = styled.div`
  display: flex;
  justify-content: center;

  padding-left: 16em;
  gap: 2em;
  min-width: 1024px;
  height: 100%;
  min-height: 50em;

  padding-block: 5em;
  width: 50%;

  color: ${defaultTheme.colors.primaryText};
`;

const Wrapper = styled.div`
  width: 100%;
  margin-left: 3em;
`;

const NameAndPrice = styled.div`
  border-bottom: 1px solid ${defaultTheme.colors.fourth};
  padding-bottom: 1em;
  margin-bottom: 1em;
`;

const Image = styled.img`
  size: 3em;
  margin-bottom: 1em;
`;

const Title = styled.h1`
  font-size: 1.875em;
  font-weight: 700;
  width: 100%;
  margin-bottom: 0.2em;
  line-height: 1.25em;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const Table = styled.table`
  width: 100%;
  margin-top: 1.5em;
  margin-bottom: 1.5em;
  th, td {
    text-align: left;
    vertical-align: middle;
    font-size: 0.7em;
  }
  th {
    font-weight: 700;
  }
  td {
    font-weight: 1.25em;
  }
  tr {
    height: 1em;
    th:first-child, td:first-child {
      width: 6em;
    }
    th:nth-child(2), td:nth-child(2) {
      width: calc(100% - 6em);
    }
  }
`;

const Message = styled.p`
  font-size: 1.5em;
  font-weight: 500;
  margin-top: 5em;
  text-align: center;

  color: ${defaultTheme.colors.primaryText};
`;

const Price = styled.strong`
  font-size: 1em;
  margin-block: 0.75em;
`;

const ButtonAndPrice = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  border: 1px solid ${defaultTheme.colors.fourth};
`;

const ReduceButton = styled.button`
  width: 1.5em;
  height: 1.5em;
  border: none;
  background: url(/assets/images/minus-black.png) no-repeat 100% 100%;
  background-size: contain;
  text-indent: -10em;
  overflow: hidden;

  cursor: pointer;
`;

const AddButton = styled.button`
  width: 1.5em;
  height: 1.5em;
  border: none;
  background: url(/assets/images/plus-black.png) no-repeat 100% 100%;
  background-size: contain;
  text-indent: -10em;
  overflow: hidden;
  cursor: pointer;
`;

const Quantity = styled.input`
  height: 2em;
  width: 3em;
  font-size: 0.7em;
  border: 1px solid ${defaultTheme.colors.fourth};
`;

const TotalPrice = styled.div`
  margin-top: 1em;
  margin-bottom: 1em;
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    font-size: 0.8em;
    color: #aaa;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const OrderButton = styled(Link)`
 font-size: 0.8em;
  width: 33%;
  height: 3em;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${defaultTheme.colors.secondary};
  color: white;
  cursor: pointer;
  :hover {
    background-color: ${defaultTheme.colors.primaryText}
  }
`;

const Button = styled.button`
  font-size: 0.8em;
  width: 33%;
  height: 3em;
  border: 1px solid ${defaultTheme.colors.fourth};
  color: ${defaultTheme.colors.primaryText};
  background: white;
  cursor: pointer;
  :hover {
    color: ${defaultTheme.colors.third}
  }
`;

export default function ProductDetail() {
  const [, setOrderItems] = useLocalStorage('orderItems', '');

  const productStore = useProductStore();
  const orderItemStore = useOrderItemStore();

  const { product, loading, errors } = productStore;

  useEffect(() => {
    setOrderItems(orderItemStore.orderItems);
  }, [orderItemStore.orderItems]);

  if (loading) {
    return <Message>now loading...</Message>;
  }

  if (!product) {
    return <Message>{errors.loading}</Message>;
  }

  const {
    name, price, description, image, shipping,
  } = product;

  // TODO 옵션이 있으며 옵션 추가 버튼이 보이게 그리고 선택한 옵션상품이 보이도록
  const handleAddOption = () => {
    const orderItem = new OrderItem({
      id: orderItemStore.generateId(),
      productId: product.id,
      price,
      name,
      thumbnailUrl: image.thumbnailUrl,
      shippingFee: shipping.shippingFee,
      freeShippingAmount: shipping.freeShippingAmount,
    });

    orderItemStore.addOrderItem(orderItem);
  };

  const handleChangeQuantity = ({ index, amount }) => {
    orderItemStore.updateQuantity({ index, amount: Number(amount) });
  };

  return (
    <Container>
      <Image
        src={`/assets/images/${image.productImageUrls[0]}.png`}
        alt={name}
        height={450}
        width={450}
      />
      <Wrapper>
        <NameAndPrice>
          <Title>{name}</Title>
          <Price>{`${numberFormat(price)}원`}</Price>
        </NameAndPrice>
        <p>
          {description.productSummary}
        </p>
        <button type="button" onClick={() => handleAddOption()}>
          다른 옵션의 상품 추가하는 버튼
        </button>
        <div />
        <Table>
          <tbody>
            <tr>
              <th>
                배송 방법
              </th>
              <td>
                {shipping.shippingMethod}
              </td>
            </tr>
            <tr>
              <th>
                배송비
              </th>
              <td>
                {shipping.shippingPee}
                {' '}
                {`${numberFormat(shipping.freeShippingAmount)}원 이상 무료배송`}
              </td>
            </tr>
          </tbody>
        </Table>
        <ul>
          {Array.from(
            { length: orderItemStore.numberOfOrderItems() },
            (_, index) => index,
          )
            .map((index) => (
              <li key={orderItemStore.orderItemId(index)}>
                <div>
                  <label htmlFor="quantity">수량</label>
                  <ButtonAndPrice>
                    <ButtonContainer>
                      <ReduceButton
                        type="button"
                        onClick={() => (
                          orderItemStore.decreaseQuantity({ index, amount: -1 })
                        )}
                      >
                        -
                      </ReduceButton>
                      <Quantity
                        id="quantity"
                        name="quantity"
                        type="number"
                        value={orderItemStore.quantityOfOrderItem(index)}
                        onChange={(event) => handleChangeQuantity(
                          { index, amount: event.target.value },
                        )}
                      />
                      <AddButton
                        type="button"
                        onClick={() => (
                          orderItemStore.increaseQuantity({ index, amount: 1 })
                        )}
                      >
                        +
                      </AddButton>
                    </ButtonContainer>
                    <span className="total-price">
                      {`${numberFormat(orderItemStore.orderItemPrice(index))}원`}
                    </span>
                  </ButtonAndPrice>
                </div>
              </li>
            ))}
        </ul>
        <TotalPrice>
          <span>{`총 상품금액(${orderItemStore.totalQuantity()}개)`}</span>
          <strong className="total-cost">
            {`${numberFormat(orderItemStore.totalCost())}원`}
          </strong>
        </TotalPrice>
        <ButtonWrapper>
          <OrderButton to="/order">구매하기</OrderButton>
          <Button>장바구니</Button>
          <Button>♡</Button>
        </ButtonWrapper>
      </Wrapper>
    </Container>
  );
}
