import styled from 'styled-components';
import useProductStore from '../hooks/useProductStore';
import defaultTheme from '../styles/defaultTheme';
import numberFormat from '../utils/numberFormat';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Message = styled.p`
  font-size: 1.5em;
  font-weight: 500;
  margin-top: 5em;
  text-align: center;

  color: ${defaultTheme.colors.primaryText};
`;

export default function ProductDetail() {
  const productStore = useProductStore();

  const {
    product, loaded, errors,
  } = productStore;

  if (errors.notFound) {
    return <Message>{errors.notFound}</Message>;
  }

  if (!loaded) {
    return <Message>now loading...</Message>;
  }

  const {
    name, price, description, image, shipping,
  } = product;

  return (
    <Container>
      <img
        src={`/assets/images/${image.productImageUrls[0]}.png`}
        alt={name}
        height={300}
        width={300}
      />
      <div>
        <p>{name}</p>
        <p>{`${numberFormat(price)}원`}</p>
      </div>
      <p>
        {description.summary}
      </p>
      <div />
      <table>
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
      </table>
      <div>
        <label htmlFor="quantity">수량</label>
        <div>
          <div>
            <button>-</button>
            <input id="quantity" name="quantity" type="number" />
            <button>+</button>
          </div>
          <p>10,000원</p>
        </div>
      </div>
      <div>
        <span>총 상품금액(1개)</span>
        <strong>10,000원</strong>
      </div>
      <div>
        <button>구매하기</button>
        <button>장바구니</button>
        <button>♡</button>
      </div>
    </Container>
  );
}
