import { useState } from 'react';

import styled from 'styled-components';
import defaultTheme from '../../styles/defaultTheme';

import useDeleteReviewStore from '../../hooks/useDeleteReviewStore';
import useEditReviewStore from '../../hooks/useEditReviewStore';
import useGetOrderStore from '../../hooks/useGetOrderStore';
import useGetReviewStore from '../../hooks/useGetReviewStore';
import useProductStore from '../../hooks/useProductStore';
import useUserStore from '../../hooks/useUserStore';

import EditReviewModal from './EditReviewModal';
import ReviewRate from './ReviewRate';

const Container = styled.li`
  min-height: 20em;
  height: 100%;
  width: 100%;
  padding-top: 1em;
  padding-bottom: 1em;
  border-bottom: 1px solid ${defaultTheme.colors.fourth};
  display: flex;

  p {
    color: ${defaultTheme.colors.primaryText}
  }
`;

const SubContainer = styled.div`
  width: 90%;

  > button {
    width: 100%;
    background-color: white;
  }
`;

const ReviewInformation = styled.div`
  font-size: .8em;
  font-weight: 100;
  height: 100%;
  width: 10%;
  padding-top: .9em;
  display: flex;
  flex-direction: column;
  justify-content: center;

  p {
    color: ${defaultTheme.colors.sixth};
    margin-bottom: .5em;
    font-weight: 100;
  }
`;

const RateCommentReply = styled.div`
  height: 100%;
  width: 90%;
  display: flex;
  flex-direction: column;
  align-content: space-between;
  justify-content: space-between;

  p {
    margin-top: .5em;
    margin-bottom: .5em;
  }
`;

const Wrapper = styled.div`
  padding: .5em;
  width: 90%;

  span {
    font-size: .9em;
    font-weight: 700;
    margin-top: 1em;
    display: inline-block;
  }
`;

const ReplyForm = styled.div`
  margin-top: 1em;
  border: 1px solid ${defaultTheme.colors.fourth};
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  textarea {
    margin-top: .5em;
    padding-top: .5em;
    padding-left: 1em;
    height: 6em;
    width: 100%;
    border: none;
    resize: none;
    color: ${defaultTheme.colors.primaryText};

    :focus {
      outline: none;
    }

    ::placeholder {
      color: ${defaultTheme.colors.fourthText}
    }
  }
`;

const SubmitButton = styled.button`
  font-size: .8em;
  font-weight: 300;
  margin: 1em;
  height: 2.5em;
  width: 4em;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background-color: ${defaultTheme.colors.secondary};
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;

  button {
   width: 4em;
   font-size: .8em;
   background-color: white;
   color: ${defaultTheme.colors.fourthText};
  }

  button:first-child {
    border-right: 1px solid ${defaultTheme.colors.fourthText};
  }
`;

export default function SelectedReview({ review, handleClick }) {
  const [modalOpen, setModalOpen] = useState(false);

  const { username } = useUserStore();

  const productStore = useProductStore();
  const getOrderStore = useGetOrderStore();
  const getReviewStore = useGetReviewStore();
  const editReviewStore = useEditReviewStore();
  const deleteReviewStore = useDeleteReviewStore();

  const handleModalOpen = () => {
    editReviewStore.setReview(review);
    setModalOpen((previous) => !previous);
  };

  const handleDeleteReview = async () => {
    await deleteReviewStore.delete({ id: review.id });

    const { product } = productStore;
    const { reviewId } = deleteReviewStore;

    if (reviewId) {
      getOrderStore.clear();
      getReviewStore.fetchReviews({ productId: product.id, pageNumber: 1 });
    }
  };

  return (
    <>
      <Container className="review">
        <SubContainer>
          <button
            className="review-open"
            type="button"
            onClick={() => handleClick(review.id)}
          >
            <RateCommentReply>
              <ReviewRate rate={review.rate} />
              <p>
                {review.comment}
              </p>
              {review.imageUrl ? (
                <img
                  src={review.imageUrl}
                  alt="구매평이미지"
                  height="300"
                  width="300"
                />
              ) : null }
            </RateCommentReply>
          </button>
          <Wrapper>
            <span>댓글 0</span>
            <ReplyForm>
              <textarea
                type="text"
                placeholder={username ? '댓글' : '로그인이 필요합니다'}
                readOnly={!username}
              />
              <SubmitButton type="button">작성</SubmitButton>
            </ReplyForm>
          </Wrapper>
        </SubContainer>
        <ReviewInformation>
          <p>
            {review.reviewer.nickname}
          </p>
          <p>
            {review.createdAt}
          </p>
          <div>
            {review.reviewer.username === username
              ? (
                <ButtonContainer>
                  <button
                    type="button"
                    onClick={handleModalOpen}
                  >
                    수정
                  </button>
                  <button
                    type="button"
                    onClick={handleDeleteReview}
                  >
                    삭제
                  </button>
                </ButtonContainer>
              )
              : null}
          </div>
        </ReviewInformation>
      </Container>
      {modalOpen && (
        <EditReviewModal
          setModalOpen={setModalOpen}
        />
      ) }
    </>
  );
}
