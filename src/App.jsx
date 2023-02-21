import { Route, Routes } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import { useEffect } from 'react';

import { Reset } from 'styled-reset';

import styled, { ThemeProvider } from 'styled-components';

import useGetUserStore from './hooks/useGetUserStore';

import GlobalStyle from './styles/GlobalStyle';

import defaultTheme from './styles/defaultTheme';

import Header from './components/header/Header';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import ProductDetailPage from './pages/ProductDetailPage';
import OrderPage from './pages/OrderPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import OrderFailurePage from './pages/OrderFailurePage';
import AccountPage from './pages/AccountPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import OAuthRedirectPage from './pages/OAuthRedirectPage';
import ErrorPage from './pages/ErrorPage';
import OrderCancelPage from './pages/OrderCancelPage';
import PaymentConfirmationPage from './pages/PaymentConfirmationPage';
import Footer from './components/footer/Footer';
import RegisterPage from './pages/RegisterPage';

const Main = styled.main`
  font-size: 1.1em;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  max-width: 1600px;
  min-width: 1024px;
  min-height: 500px;
  margin: 0 auto;
  padding: 1em;
  margin-bottom: 5em;
`;

const SubWrapper = styled.div`
  height: calc(100% - 4em);
  display: flex;
  flex-direction: column;
`;

export default function App() {
  const [accessToken] = useLocalStorage('accessToken', '');
  const [, setUsername] = useLocalStorage('username', '');

  const getUserStore = useGetUserStore();

  const fetchUserInformation = async () => {
    await getUserStore.fetchUserInformation();
  };

  useEffect(() => {
    if (accessToken) {
      fetchUserInformation();
    }

    if (!accessToken) {
      getUserStore.clear();
    }

    return () => setUsername('');
  }, [accessToken]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Reset />
      <GlobalStyle />
      <Header />
      <SubWrapper>
        <Main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<CatalogPage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/order" element={<OrderPage />} />
            <Route path="/order-success" element={<OrderSuccessPage />} />
            <Route path="/order-cancel" element={<OrderCancelPage />} />
            <Route path="/order-failure" element={<OrderFailurePage />} />
            <Route path="/payment-confirmation" element={<PaymentConfirmationPage />} />
            <Route path="/mypage" element={<AccountPage />} />
            <Route path="/mypage/order/:orderNumber" element={<AccountPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/oauth/kakao" element={<OAuthRedirectPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/error" element={<ErrorPage />} />
          </Routes>
        </Main>
        <Footer />
      </SubWrapper>
    </ThemeProvider>
  );
}
