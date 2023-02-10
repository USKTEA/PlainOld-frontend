import styled from 'styled-components';
import defaultTheme from '../../styles/defaultTheme';

const Commands = styled.ul`
  width: 100%;
  display: flex;
  justify-content: space-between;

  li {
    width: 33%;

    button {
      font-size: .8em;
      font-weight: 500;
      height: 2em;
      width: 100%;
      text-align: center;
      vertical-align: middle;
      border: none;
      border-bottom: 1px solid ${defaultTheme.colors.fourth};
      color: ${defaultTheme.colors.primaryText};
      background-color: white;
      cursor: pointer;
     }
}`;

export default function ScrollCommand({ scrollTo }) {
  return (
    <Commands>
      <li>
        <button
          type="button"
          onClick={() => scrollTo('상세정보')}
        >
          상세정보
        </button>
      </li>
      <li>
        <button
          type="button"
          onClick={() => scrollTo('Review')}
        >
          Review
        </button>
      </li>
      <li>
        <button
          type="button"
          onClick={() => scrollTo('Q&A')}
        >
          Q&A
        </button>
      </li>
    </Commands>
  );
}
