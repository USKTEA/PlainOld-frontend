import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.header`
  font-weight: 800;
  width: 100%;
  height: 4em;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1400px;
  min-width: 1024px;
  height: 100%;
  margin: 0 auto;
`;

const Navigation = styled.nav`
  display: flex;
  width: 100%;
  height: 100%;
  margin-left: 1em;
  margin-right: 1em;

  ul:first-child {
    flex: 1;
  };
`;

const List = styled.ul`
  display: flex;
  align-items: center;
  gap: 3em;
`;

const StyledLink = styled(Link)`
  color: ${(props) => (props.selected ? '#22DAAB' : '#2E2C6F')};
`;

const Title = styled.h2`
  font-size: 30px;

  color: #2E2C6F;
  font-weight: 900;
`;

export default function Header() {
  const location = useLocation();

  return (
    <Container>
      <Wrapper>
        <Navigation>
          <List>
            <li>
              <Link
                to="/"
                selected={location.pathname === '/'}
              >
                <Title>Plain-O</Title>
              </Link>
            </li>
            <li>
              <StyledLink
                to="products"
                selected={location.pathname.startsWith('/products') || location.pathname === '/order'}
              >
                SHOP
              </StyledLink>
            </li>
            <li>
              <StyledLink
                to="/brand"
                selected={location.pathname === ('/brand')}
              >
                ABOUT
              </StyledLink>
            </li>
          </List>
          <List>
            <li>
              <StyledLink
                to="/mypage"
                selected={
                  location.pathname === '/mypage'
                  || location.pathname.startsWith('/orders')
                  || location.pathname.startsWith('/wishes')
                  || location.pathname.startsWith('/qnas')
                }
              >
                Account
              </StyledLink>
            </li>
            <li>
              <StyledLink
                to="/cart"
                selected={location.pathname === '/cart'}
              >
                Cart
              </StyledLink>
            </li>
            <li>
              <StyledLink
                to="/login"
                selected={
                  location.pathname === '/login'
                }
              >
                Login
              </StyledLink>
            </li>
          </List>
        </Navigation>
      </Wrapper>
    </Container>
  );
}
