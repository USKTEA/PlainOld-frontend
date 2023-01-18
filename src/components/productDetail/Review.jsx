import styled from 'styled-components';
import defaultTheme from '../../styles/defaultTheme';

import ReviewRate from './ReviewRate';

const Container = styled.li`
  height: 6em;
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
  display: flex;
  flex-direction: column;
  justify-content: center;

  p {
    color: ${defaultTheme.colors.sixth};
    margin-bottom: .5em;
    font-weight: 100;
  }
`;

const RateContentReply = styled.div`
  height: 100%;
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: space-between;
`;

export default function Review({ review, handleClick }) {
  return (
    <Container className="review">
      <button type="button" onClick={() => handleClick(review.id)}>
        <RateContentReply>
          <ReviewRate rate={review.rate} />
          <p>
            {review.comment}
          </p>
          {review.replyCount
            ? <p>{`댓글 ${review.replyCount}`}</p>
            : null}
        </RateContentReply>
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
