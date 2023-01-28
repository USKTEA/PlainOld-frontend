import { useState } from 'react';

import styled from 'styled-components';
import defaultTheme from '../../styles/defaultTheme';

import useGetReviewStore from '../../hooks/useGetReviewStore';
import useGetReplyStore from '../../hooks/useGetReplyStore';

import Review from './Review';
import SelectedReview from './SelectedReview';

const Container = styled.ul`
  font-size: .8em;
  width: 100%;
  margin-top: .5em;
  border-top: 1px solid ${defaultTheme.colors.fifth};

   button {
    display: flex;
    text-align: start;
    border: none;
    cursor: pointer;
  }
`;

export default function Reviews() {
  const [selected, setSelected] = useState(null);
  const { reviews } = useGetReviewStore();
  const { replies } = useGetReplyStore();

  const handleSetSelected = (reviewId) => {
    if (reviewId === selected) {
      setSelected(null);

      return;
    }

    setSelected(() => reviewId);
  };

  return (
    <Container>
      {reviews.map((review) => (
        selected === review.id
          ? (
            <SelectedReview
              key={review.id}
              review={review}
              replies={replies.get(review.id) || []}
              handleClick={handleSetSelected}
            />
          ) : (
            <Review
              key={review.id}
              review={review}
              replies={replies.get(review.id) || []}
              handleClick={handleSetSelected}
            />
          )))}
    </Container>
  );
}
