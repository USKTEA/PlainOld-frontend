import { useEffect, useRef } from 'react';

import styled from 'styled-components';
import defaultTheme from '../../styles/defaultTheme';

import useGetReviewStore from '../../hooks/useGetReviewStore';
import useCreateReviewStore from '../../hooks/useCreateReviewStore';
import useProductStore from '../../hooks/useProductStore';
import useGetOrderStore from '../../hooks/useGetOrderStore';

import Rating from './Rating';

const Container = styled.div`
  position: absolute;
  width: 120%;
  height: 280vh;
  top: -10em;
  left: -10em;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 999;
`;

const Wrapper = styled.div`
  top: 50%;
  left: 50%;
  transform: translate(-0%, -50%);
  height: 38em;
  width: 24em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-radius: 3px;
  background-color: white;
`;

const SubWrapper = styled.div`
  width: 100%;
  padding: 1em;
  display: flex;
  flex-direction: column;

  textarea {
    font-size: .9em;
    height: 15em;
    margin-bottom: 1em;
    padding: 1em;
    border: 1px solid ${defaultTheme.colors.fourth};
    color: ${defaultTheme.colors.primaryText};
    resize: none;
    :focus {
      outline: 1px solid ${defaultTheme.colors.fifth};
    }
  }
`;

const Title = styled.label`
  height: 3em;
  font-size: .9em;
  width: 100%;
  padding-top: 1em;
  padding-bottom: 1em;
  text-align: center;
  border-bottom: 1px solid ${defaultTheme.colors.fourth};
`;

const Item = styled.div`
  font-size: .9em;
  width: 100%;
  margin-bottom: .5em;
  border: 1px solid ${defaultTheme.colors.fourth};
  display: flex;
  align-items: center;
`;

const ImageContainer = styled.div`
  width: 4em;
  height: 4em;
  padding: .5em;
  margin-right: 1em;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid ${defaultTheme.colors.fourth};
`;

const RateWrapper = styled.div`
  height: 7em;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  span {
    font-weight: 700;
    margin-bottom: 1em;
  }

  div {
    font-size: 2em;
  }
`;

const ImageUpload = styled.div`
  margin-top: 1em;
  display: flex;
  flex-direction: column;

  span {
    font-size: .8em;
    font-weight: 300;
  }

  input {
    font-family: 'Roboto';
    font-weight: 300;
    font-size: 3em;
    height: 1.5em;
    width: 1.5em;
    margin-top: .3em;
    text-align: center;
    vertical-align: middle;
    border: 1px solid ${defaultTheme.colors.fourth};
    color: ${defaultTheme.colors.fifth};
    background-color: #f8f8f8;
    cursor: pointer;
    :focus {
      outline: none;
    }
  }
`;

const Submit = styled.button`
  height: 3em;
  width: 100%;
  border: none;
  background-color: ${defaultTheme.colors.primary};
  color: white;
  cursor: pointer;
`;

export default function WriteReviewModal({ setModalOpen }) {
  const modalRef = useRef(null);
  const productStore = useProductStore();
  const getReviewStore = useGetReviewStore();
  const getOrderStore = useGetOrderStore();
  const createReviewStore = useCreateReviewStore();

  const handler = ({ target }) => {
    if (modalRef.current && !modalRef.current.contains(target)) {
      setModalOpen(((previous) => !previous));
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handler);

    return () => {
      createReviewStore.clear();
      document.removeEventListener('mousedown', handler);
    };
  }, []);

  const { product } = productStore;
  const { review } = createReviewStore;
  const { orderNumber } = getOrderStore;

  const handleChangeComment = (comment) => {
    createReviewStore.changeComment({ comment });
  };

  const handleSubmitReview = async () => {
    await createReviewStore.submitReview(
      { orderNumber, productId: product.id },
    );

    const { createdReviewId } = createReviewStore;

    if (createdReviewId) {
      getOrderStore.clear();
      getReviewStore.fetchReviews({ productId: product.id, pageNumber: 1 });
      setModalOpen((previous) => !previous);
    }
  };

  return (
    <Container>
      <Wrapper ref={modalRef}>
        <Title
          htmlFor="comment"
        >
          구매평 작성
        </Title>
        <SubWrapper>
          <Item>
            <ImageContainer>
              <img
                src={`/assets/images/${product.image.thumbnailUrl}.png`}
                alt={product.name}
                height={45}
                width={45}
              />
            </ImageContainer>
            <span>{product.name}</span>
          </Item>
          <RateWrapper>
            <span>상품은 어떠셨나요?</span>
            <Rating />
          </RateWrapper>
          <textarea
            name="review"
            id="comment"
            placeholder="어떤 점이 좋으셨나요?"
            cols="30"
            rows="10"
            value={review.comment}
            onChange={(e) => handleChangeComment(e.target.value)}
          />
          <ImageUpload>
            <span>사진 첨부</span>
            <input value="+" readOnly />
          </ImageUpload>
        </SubWrapper>
        <Submit
          type="button"
          onClick={handleSubmitReview}
        >
          등록
        </Submit>
      </Wrapper>
    </Container>
  );
}
