import styled from 'styled-components';
import defaultTheme from '../../styles/defaultTheme';

import useProductStore from '../../hooks/useProductStore';

import numberFormat from '../../utils/numberFormat';

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

const NameAndPrice = styled.div`
  border-bottom: 1px solid ${defaultTheme.colors.fourth};
  padding-bottom: 1em;
  margin-bottom: 1em;
`;

const Price = styled.strong`
  font-size: 1em;
  margin-block: 0.75em;
`;

export default function ProductDescription() {
  const productStore = useProductStore();

  const { product } = productStore;

  const {
    name, price, description, shipping,
  } = product;

  return (
    <>
      <NameAndPrice>
        <Title>{name}</Title>
        <Price>{`${numberFormat(price)}원`}</Price>
      </NameAndPrice>
      <p>
        {description.productSummary}
      </p>
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
              {`${numberFormat(shipping.shippingFee)}원`}
              {' '}
              {`(${numberFormat(shipping.freeShippingAmount)}원 이상 무료배송)`}
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}
