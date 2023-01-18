import styled from 'styled-components';
import useReviewStore from '../../hooks/useGetReviewStore';

const Pagenation = styled.div`
  margin-top: 1em;

  button {
    border: none;
    background-color: white;
    cursor: pointer;
  }
`;

export default function PagenationBlock() {
  const reviewStore = useReviewStore();

  const { reviews, page } = reviewStore;

  const { productId } = reviews[0];

  return (
    <Pagenation>
      {Array.from({ length: page.total }, (_, index) => index + 1)
        .map((number) => (
          <li key={number}>
            <button
              className="page"
              type="button"
              onClick={() => reviewStore.fetchReviews({ productId, pageNumber: number })}
            >
              {number}
            </button>
          </li>
        ))}
    </Pagenation>
  );
}
