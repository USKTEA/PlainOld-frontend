import styled from 'styled-components';

import { Link, useSearchParams } from 'react-router-dom';

import defaultTheme from '../styles/defaultTheme';

import useProductStore from '../hooks/useProductStore';

import numberFormat from '../utils/numberFormat';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  top: 3em;
  padding-block: 3em;
`;

const List = styled.ul`
  display: grid;
  grid-template: repeat(2, 1fr) / repeat(4, 1fr);
  gap: 5em;
  margin-bottom: 3em;
`;

const Item = styled.li`
  display: flex;
  justify-content: center;
`;

const Image = styled.img`
  margin-bottom: 1em;
`;

const Name = styled.p`
  font-size: 1em;
  font-weight: 900;
  margin-block: 0.5em;

  color: ${defaultTheme.colors.primaryText};
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const Price = styled.strong`
  font-size: 0.8em;
  color: ${defaultTheme.colors.primaryText};
`;

const Message = styled.p`
  font-size: 1.5em;
  font-weight: 500;
  margin-top: 5em;
  text-align: center;

  color: ${defaultTheme.colors.primaryText};
`;

const Pagination = styled.nav`
  display: flex;
  justify-content: center;

  li {
    margin-right: 1em;
  }
`;

export default function Products() {
  const [searchParams] = useSearchParams();

  const category = searchParams.get('category');

  const productStore = useProductStore();

  const { products, page } = productStore;

  if (products.length === 0) {
    return <Message>상품이 존재하지 않습니다</Message>;
  }

  return (
    <Container>
      <List>
        {products.map((product) => (
          <Item key={product.id}>
            <Link to={`/products/${product.id}`}>
              <Image
                src={`/assets/images/${product.thumbnailUrl}.png`}
                alt={product.name}
                width={250}
                height={250}
              />
              <Name>{product.name}</Name>
              {product.price === 0
                ? <Price>무료</Price>
                : <Price>{`${numberFormat(product.price)}원`}</Price>}
            </Link>
          </Item>
        ))}
      </List>
      <Pagination>
        {Array.from({ length: page.total }, (_, index) => (
          <li key={index}>
            {category
              ? (
                <Link to={`/products?category=${category}&page=${index + 1}`}>
                  {index + 1}
                </Link>
              )
              : (
                <Link to={`/products?page=${index + 1}`}>
                  {index + 1}
                </Link>
              )}
          </li>
        ))}
      </Pagination>
    </Container>
  );
}
