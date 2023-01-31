import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';

import styled from 'styled-components';
import defaultTheme from '../../styles/defaultTheme';

import useGetReviewStore from '../../hooks/useGetReviewStore';
import useProductStore from '../../hooks/useProductStore';
import useGetOrderStore from '../../hooks/useGetOrderStore';

import WriteReviewModal from './WriteReviewModal';
import Reviews from './Reviews';
import ReviewPagination from './ReviewPagination';

const Container = styled.section`
  min-height: 25em;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  color: ${defaultTheme.colors.primaryText};

  span {
    font-size: .8em;
  }
`;

const Title = styled.h3`
  font-weight: 700;
  margin-bottom: 1em;
  color: ${defaultTheme.colors.primaryText};

  span {
    font-size: .9em;
    font-weight: 300;
  }
`;

const Message = styled.p`
  font-size: .8em;
  font-weight: 300;
`;

const ErrorMessage = styled.p`
  font-size: .8em;
  font-weight: 300;
  color: red;
`;

const WriteReviewButton = styled.button`
  font-size: .7em;
  font-weight: 300;
  height: 3em;
  width: 7em;
  margin-top: 1em;
  margin-bottom: 2em;
  padding: 1em;
  border: none;
  background-color: ${defaultTheme.colors.secondary};
  color: white;
  cursor: pointer;
`;

const SelectBoxWrapper = styled.div`
  height: 1em;
  width: 7.5em;
  display: flex;
  align-items: center;
  justify-content: space-between;

  input {
    display: none;

    :checked + label {
      color: ${defaultTheme.colors.primaryText};
    }
  }

  label {
    font-size: .8em;
    font-weight: 500;
    height: 1em;
    color: ${defaultTheme.colors.fourthText};
    cursor: pointer;
  }
`;

const PictureIcon = styled.div`
  width: 1.1em;
  height: .9em;
  box-sizing: content-box;
  background: url("/assets/images/picture-icon.png") no-repeat 100% 100%;
`;

const ReviewContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NoReviewContainer = styled.div`
  font-size: .8em;
  font-weight: 300;
  height: 10em;
  margin-top: .5em;
  border-top: 1px solid ${defaultTheme.colors.fourth};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${defaultTheme.colors.primaryText};
`;

export default function ReviewSection({ setRef }) {
  const navigate = useNavigate();
  const [accessToken] = useLocalStorage('accessToken', '');
  const [modalOpen, setModalOpen] = useState(false);

  const productStore = useProductStore();
  const getOrderStore = useGetOrderStore();
  const getReviewStore = useGetReviewStore();

  const {
    reviews, loading, errors, fetchPhotoReviewsOnly,
  } = getReviewStore;

  const { product } = productStore;

  const handleFetchReviews = async () => {
    getReviewStore.toggleFetchPhotoReviewsOnly();

    await getReviewStore.fetchReviews({ productId: product.id });
  };

  const handleWriteReview = async () => {
    if (!accessToken) {
      navigate('/login');

      return;
    }

    const { id } = productStore.product;

    await getOrderStore.fetchOrderDoNotHaveReview({ productId: id });

    const { orderNumber } = getOrderStore;

    if (orderNumber) {
      setModalOpen(true);
    }
  };

  if (loading) {
    return <p>now loading...</p>;
  }

  return (
    <>
      <Container
        ref={(element) => { setRef(element)('Review'); }}
      >
        <Wrapper>
          <Title>
            구매평
            <span>{` (${reviews.length})`}</span>
          </Title>
          {getOrderStore.errors.cantWriteReview
            ? <ErrorMessage>{getOrderStore.errors.cantWriteReview}</ErrorMessage>
            : <Message>상품을 구매하신 분들이 작성한 리뷰입니다.</Message>}
          <WriteReviewButton
            type="button"
            onClick={handleWriteReview}
          >
            구매평 작성
          </WriteReviewButton>
          <SelectBoxWrapper>
            <PictureIcon />
            <input
              type="checkbox"
              id="picture-review-only"
              name="picture-review-only"
              onClick={handleFetchReviews}
              checked={fetchPhotoReviewsOnly}
              value="true"
              readOnly
            />
            <label
              htmlFor="picture-review-only"
            >
              포토 구매평만 보기
            </label>
          </SelectBoxWrapper>
          {reviews.length
            ? (
              <ReviewContainer>
                <Reviews />
                <ReviewPagination />
              </ReviewContainer>
            )
            : (
              <NoReviewContainer>
                {errors.loading
                  ? <span>{errors.loading}</span>
                  : <span>등록된 구매평이 없습니다.</span>}
              </NoReviewContainer>
            )}
        </Wrapper>
      </Container>
      {modalOpen && (
        <WriteReviewModal
          setModalOpen={setModalOpen}
        />
      )}
    </>
  );
}
