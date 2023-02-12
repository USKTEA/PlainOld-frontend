import styled from 'styled-components';

import { Link, useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';

import { useEffect } from 'react';
import useOrderItemStore from '../../hooks/useOrderItemStore';
import useCartStore from '../../hooks/useCartStore';

import CartItems from './CartItems';
import CartSummary from './CartSummary';
import EmptyCart from './EmptyCart';

import defaultTheme from '../../styles/defaultTheme';

const Container = styled.div`
  padding: 1em;
  width: 100%;
  max-width: 1400px;
`;

const Title = styled.h2`
  font-size: 1.3em;
  font-weight: 300;
  margin-left: .5em;
  margin-bottom: .7em;
  height: 2em;
  display: flex;
  align-items: center;
  color: ${defaultTheme.colors.primaryText};
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

const Command = styled.div`
  margin-top: 2em;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  button {
    width: 15%;
    margin-bottom: 1.4em;
  }

  a {
    font-size: .8em;
    text-decoration: underline;
    color: ${defaultTheme.colors.primaryText};

    :hover {
      color: ${defaultTheme.colors.fifth};
    }
  }
`;

export default function Cart() {
  const [, setOrderItems] = useLocalStorage('orderItems', '');
  const [, setCartItems] = useLocalStorage('cartItems', '');
  const [, setItemInPurchase] = useLocalStorage('itemInPurchase', '');

  const navigate = useNavigate();
  const cartStore = useCartStore();
  const orderItemStore = useOrderItemStore();

  const { cart: { items } } = cartStore;

  const handlePurchaseSelected = () => {
    if (cartStore.isSelectedNotEmpty()) {
      cartStore.selectedToItemInPurchase();

      orderItemStore.loadItems({ items: cartStore.getSelectedItems() });

      setItemInPurchase(cartStore.itemInPurchase);
      setOrderItems(orderItemStore.orderItems);

      navigate('/order');
    }
  };

  useEffect(() => {
    setCartItems([...items.values()]);
  }, [items]);

  return (
    <Container>
      <Title>장바구니</Title>
      {items.size
        ? (
          <>
            <CartItems />
            <CartSummary />
            <Command>
              <PurchaseButton
                type="button"
                onClick={handlePurchaseSelected}
              >
                주문하기
              </PurchaseButton>
              <Link to="/products">계속 쇼핑하기</Link>
            </Command>
          </>
        )
        : (
          <>
            <EmptyCart />
            <Command>
              <Link to="/products">계속 쇼핑하기</Link>
            </Command>
          </>
        )}
    </Container>
  );
}
