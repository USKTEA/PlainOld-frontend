import styled from 'styled-components';
import defaultTheme from '../../styles/defaultTheme';

import useOrderItemStore from '../../hooks/useOrderItemStore';

import SubSection from '../ui/Subsection';
import SubTitle from '../ui/SubTitle';

import numberFormat from '../../utils/numberFormat';

const Table = styled.table`
  width: 100%;
  font-size: 1em;

  th, td {
    text-align: left;
    vertical-align: middle;
  }
  th{
    font-size: 0.9em;
    color: ${defaultTheme.colors.third};
  }
  tr {
    height: 2em;
    th:nth-child(2), td:nth-child(2) {
      text-align: right;
    }
  }

  tr:last-child {
    height: 3em;
    border-top: 1px solid ${defaultTheme.colors.fourth};

    th {
      font-size: 1.1em;
      font-weight: 200;
    }
  }

  strong {
    font-size: 1.1em;
  }
`;

const ShippingFee = styled.strong`
  font-weight: 700;
  color: ${defaultTheme.colors.primary};
`;

export default function OrderSummary() {
  const orderItemStore = useOrderItemStore();

  const { orderItems } = orderItemStore;

  return (
    <SubSection>
      <SubTitle>주문 요약</SubTitle>
      <Table>
        <tbody>
          <tr>
            <th>상품가격</th>
            <td>
              {`${numberFormat(orderItems.totalCost())}원`}
            </td>
          </tr>
          <tr>
            <th>배송비</th>
            {orderItems.calculateShippingFee() === 0
              ? <td>무료</td>
              : (
                <td>
                  {`+${numberFormat(orderItems.calculateShippingFee())}원`}
                </td>
              )}
          </tr>
          <tr>
            <th>총 주문금액</th>
            <td>
              <ShippingFee>
                {`${numberFormat(orderItems.totalCost()
                 + orderItems.calculateShippingFee())}원`}
              </ShippingFee>
            </td>
          </tr>
        </tbody>
      </Table>
    </SubSection>
  );
}
