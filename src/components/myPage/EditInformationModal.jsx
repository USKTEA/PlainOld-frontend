import { useEffect, useRef } from 'react';
import styled from 'styled-components';

import useEditUserStore from '../../hooks/useEditUserStore';
import useGetUserStore from '../../hooks/useGetUserStore';

import defaultTheme from '../../styles/defaultTheme';

const Container = styled.div`
  position: absolute;
  width: 120%;
  height: 200%;
  top: -10em;
  left: -10em;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 999;
`;

const Wrapper = styled.div`
  width: 22em;
  padding: 2em 1em 0em 1em;
  position: absolute;
  top: 25em;
  box-shadow: 1px 1px 5px 0px;
  border-radius: 3px;
  background-color: white;
  letter-spacing: 1px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 1.3em;
  font-weight: 700;
  margin-bottom: 1.5em;
`;

const EditForm = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  color: ${defaultTheme.colors.seventh};

  label {
    margin-bottom: .5em;
  }

  input {
    font-size: .8em;
    height: 3em;
    margin-bottom: 1em;
    padding-left: 1em;
    color: ${defaultTheme.colors.seventh};

    :focus {
      outline: none;
    }
  }

  button {
    height: 3em;
    margin-top: 1em;
    margin-bottom: 1em;
    border: none;
    color: white;
    background-color: ${defaultTheme.colors.sixth};
    cursor: pointer;
  }
`;

const Message = styled.span`
  font-size: .7em;
  color: red;
`;

export default function EditInformationModal({ setModalOpen }) {
  const modalRef = useRef(null);

  const getUserStore = useGetUserStore();
  const editUserStore = useEditUserStore();

  const { nickname } = getUserStore;
  const { errors } = editUserStore;

  const handler = ({ target }) => {
    if (modalRef.current && !modalRef.current.contains(target)) {
      setModalOpen((previous) => !previous);
    }
  };

  const handleEditUserInformation = async () => {
    const username = await editUserStore.edit();

    if (username) {
      await getUserStore.fetchUserInformation();
      setModalOpen((previous) => !previous);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handler);
    editUserStore.changeNickname(nickname);

    return () => {
      editUserStore.clear();
      document.removeEventListener('mousedown', handler);
    };
  }, []);

  return (
    <Container>
      <Wrapper ref={modalRef}>
        <Title>정보 수정</Title>
        <EditForm>
          <label htmlFor="username">E-mail*</label>
          <input
            type="text"
            name="username"
            id="username"
            value={editUserStore.username}
            onChange={(e) => editUserStore.changeUsername(e.target.value)}
            placeholder="회원가입에 사용한 이메일을 입력해주세요"
          />
          <label htmlFor="nickname">닉네임*</label>
          <input
            id="nickname"
            type="text"
            value={editUserStore.nickname}
            onChange={(e) => editUserStore.changeNickname(e.target.value)}
          />
          {errors
            ? <Message>{errors}</Message>
            : null}
          <button
            type="button"
            onClick={handleEditUserInformation}
          >
            확인
          </button>

        </EditForm>
      </Wrapper>
    </Container>
  );
}
