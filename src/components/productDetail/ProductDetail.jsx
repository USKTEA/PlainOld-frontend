import styled from 'styled-components';

import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';

import useProductStore from '../../hooks/useProductStore';
import useOrderItemStore from '../../hooks/useOrderItemStore';
import useCartStore from '../../hooks/useCartStore';

import defaultTheme from '../../styles/defaultTheme';

import numberFormat from '../../utils/numberFormat';
import Modal from '../modal/Modal';
import SizeSelection from './SizeSelection';
import ColorSelection from './ColorSelection';
import Items from './Items';
import ErrorMessage from '../ui/ErrorMessage';
import ProductDescription from './ProductDescription';
import ScrollCommand from './ScrollCommand';
import ReviewSection from './ReviewSection';

const Container = styled.div`
`;

const ProductSection = styled.div`
  width: 50%;
  min-height: 20em;
  min-width: 1024px;
  padding-block: 5em;
  padding-left: 10em;
  gap: 2em;
  display: flex;
  justify-content: center;
  color: ${defaultTheme.colors.primary};
`;

const InformationSection = styled.div`
`;

const Wrapper = styled.div`
  width: 100%;
  margin-left: 3em;
`;

const Image = styled.img`
  size: 3em;
  margin-bottom: 1em;
`;

const Message = styled.p`
  font-size: 1.5em;
  font-weight: 500;
  margin-top: 5em;
  text-align: center;
  color: ${defaultTheme.colors.primary};
`;

const TotalPrice = styled.div`
  margin-top: 1em;
  margin-bottom: 1em;
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    font-size: 0.8em;
    color: #aaa;
  }

  strong {
    font-size: 1.2em;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const OrderButton = styled.button`
  font-size: 0.8em;
  width: 33%;
  height: 3em;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${defaultTheme.colors.secondary};
  color: white;
  cursor: pointer;
  :hover {
    background-color: ${defaultTheme.colors.primary}
  }
`;

const Button = styled.button`
  font-size: 0.8em;
  width: 33%;
  height: 3em;
  border: 1px solid ${defaultTheme.colors.fourth};
  color: ${defaultTheme.colors.primary};
  background: white;
  cursor: pointer;
  :hover {
    color: ${defaultTheme.colors.third}
  }
`;

const MessageWrapper = styled.div`
  margin-top: .5em;
  font-size: 1.2em;
`;

const Detail = styled.section`
  margin-top: 2em;
  height: 30em;
`;

const QnA = styled.section`
  height: 30em;
`;

export default function ProductDetail() {
  const navigate = useNavigate();
  const focusTarget = useRef([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [, setOrderItems] = useLocalStorage('orderItems', '');
  const [, setCartItems] = useLocalStorage('cartItems', '');

  const productStore = useProductStore();
  const orderItemStore = useOrderItemStore();
  const cartStore = useCartStore();

  const { product, loading, errors } = productStore;
  const { orderItems, sizes, colors } = orderItemStore;

  const { items } = orderItems;

  const handleAddCart = () => {
    cartStore.addItem(items);

    orderItemStore.clearError();

    if (cartStore.errors.addItemFailed) {
      return;
    }

    const cartItems = [...cartStore.cart.items.values()];

    setCartItems(cartItems);
    setModalOpen(true);
  };

  const handleOrderItems = () => {
    if (orderItemStore.isItemSelected()) {
      navigate('/order');
    }

    cartStore.clearError();
  };

  const handleScrollTo = (name) => {
    const category = {
      상세정보: 0,
      Review: 1,
      'Q&A': 2,
    };

    focusTarget.current[category[name]].scrollIntoView();
  };

  const handleSetRef = (element) => (name) => {
    if (name === 'Review') {
      focusTarget.current[1] = element;
    }
  };

  useEffect(() => {
    setOrderItems(orderItemStore.orderItems);
  }, [orderItemStore.orderItems]);

  if (loading) {
    return <Message>now loading...</Message>;
  }

  if (!product) {
    return <Message>{errors.loading}</Message>;
  }

  const { name, image, description } = product;

  return (
    <Container>
      <ProductSection>
        <Image
          src={`/assets/images/${image.productImageUrls[0]}.png`}
          alt={name}
          height={450}
          width={450}
        />
        <Wrapper>
          <ProductDescription />
          {sizes
            ? <SizeSelection />
            : null}
          {colors
            ? <ColorSelection />
            : null}
          <Items />
          {items.length
            ? (
              <TotalPrice>
                <span>{`총 상품금액(${orderItems.totalQuantity()}개)`}</span>
                <strong className="total-cost">
                  {`${numberFormat(orderItems.totalCost())}원`}
                </strong>
              </TotalPrice>
            )
            : null}
          <ButtonWrapper>
            <OrderButton
              onClick={handleOrderItems}
            >
              구매하기
            </OrderButton>
            <Button
              onClick={handleAddCart}
            >
              장바구니
            </Button>
            <Button>♡</Button>
          </ButtonWrapper>
          <MessageWrapper>
            {orderItemStore.errors.notSelected
              ? <ErrorMessage>{orderItemStore.errors.notSelected}</ErrorMessage>
              : null}
            {cartStore.errors.addItemFailed
              ? <ErrorMessage>{cartStore.errors.addItemFailed}</ErrorMessage>
              : null}
          </MessageWrapper>
        </Wrapper>
      </ProductSection>
      <InformationSection>
        <ScrollCommand scrollTo={handleScrollTo} />
        <Detail
          ref={(element) => { focusTarget.current[0] = element; }}
        >
          {description.productDetail}
        </Detail>
        <ReviewSection
          setRef={handleSetRef}
        />
        <QnA
          ref={(element) => { focusTarget.current[2] = element; }}
        >
          상품문의
        </QnA>
      </InformationSection>
      {modalOpen && (
        <Modal
          setModalOpen={setModalOpen}
          message="선택하신 상품을 장바구니에 담았습니다."
          to="/cart"
          firstButton="계속 쇼핑"
          secondButton="장바구니"
        />
      )}
    </Container>
  );
}
