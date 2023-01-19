import styled from 'styled-components';
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

export default function Rate({ review, changeRate }) {
  const rates = Array.from({ length: 5 }, (_, index) => index + 1);

  return (
    <Container>
      {rates.map((rate) => (
        <li key={rate}>
          {rate <= review.rate
            ? (
              <ActiveStar
                type="button"
                className="active-star"
                onClick={() => changeRate(rate)}
              >
                ★
              </ActiveStar>
            )
            : (
              <Star
                type="button"
                className="star"
                onClick={() => changeRate(rate)}
              >
                ★
              </Star>
            )}
        </li>
      ))}
    </Container>
  );
}
