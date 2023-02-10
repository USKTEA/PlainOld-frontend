/* eslint-disable no-alert */
import { useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';

import useOAuthStore from '../hooks/useOAuthStore';
import defaultTheme from '../styles/defaultTheme';

const Message = styled.p`
  margin-top: 5em;
  font-size: 1.5em;
  font-weight: 700;
  color: ${defaultTheme.colors.fourthText};
`;

export default function OAuthRedirectPage() {
  const navigate = useNavigate();
  const [, setAccessToken] = useLocalStorage('accessToken', '');
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const oAuthStore = useOAuthStore();
  const { errors } = oAuthStore;

  const code = searchParams.get('code');
  const provider = location.pathname.split('/').pop();

  const oAuthLogin = async () => {
    const accessToken = await oAuthStore.login({ provider, code });

    if (accessToken) {
      setAccessToken(accessToken);
      navigate('/');

      return;
    }

    window.alert(errors.login);
    navigate('/');
  };

  useEffect(() => {
    oAuthLogin();
  }, []);

  return (
    <Message>Now Logging...</Message>
  );
}
