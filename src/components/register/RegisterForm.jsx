/* eslint-disable no-alert */
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useCreateUserStore from '../../hooks/useCreateUserStore';
import defaultTheme from '../../styles/defaultTheme';

const Container = styled.article`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 1.5em;
  font-weight: 300;
  text-align: center;
`;

const Inputs = styled.div`
  width: 100%;
  margin-top: 2em;
`;

const Input = styled.input`
  font-size: .8em;
  height: 3em;
  width: 30em;
  padding: 1em;
  border: 1px solid ${defaultTheme.colors.fourth};
  color: ${defaultTheme.colors.thirdText};

  :focus {
    outline: none;
  }
`;

const InputWrapper = styled.div`
  & + & {
    margin-top: 1em;
  }
`;

const Label = styled.label`
  font-size: .9em;
  font-weight: 300;
  display: block;
  margin-bottom: .3em;
  color: ${defaultTheme.colors.primaryText};
`;

const ErrorMessage = styled.p`
  font-size: .7em;
  margin-top: .5em;
  color: red;
`;

const DefaultMessage = styled.p`
  font-size: .7em;
  margin-top: .5em;
  color: ${defaultTheme.colors.fourthText};
`;

const FormButton = styled.button`
  font-size: .7em;
  height: 3.5em;
  width: 100%;
  margin-top: 2.5em;
  border: none;
  color: white;
  background-color: ${defaultTheme.colors.secondary};

  cursor: pointer;
`;

export default function RegisterForm() {
  const navigate = useNavigate();

  const createUserStore = useCreateUserStore();
  const { fields, errors } = createUserStore;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (createUserStore.hasError()) {
      return;
    }

    const username = await createUserStore.create();

    if (username) {
      window.alert('회원가입 성공! 로그인을 진행해주세요');

      navigate('/login');
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Title>회원가입</Title>
        <Inputs>
          <InputWrapper>
            <Label htmlFor="input-nickname">닉네임:</Label>
            <Input
              id="input-nickname"
              type="text"
              name="nickname"
              value={fields.nickname}
              onChange={(e) => createUserStore.changeField((
                { nickname: e.target.value }))}
            />
            {errors.nickname
              ? (<ErrorMessage>{errors.nickname}</ErrorMessage>)
              : null }
          </InputWrapper>
          <InputWrapper>
            <Label htmlFor="input-username">이메일:</Label>
            <Input
              id="input-username"
              type="text"
              name="username"
              value={fields.username}
              onChange={(e) => createUserStore.changeField((
                { username: e.target.value }))}
            />
            {errors.username
              ? (<ErrorMessage>{errors.username}</ErrorMessage>)
              : null }
          </InputWrapper>
          <InputWrapper>
            <Label htmlFor="input-password">비밀번호:</Label>
            <Input
              id="input-password"
              type="password"
              name="password"
              autoComplete="password"
              value={fields.password}
              onChange={(e) => createUserStore.changeField((
                { password: e.target.value }))}
            />
            {!errors.password
              ? (
                <DefaultMessage>
                  8글자 이상의 영문(대소문자), 숫자, 특수문자가 모두 포함되어야 함
                </DefaultMessage>
              )
              : null }
            {errors.password
              ? (<ErrorMessage>{errors.password}</ErrorMessage>)
              : null }
          </InputWrapper>
          <InputWrapper>
            <Label htmlFor="input-confirm-password">비밀번호 확인:</Label>
            <Input
              id="input-confirm-password"
              type="password"
              name="confirmPassword"
              autoComplete="confirmPassword"
              value={fields.confirmPassword}
              onChange={(e) => (
                createUserStore.changeField((
                  { confirmPassword: e.target.value }))
              )}
            />
            {errors.confirmPassword
              ? (<ErrorMessage>{errors.confirmPassword}</ErrorMessage>)
              : null }
          </InputWrapper>
        </Inputs>
        {errors.create
          ? <ErrorMessage>{errors.create}</ErrorMessage>
          : null}
        <FormButton
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          회원가입
        </FormButton>
      </form>
    </Container>
  );
}
