import styled from 'styled-components';
import defaultTheme from '../../styles/defaultTheme';

const Rates = styled.ul`
  display: flex;
`;

const ActiveStar = styled.span`
  color: ${defaultTheme.colors.red};
`;

const Star = styled.span`
  color: ${defaultTheme.colors.fourth};
`;

export default function ReviewRate({ rate }) {
  const points = Array.from({ length: 5 }, (_, index) => index + 1);

  return (
    <Rates>
      {points.map((point) => (
        <li key={point} className={point ? 'star-active' : 'star'}>
          {point <= rate
            ? <ActiveStar>★</ActiveStar> : <Star>★</Star> }
        </li>
      ))}
    </Rates>
  );
}
