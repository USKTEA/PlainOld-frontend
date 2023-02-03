import styled from 'styled-components';
import defaultTheme from '../../styles/defaultTheme';

import ReviewRate from './ReviewRate';

const Container = styled.li`
  min-height: 5em;
  height: 100%;
  width: 100%;
  padding-top: 1em;
  padding-bottom: 1em;
  border-bottom: 1px solid ${defaultTheme.colors.fourth};
  display: flex;

  p {
    color: ${defaultTheme.colors.primaryText}
  }

  button {
    width: 100%;
    background-color: white;
  }
`;

const ReviewInformation = styled.div`
  font-size: .8em;
  font-weight: 300;
  height: 100%;
  width: 9%;
  padding-top: .6em;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  p {
    color: ${defaultTheme.colors.fourthText};
    margin-bottom: .5em;
    font-weight: 100;
  }
`;

const RateCommentReply = styled.div`
  height: 100%;
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: space-between;

  p {
    margin-top: .5em;
  }

  img {
    margin-top: .5em;
  }
`;

const Reply = styled.span`
  margin-top: .5em;
  font-weight: 700;
  color: ${defaultTheme.colors.primaryText};
`;

export default function Review({ review, replies, handleClick }) {
  return (
    <Container className="review">
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
          {review.imageUrl
            ? (
              <img
                src={review.imageUrl}
                alt="구매평이미지"
                height="45"
                width="45"
              />
            ) : null}
          {replies.length
            ? (
              <Reply>
                {`댓글 ${replies.filter((reply) => !reply.parent).length}`}
              </Reply>
            )
            : null}
        </RateCommentReply>
        <ReviewInformation>
          <p>
            {review.reviewer.nickname}
          </p>
          <p>
            {review.createdAt}
          </p>
        </ReviewInformation>
      </button>
    </Container>
  );
}
