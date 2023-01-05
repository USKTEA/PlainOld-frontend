import { Link } from 'react-router-dom';

import styled from 'styled-components';

import defaultTheme from '../../styles/defaultTheme';

const Table = styled.table`
  border-top: 1px solid ${defaultTheme.colors.fourth};
  border-bottom: 1px solid ${defaultTheme.colors.fourth} ;
  width: 100%;
  border-collapse: collapse;

  thead {
    font-size: .9em;
    border-bottom: 1px solid ${defaultTheme.colors.fourth};
    height: 2.5em;
  }

  th, td {
    vertical-align: middle;
    text-align: center;
    font-size: .8em;
    color: ${defaultTheme.colors.sixth};
  }

  tr {
    border-bottom: 1px solid ${defaultTheme.colors.fourth};
  }

  th:first-child {
    text-align: left;
  }

  th:nth-child(2) {
    text-align: left;
    width: 50%;
  }

  td:nth-child(2) {
    text-align: left;
  }

  td {
    border-right: 1px solid ${defaultTheme.colors.fourth};
    height: 8em;
    div {
      display: flex;
      align-items: center;
    }
  }

  td:last-child {
    border: none;
  }

  strong {
    font-size: 1.3em;
    font-weight: 700;
    margin-bottom: .5em;
    color: ${defaultTheme.colors.primary};
  }
`;

const Item = styled(Link)`
  width: 90%;
  display: flex;
  color: ${defaultTheme.colors.primary};
`;

const ImageContainer = styled.div`
  width: 6em;
  padding: .5em;
  margin-right: 1em;
  border: 1px solid ${defaultTheme.colors.fourth};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: 1.3em;
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

const DirectPurchase = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const PurchaseButton = styled.button`
  display: block;
  font-size: 0.8em;
  width: 50%;
  height: 3em;
  border: 1px solid ${defaultTheme.colors.fourth};
  color: white;
  background: ${defaultTheme.colors.secondary};
  cursor: pointer;
  :hover {
    background-color: ${defaultTheme.colors.primaryText}
  }
`;

const CancelButton = styled.button`
  font-weight: 100;
  width: 5%;
  height: 2em;
  border: none;
  background: white;
  cursor: pointer;

  :hover {
    background-color: ${defaultTheme.colors.secondary};
    color: white;
  }
  :active {
    background-color: ${defaultTheme.colors.primary};
    color: white;
  }
`;

const DeleteButton = styled.button`
  font-size: 0.7em;
  height: 2.5em;
  border: 1px solid ${defaultTheme.colors.fourth};
  margin-top: 1em;
  padding: .2em .6em;
  display: block;
  color: ${defaultTheme.colors.fifth};
  background-color: white;
  cursor: pointer;
  :hover {
    border: 1px solid ${defaultTheme.colors.red}
  }
`;

export default function CartItems() {
  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>
              <label className="control control--checkbox">
                <input type="checkbox" className="js-check-all" />
                <div className="control__indicator" />
              </label>
            </th>
            <th>상품 정보</th>
            <th>수량</th>
            <th>주문금액</th>
            <th>배송 정보</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>
              <label className="control control--checkbox">
                <input
                  id="agree-all-agreements"
                  type="checkbox"
                  name="agree-all-agreements"
                  readOnly
                />
              </label>
            </th>
            <td>
              <div>
                <Item to="/products/1">
                  <ImageContainer>
                    <img
                      src="/assets/images/1.png"
                      alt="상품이미지"
                      height={60}
                      width={60}
                    />
                  </ImageContainer>
                  <div>
                    <span>T-Shirt</span>
                  </div>
                </Item>
                <CancelButton>X</CancelButton>
              </div>
            </td>
            <td>
              <ButtonContainer>
                <ReduceButton
                  type="button"
                />
                <Quantity
                  value={1}
                  type="number"
                />
                <AddButton
                  type="button"
                />
              </ButtonContainer>
            </td>
            <td>
              <DirectPurchase>
                <strong>60,000원</strong>
                <PurchaseButton>바로구매</PurchaseButton>
              </DirectPurchase>
            </td>
            <td>무료</td>
          </tr>
          <tr>
            <th>
              <label className="control control--checkbox">
                <input
                  id="agree-all-agreements"
                  type="checkbox"
                  name="agree-all-agreements"
                  readOnly
                />
              </label>
            </th>
            <td>
              <div>
                <Item to="/products/1">
                  <ImageContainer>
                    <img
                      src="/assets/images/1.png"
                      alt="상품이미지"
                      height={60}
                      width={60}
                    />
                  </ImageContainer>
                  <div>
                    <span>T-Shirt</span>
                  </div>
                </Item>
                <CancelButton>X</CancelButton>
              </div>
            </td>
            <td>
              <ButtonContainer>
                <ReduceButton
                  type="button"
                />
                <Quantity
                  value={1}
                />
                <AddButton
                  type="button"
                />
              </ButtonContainer>
            </td>
            <td>
              <DirectPurchase>
                <strong>60,000원</strong>
                <PurchaseButton>바로구매</PurchaseButton>
              </DirectPurchase>
            </td>
            <td>무료</td>
          </tr>
        </tbody>
      </Table>
      <DeleteButton
        type=" button"
      >
        선택상품 삭제
      </DeleteButton>
    </div>
  );
}
