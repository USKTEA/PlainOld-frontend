import styled from 'styled-components';

import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useLocalStorage } from 'usehooks-ts';

import defaultTheme from '../../styles/defaultTheme';

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

const Title = styled.h1`
  font-size: 1.6em;
  font-weight: 900;
  color: ${defaultTheme.colors.primaryText};
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
  font-size: 1.3em;
  display: flex;
  align-items: center;
  gap: 3em;

  button {
    font-size: .75em;
    padding-bottom: .5em;
  }
`;

const StyledLink = styled(Link)`
  color: ${(props) => (props.selected ? '#22DAAB' : '#2E2C6F')};
`;

const Logout = styled.button`
  border: none;
  font-weight: 800;
  background-color: white;
  margin: none;
  color: ${defaultTheme.colors.primaryText};
  cursor: pointer;
`;

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [accessToken, setAccessToken] = useLocalStorage('accessToken', '');

  const handleLogout = () => {
    setAccessToken('');
    navigate('/');
  };

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
                <Title>Plain Old</Title>
              </Link>
            </li>
            <li>
              <StyledLink
                to="products"
                selected={location.pathname.startsWith('/products')
                || location.pathname === '/order'}
              >
                SHOP
              </StyledLink>
            </li>
          </List>
          <List>
            <li>
              <StyledLink
                to={accessToken ? '/mypage' : '/login'}
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
              {accessToken ? (
                <Logout
                  type="button"
                  onClick={handleLogout}
                >
                  Logout
                </Logout>
              )
                : (
                  <StyledLink
                    to="/login"
                    selected={
                      location.pathname === '/login'
                    }
                  >
                    Login
                  </StyledLink>
                )}
            </li>
          </List>
        </Navigation>
      </Wrapper>
    </Container>
  );
}
