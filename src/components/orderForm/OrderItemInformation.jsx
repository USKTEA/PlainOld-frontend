import styled from 'styled-components';

import { Link } from 'react-router-dom';

import useOrderItemStore from '../../hooks/useOrderItemStore';

import SubSection from '../ui/Subsection';
import SubTitle from '../ui/SubTitle';

import numberFormat from '../../utils/numberFormat';

import defaultTheme from '../../styles/defaultTheme';

const OrderItemList = styled.ul`
  max-height: 15em;
  overflow: auto;
  border: 1px solid ${defaultTheme.colors.fourth};
  li {
    border-bottom: 1px solid ${defaultTheme.colors.fourth};
  }

  li:last-child {
    border-bottom: none;
  }
`;

const OrderItem = styled.div`
  display: flex;
`;

const Image = styled.img`
  margin: 1em;
`;

const ItemInformation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  span {
    margin-bottom: .5em;
  }
`;

const Quantity = styled.span`
  font-size: .8em;
  color:${defaultTheme.colors.fourth};
`;

const OrderItemPrice = styled.strong`
  font-weight: 600;
  color: ${defaultTheme.colors.primary};
`;

const ShippingFeeInformation = styled.div`
  height: 2.5em;
  padding: 1em 0;
  border: 1px solid ${defaultTheme.colors.fourth};
  border-top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${defaultTheme.colors.background};
  span {
    font-size: 0.9em;
    color: #888;
    margin-right: .5em;
  }
`;

const ShippingFee = styled.strong`
  font-weight: 700;
  color: ${defaultTheme.colors.primaryText};
`;

export default function OrderItemInformation() {
  const orderItemStore = useOrderItemStore();

  const { orderItems } = orderItemStore;

  return (
    <SubSection>
      <SubTitle>주문 상품 정보</SubTitle>
      <OrderItemList>
        {orderItemStore.items().map((item) => (
          <li key={item.id}>
            <Link to={`/products/${item.productId}`}>
              <OrderItem>
                <Image
                  src={`/assets/images/${item.thumbnailUrl}.png`}
                  alt={item.name}
                  height={70}
                  width={70}
                />
                <ItemInformation>
                  <span>{item.name}</span>
                  <Quantity>{`${item.quantity}개`}</Quantity>
                  <OrderItemPrice>
                    {`${numberFormat(item.totalPrice)}원`}
                  </OrderItemPrice>
                </ItemInformation>
              </OrderItem>
            </Link>
          </li>
        ))}
      </OrderItemList>
      <ShippingFeeInformation>
        <span>배송비</span>
        {
          orderItems.calculateShippingFee() === 0
            ? (
              <ShippingFee>
                무료
              </ShippingFee>
            )
            : (
              <ShippingFee>
                {
                  `${numberFormat(orderItems.calculateShippingFee())}원`
                }
              </ShippingFee>
            )
        }
      </ShippingFeeInformation>
    </SubSection>
  );
}
