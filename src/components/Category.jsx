import { Link } from 'react-router-dom';

import styled from 'styled-components';

import useCategoryStore from '../hooks/useCategoryStore';
import defaultTheme from '../styles/defaultTheme';

const Navigation = styled.nav`
  font-size: 25px;
  font-weight: 300;
`;

const StyledLink = styled(Link)`
  color: ${defaultTheme.colors.primaryText};
`;

export default function Category() {
  const categoryStore = useCategoryStore();

  const { categories } = categoryStore;

  return (
    <Navigation>
      <ul>
        <li>
          <StyledLink to="/products">All</StyledLink>
        </li>
        {categories.map((category) => (
          <li key={category.id}>
            <StyledLink
              to={`/products?category=${category.id}`}
            >
              {category.name}
            </StyledLink>
          </li>
        ))}
      </ul>
    </Navigation>
  );
}
