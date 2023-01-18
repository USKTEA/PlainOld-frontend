import styled from 'styled-components';
import useCreateReviewStore from '../../hooks/useCreateReviewStore';
import defaultTheme from '../../styles/defaultTheme';

const Container = styled.ul`
  display: flex;

  button {
    background-color: white;
    border: none;
    font-size: 2em;
    cursor: pointer;
  }
`;

const ActiveStar = styled.button`
  color: red;
`;

const Star = styled.button`
  color: ${defaultTheme.colors.fourth};

  :hover {
    color: ${defaultTheme.colors.sixth};
    transition: all .5s;
  }
`;

export default function Rate() {
  const createReviewStore = useCreateReviewStore();
  const rates = Array.from({ length: 5 }, (_, index) => index + 1);

  const { review } = createReviewStore;

  const handleChangeRate = (rate) => {
    createReviewStore.changeRate(rate);
  };

  return (
    <Container>
      {rates.map((rate) => (
        <li key={rate}>
          {rate <= review.rate
            ? (
              <ActiveStar
                type="button"
                className="active-star"
                onClick={() => handleChangeRate(rate)}
              >
                ★
              </ActiveStar>
            )
            : (
              <Star
                type="button"
                className="star"
                onClick={() => handleChangeRate(rate)}
              >
                ★
              </Star>
            )}
        </li>
      ))}
    </Container>
  );
}
