import styled from 'styled-components';

import useOrderItemStore from '../../hooks/useOrderItemStore';

import defaultTheme from '../../styles/defaultTheme';

import numberFormat from '../../utils/numberFormat';

const Option = styled.div`
  width: 100%;
  margin-bottom: .5em;
  padding-bottom: .2em;
  border-bottom: 1px solid ${defaultTheme.colors.fourth};
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${defaultTheme.colors.primary};

  button {
    border: 1px solid ${defaultTheme.colors.primary};
    border-radius: 50%;
    background-color: white;
    color: ${defaultTheme.colors.primary};
    cursor: pointer;
  }
`;

const ListItem = styled.li`
  margin-bottom: 1em;
  padding: 1em;
  background-color: #F9F8FB;


  label {
    font-size: .9em;
  }
`;

const LabelContainer = styled.div`
  margin-bottom: .5em;
  padding-bottom: .2em;
  border-bottom: 1px solid ${defaultTheme.colors.fourth};
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

const Amount = styled.strong`
  font-size: .9em;
`;

const Quantity = styled.input`
  height: 2em;
  width: 3em;
  font-size: 0.7em;
  text-align: center;
  border: none;
  border-left: 1px solid ${defaultTheme.colors.fourth};
  border-right: 1px solid ${defaultTheme.colors.fourth};
`;

export default function Items() {
  const orderItemStore = useOrderItemStore();

  const { orderItems } = orderItemStore;
  const { items } = orderItems;

  const handleChangeQuantity = ({ id, amount }) => {
    orderItemStore.updateQuantity({ id, amount: Number(amount) });
  };

  return (
    <ul>
      {items.map((item) => (
        <ListItem key={item.id}>
          <div>
            {item.option
              ? (
                <Option>
                  <label htmlFor="quantity">
                    {`${item.option.size} / ${item.option.color}`}
                  </label>
                  <button
                    type="button"
                    onClick={() => orderItemStore.deleteItem({ id: item.id })}
                  >
                    X
                  </button>
                </Option>
              )
              : (
                <LabelContainer>
                  <label htmlFor="quantity">수량</label>
                </LabelContainer>
              )}
            <ButtonAndPrice>
              <ButtonContainer>
                <ReduceButton
                  type="button"
                  onClick={() => (
                    orderItemStore.decreaseQuantity({ id: item.id, amount: -1 })
                  )}
                >
                  -
                </ReduceButton>
                <Quantity
                  id="quantity"
                  name="quantity"
                  type="number"
                  value={item.quantity}
                  onChange={(event) => handleChangeQuantity(
                    { id: item.id, amount: event.target.value },
                  )}
                />
                <AddButton
                  type="button"
                  onClick={() => (
                    orderItemStore.increaseQuantity({ id: item.id, amount: 1 })
                  )}
                >
                  +
                </AddButton>
              </ButtonContainer>
              <Amount className="total-price">
                {`${numberFormat(item.totalPrice)}원`}
              </Amount>
            </ButtonAndPrice>
          </div>
        </ListItem>
      ))}
    </ul>
  );
}
