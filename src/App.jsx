import { Route, Routes } from 'react-router-dom';

import { Reset } from 'styled-reset';

import styled, { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';

import defaultTheme from './styles/defaultTheme';

import Header from './components/Header';

import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import ProductDetailPage from './pages/ProductDetailPage';
import OrderPage from './pages/OrderPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import OrderFailurePage from './pages/OrderFailurePage';
import BrandPage from './pages/BrandPage';
import AccountPage from './pages/AccountPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import ErrorPage from './pages/ErrorPage';

const Main = styled.main`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 1600x;
  min-width: 1024px;
  height: calc(100vh - 4em);
  min-height: 500px;
  margin: 0 auto;
  padding: 1em;
`;

export default function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Reset />
      <GlobalStyle />
      <Header />
      <Main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<CatalogPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/order-success" element={<OrderSuccessPage />} />
          <Route path="/order-failure" element={<OrderFailurePage />} />
          <Route path="/brand" element={<BrandPage />} />
          <Route path="/mypage" element={<AccountPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/error" element={<ErrorPage />} />
        </Routes>
      </Main>
    </ThemeProvider>
  );
}
