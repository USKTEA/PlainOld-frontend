import styled from 'styled-components';

import { useEffect, useRef } from 'react';

import useCartStore from '../../hooks/useCartStore';

import defaultTheme from '../../styles/defaultTheme';

import numberFormat from '../../utils/numberFormat';

const Container = styled.div`
  position: absolute;
  width: 120%;
  height: 120%;
  top: -10em;
  left: -10em;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 999;
`;

const Wrapper = styled.div`
  padding: 1em;
  width: 22em;
  position: absolute;
  top: 25em;
  box-shadow: 1px 1px 5px 0px;
  border-radius: 3px;
  background-color: white;

  p {
    font-size: .9em;
    margin-bottom: .5em;
    color: ${defaultTheme.colors.thirdText};
  }
`;

const Title = styled.h2`
  font-size: .9em;
  padding-bottom: .5em;
  text-align: center;
  border-bottom: 1px solid ${defaultTheme.colors.fourth};
`;

const Item = styled.div`
  display: flex;
  margin-top: .5em;
  margin-bottom: .5em;

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

const ImageContainer = styled.div`
  width: 4em;
  height: 4em;
  padding: .5em;
  margin-right: 1em;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${defaultTheme.colors.fourth};
`;

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
  margin-bottom: .5em;
  padding: .7em;
  background-color: #F9F8FB;

  label {
    font-size: .9em;
  }
`;

const LabelContainer = styled.div`
  font-size: .8em;
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

const Summary = styled.div`
  height: 1.5em;
  margin-bottom: .5em;
  display: flex;
  align-items: center;
  justify-content: space-between;

  span {
    font-size: .8em;
    color: ${defaultTheme.colors.third};
  }

  strong {
    font-size: 1.2em;
    color: ${defaultTheme.colors.fifth};
  }
`;

const Command = styled.div`
   width: 100%;
   margin-top: .5em;
   padding-top: .5em;
   display: flex;
   align-items: center;
   justify-content: center;
   border-top: 1px solid ${defaultTheme.colors.fourth};

   button {
    padding: .2em 1.2em;
   }
`;

const Cancel = styled.button`
    font-size: .9em;
    height: 2.5em;
    border: 1px solid ${defaultTheme.colors.fourth};
    margin-right: .3em;
    color: ${defaultTheme.colors.fifth};
    background-color: white;
    cursor: pointer;

    :hover {
      border: 1px solid ${defaultTheme.colors.fifth};
    }
`;

const Save = styled.button`
    font-size: .9em;
    height: 2.5em;
    border: none;
    color: white;
    background-color: ${defaultTheme.colors.secondary};
    cursor: pointer;

    :hover {
      background-color: ${defaultTheme.colors.primary};
    }
`;

export default function ChangeQuantityModal({ setModalOpen }) {
  const cartStore = useCartStore();
  const { itemsInChangeQuantity } = cartStore;

  const modalRef = useRef(null);

  const handler = ({ target }) => {
    if (modalRef.current && !modalRef.current.contains(target)) {
      setModalOpen((previous) => !previous);
    }
  };

  const closeModal = () => {
    setModalOpen((previous) => !previous);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handler);

    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleUpdateQuantity = ({ id, amount }) => {
    cartStore.updateQuantity({ id, amount: Number(amount) });
  };

  const handleSaveChange = () => {
    cartStore.saveChange();

    closeModal();
  };

  if (!itemsInChangeQuantity) {
    return <p>now closing....</p>;
  }

  const { name, items } = itemsInChangeQuantity;

  return (
    <Container>
      <Wrapper ref={modalRef}>
        <Title>수량 변경</Title>
        <Item>
          <ImageContainer>
            <img
              src={`/assets/images/${items[0].thumbnailUrl}.png`}
              alt={name}
              height={50}
              width={50}
            />
          </ImageContainer>
          <div>
            <p>{name}</p>
            <p>{`${numberFormat(items[0].price)}원`}</p>
          </div>
        </Item>
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
                        cartStore.decreaseQuantity({ id: item.id, amount: -1 })
                      )}
                    >
                      -
                    </ReduceButton>
                    <Quantity
                      id="quantity"
                      name="quantity"
                      type="number"
                      value={item.quantity}
                      onChange={(event) => handleUpdateQuantity(
                        { id: item.id, amount: event.target.value },
                      )}
                    />
                    <AddButton
                      type="button"
                      onClick={() => (
                        cartStore.increaseQuantity({ id: item.id, amount: 1 })
                      )}
                    >
                      +
                    </AddButton>
                  </ButtonContainer>
                  {item.option ? (
                    <Amount className="total-price">
                      {`${numberFormat(item.totalPrice)}원`}
                    </Amount>
                  ) : null}
                </ButtonAndPrice>
              </div>
            </ListItem>
          ))}
        </ul>
        <Summary>
          <span>{`총 수량 ${numberFormat(itemsInChangeQuantity.totalQuantity)}개`}</span>
          <strong>{`${numberFormat(itemsInChangeQuantity.totalPrice)}원`}</strong>
        </Summary>
        <Command>
          <Cancel
            type="button"
            onClick={closeModal}
          >
            취소
          </Cancel>
          <Save
            type="button"
            onClick={handleSaveChange}
          >
            변경
          </Save>
        </Command>
      </Wrapper>
    </Container>
  );
}
