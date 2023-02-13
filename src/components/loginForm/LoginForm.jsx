/* eslint-disable react/jsx-props-no-spreading */
import styled from 'styled-components';

import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';

import defaultTheme from '../../styles/defaultTheme';

import useUserStore from '../../hooks/useUserStore';
import useOAuthStore from '../../hooks/useOAuthStore';

const Container = styled.div`
  width: 30%;


  height: calc(100vh - 13em);
  button {
    cursor: pointer;
  }
`;

const FormWrapper = styled.div`
  margin-bottom: 1em;
`;

const Form = styled.form`
  margin-top: 3em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  font-size: .7em;
  font-weight: 400;
  height: 3.3em;
  width: 100%;
  margin-bottom: .1em;
  padding: 1em;
  border: ${(props) => (`1px solid${props.error ? '#FF424D' : '#D8D8D8'}`)};

  :focus {
    outline: none;
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  button {
    font-weight: 400;
    font-size: .8em;
    border: none;
    background-color: white;
    color: ${defaultTheme.colors.sixth};
  }
`;

const LoginButton = styled.button`
  font-size: .8em;
  margin-top: .5em;
  margin-bottom: 1em;
  height: 2.5em;
  width: 100%;
  border: 1px solid ${defaultTheme.colors.primary};
  color: ${defaultTheme.colors.sixth};
  background-color: white;
  cursor: pointer;

  :hover {
    background-color: ${defaultTheme.colors.primary};
    color: white;
  }
`;

const Divider = styled.div`
  margin-top: 1em;
  margin-bottom:1.5em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  color: ${defaultTheme.colors.primaryText};

  span {
    width: 10%;
    font-size: .8em;
  }

  div {
    width: 40%;
    border-bottom: 1px solid ${defaultTheme.colors.fourth};
  }
`;

const SearchGuestOrder = styled.button`
  font-size: .5em;
  font-weight: 300;
  padding: 1em;
  width: 100%;
  height: 4em;
  border: none;
  background-color: ${defaultTheme.colors.seventh};
  color: white;
`;

const HiddenError = styled.p`
  display: none;
`;

const Error = styled.p`
  width: 100%;
  font-size: .7em;
  margin-top: .5em;
  color: ${defaultTheme.colors.red};
`;

const SocialLoginButtonContainer = styled.div`
  margin-bottom: .5em;
`;

const Kakao = styled.button`
  height: 30px;
  width: 60px;
  border: none;
  background: url(/assets/images/kakao.png) no-repeat 100% 100%;
`;

export default function LoginForm() {
  const navigate = useNavigate();

  const {
    register, handleSubmit, formState: { errors },
  } = useForm();

  const [, setAccessToken] = useLocalStorage('accessToken', '');

  const userStore = useUserStore();
  const oAuthStore = useOAuthStore();

  const onSubmit = async (data) => {
    const { username, password } = data;

    const accessToken = await userStore.login({ username, password });

    if (accessToken) {
      setAccessToken(accessToken);

      navigate('/');
    }
  };

  const handleOAuthLogin = async (provider) => {
    const redirectUrl = await oAuthStore.getRedirectUrl({ provider });

    window.location.href = redirectUrl;
  };

  return (
    <Container>
      <FormWrapper>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="text"
            placeholder="이메일"
            error={errors.username}
            {...register('username', {
              required: true,
            })}
          />
          <Input
            type="password"
            placeholder="비밀번호"
            autoComplete="password"
            error={errors.password}
            {...register('password', {
              required: true,
            })}
          />
          <HiddenError>
            {errors.username?.type === 'required' && '이메일을 입력해주세요'}
            {errors.password?.type === 'required' && !errors.username
        && '비밀번호를 입력해주세요'}
          </HiddenError>
          <Error>
            {userStore.errors.login && `${userStore.errors.login}`}
          </Error>
          <LoginButton
            type="submit"
            onClick={handleSubmit}
          >
            로그인
          </LoginButton>
          <ButtonContainer>
            <button type="button">회원가입</button>
            <button type="button">아이디 · 비밀번호 찾기</button>
          </ButtonContainer>
        </Form>
      </FormWrapper>
      <Divider>
        <div />
        <span>또는</span>
        <div />
      </Divider>
      <SocialLoginButtonContainer>
        <Kakao
          type="button"
          onClick={() => handleOAuthLogin('kakao')}
        />
      </SocialLoginButtonContainer>
      <SearchGuestOrder>비회원 주문배송 조회</SearchGuestOrder>
    </Container>
  );
}
