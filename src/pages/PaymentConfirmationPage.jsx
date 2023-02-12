import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import useCartStore from '../hooks/useCartStore';

import useCreateOrderStore from '../hooks/useCreateOrderStore';
import usePaymentStore from '../hooks/usePaymentStore';

import defaultTheme from '../styles/defaultTheme';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 2em 5em;
  height: 100vh;
  width: 100%;
  max-width: 1400px;
  background: ${defaultTheme.colors.background};
`;

const Wrapper = styled.div`
  width: 35%;
`;

const Title = styled.h1`
  display: flex;
  height: 3em;
  font-size: 1.3em;
  justify-content: center;
  align-items: center;
`;

const Message = styled.div`
  margin-bottom: 2em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    margin-bottom: .3em;
    font-weight: 600;
    color: ${defaultTheme.colors.fifth};
  }
`;

export default function PaymentConfirmationPage() {
  const navigate = useNavigate();
  const [orderInformation] = useLocalStorage('orderInformation', '');
  const [, setCartItems] = useLocalStorage('cartItems', '');
  const [itemInPurchase, setItemInPurchase] = useLocalStorage('itemInPurchase', '');
  const [searchParams] = useSearchParams();

  const createOrderStore = useCreateOrderStore();
  const paymentStore = usePaymentStore();
  const cartStore = useCartStore();

  const loadCartData = async () => {
    await cartStore.load();

    cartStore.setItemInPurchase(itemInPurchase);
  };

  const approveOrder = async () => {
    const pgToken = searchParams.get('pg_token');

    const approveCode = await paymentStore.approve(
      {
        provider: orderInformation.paymentProvider,
        pgToken,
        tidId: orderInformation.tidId,
        partnerOrderId: orderInformation.partnerOrderId,
      },
    );

    if (!approveCode) {
      navigate('/order-failure');

      return;
    }

    await createOrderStore.createOrder({
      orderItems: orderInformation.orderItems,
      orderer: orderInformation.orderer,
      shippingInformation: orderInformation.shippingInformation,
      payment: orderInformation.payment,
    });

    const { result } = createOrderStore;

    if (!result) {
      navigate('/order-failure');
    }

    cartStore.completePurchase();

    const { items } = cartStore.cart;

    setCartItems([...items.values()]);

    navigate('/order-success');
  };

  useEffect(() => {
    loadCartData();
    approveOrder();

    return () => {
      setItemInPurchase('');
    };
  }, []);

  return (
    <Container>
      <Wrapper>
        <Title>주문 진행 중</Title>
        <Message>
          <p>
            주문을 처리하고 있습니다.
          </p>
          <p>
            잠시만 기다려주세요.
          </p>
        </Message>
      </Wrapper>
    </Container>
  );
}
