import styled from 'styled-components';

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';

import useCartStore from '../../hooks/useCartStore';
import useOrderItemStore from '../../hooks/useOrderItemStore';

import ChangeQuantityModal from './ChangeQuantityModal';

import defaultTheme from '../../styles/defaultTheme';
import numberFormat from '../../utils/numberFormat';

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

const HiddenLabel = styled.label`
  display: none;
`;

const Item = styled(Link)`
  width: 20%;
  display: flex;
  align-items: center;
  color: ${defaultTheme.colors.primary};
`;

const ImageContainer = styled.div`
  width: 6em;
  height: 6em;
  padding: .5em;
  margin-right: 1em;
  display: flex;
  align-items: center;
  border: 1px solid ${defaultTheme.colors.fourth};
`;

const ItemSummary = styled.div`
  padding: 1em;
  width: 90%;
  display: flex;
  flex-direction: column;
  color: ${defaultTheme.colors.primaryText};

  span {
    font-size: 1.3em;
    margin-bottom: .2em;
  }
`;

const OptionList = styled.ul`
  margin-right: 2em;
`;

const Option = styled.li`
  width: 100%;
  height: 2em;
  margin-bottom: .5em;
  padding: .5em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${defaultTheme.colors.primary};
  background-color: #F9F8FB;

  button {
    border: none;
    background-color: ${defaultTheme.colors.fourth};
    color: ${defaultTheme.colors.fourthText};
    cursor: pointer;
  }
`;

const QuantityHandler = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 5em;

  span {
    font-size: 1.2em;
    color: ${defaultTheme.colors.third};
  }

  button {
    font-size: .9em;
    height: 2.5em;
    border: 1px solid ${defaultTheme.colors.fourth};
    margin-top: .5em;
    padding: .2em .6em;
    color: ${defaultTheme.colors.fifth};
    background-color: white;
    cursor: pointer;

    :hover {
      border: 1px solid ${defaultTheme.colors.fifth};
    }
  }
`;

const DirectPurchase = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PurchaseButton = styled.button`
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

const CancelButtonContainer = styled.div`
  width: 8%;
  padding: 1em;
  display: flex;
  align-items: flex-start;
`;

const CancelButton = styled.button`
  font-weight: 100;
  border: none;
  flex-direction: column;
  background: white;
  color: ${defaultTheme.colors.fourthText};
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
    border: 1px solid ${defaultTheme.colors.fifth}
  }
`;

export default function CartItems() {
  const navigate = useNavigate();
  const [, setOrderItems] = useLocalStorage('orderItems', '');
  const [, setItemInPurchase] = useLocalStorage('itemInPurchase', '');
  const [modalOpen, setModalOpen] = useState(false);

  const cartStore = useCartStore();
  const orderItemStore = useOrderItemStore();

  const { cart, selected, itemInPurchase } = cartStore;
  const { items } = cart;

  const handleOpenModal = ({ name }) => {
    cartStore.selectChangeQuantityItem({ name });

    setModalOpen(true);
  };

  const handleSelectAll = () => {
    cartStore.selectAll();
  };

  const handleToggleItem = ({ name }) => {
    cartStore.toggleSelected({ name });
  };

  const handleDeleteItem = ({ name }) => {
    cartStore.deleteItem({ name });
  };

  const handleDeleteOption = ({ id, name }) => {
    cartStore.deleteOption({ id, name });
  };

  const handleDeleteCartItemBySelected = () => {
    cartStore.deleteCartItemBySelected();
  };

  const handlePurchaseSingleItem = ({ name }) => {
    cartStore.selectItemToPurchase({ name });
    orderItemStore.loadItems({ items: items.get(name) });

    setOrderItems(orderItemStore.orderItems);
    setItemInPurchase(itemInPurchase);

    navigate('/order');
  };

  return (
    <>
      <div>
        <Table>
          <thead>
            <tr>
              <th>
                <input
                  className="select"
                  id="select-all"
                  type="checkbox"
                  name="전체선택"
                  checked={selected.length !== 0 && selected.length === items.size}
                  onClick={handleSelectAll}
                  readOnly
                />
                <HiddenLabel htmlFor="select-all">전체선택</HiddenLabel>
              </th>
              <th>상품 정보</th>
              <th>수량</th>
              <th>주문금액</th>
              <th>배송 정보</th>
            </tr>
          </thead>
          <tbody>
            {[...items.keys()].map((name) => (
              <tr key={name}>
                <th>
                  <input
                    id={name}
                    type="checkbox"
                    name={`select-${name}`}
                    checked={cartStore.checkIsSelected({ name })}
                    onClick={() => handleToggleItem({ name })}
                    readOnly
                  />
                  <HiddenLabel htmlFor={name}>
                    {name}
                  </HiddenLabel>
                </th>
                <td>
                  <div>
                    <Item to={`/products/${items.get(name)[0].productId}`}>
                      <ImageContainer>
                        <img
                          src={`/assets/images/${items.get(name)[0].thumbnailUrl}.png`}
                          alt={name}
                          height={60}
                          width={60}
                        />
                      </ImageContainer>
                    </Item>
                    <ItemSummary>
                      <span>{name}</span>
                      {cart.checkHasOption({ name })
                        ? (
                          <OptionList>
                            {items.get(name).map((item) => (
                              <Option key={item.id}>
                                <label htmlFor="quantity">
                                  {`${item.option.size} / ${item.option.color}`}
                                  {` - ${item.quantity}개`}
                                </label>
                                <button
                                  type="button"
                                  className="option-delete-button"
                                  onClick={() => handleDeleteOption(
                                    { id: item.id, name },
                                  )}
                                >
                                  X
                                </button>
                              </Option>
                            ))}
                          </OptionList>
                        )
                        : null}
                    </ItemSummary>
                    <CancelButtonContainer>
                      <CancelButton
                        type="button"
                        className="item-delete-button"
                        onClick={() => handleDeleteItem({ name })}
                      >
                        X
                      </CancelButton>
                    </CancelButtonContainer>
                  </div>
                </td>
                <td>
                  <QuantityHandler>
                    <span>{cart.itemQuantity({ name })}</span>
                    <button
                      type="button"
                      onClick={() => handleOpenModal({ name })}
                    >
                      수량 변경
                    </button>
                  </QuantityHandler>
                </td>
                <td>
                  <DirectPurchase>
                    <strong>
                      {`${numberFormat(cart.itemPrice({ name }))}원`}
                    </strong>
                    <PurchaseButton
                      type="button"
                      onClick={() => handlePurchaseSingleItem({ name })}
                    >
                      바로구매
                    </PurchaseButton>
                  </DirectPurchase>
                </td>
                {cart.shippingFee({ name })
                  ? <td>{`${numberFormat(cart.shippingFee({ name }))}원`}</td>
                  : <td>무료</td>}
              </tr>
            ))}
          </tbody>
        </Table>
        <DeleteButton
          type=" button"
          onClick={handleDeleteCartItemBySelected}
        >
          선택상품 삭제
        </DeleteButton>
      </div>
      {modalOpen && (
        <ChangeQuantityModal
          setModalOpen={setModalOpen}
        />
      )}
    </>
  );
}
