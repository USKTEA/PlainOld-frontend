import { useEffect, useRef } from 'react';

import styled from 'styled-components';

import useDeleteInquiryStore from '../../hooks/useDeleteInquiryStore';
import useEditInquiryStore from '../../hooks/useEditInquiryStore';
import useGetInquiryStore from '../../hooks/useGetInquiryStore';
import useCreateAnswerStore from '../../hooks/useCreateAnswerStore';
import useGetAnswerStore from '../../hooks/useGetAnswerStore';
import useEditAnswerStore from '../../hooks/useEditAnswerStore';
import useUserStore from '../../hooks/useUserStore';

import defaultTheme from '../../styles/defaultTheme';
import Answers from './Answers';

const Container = styled.div`
  position: absolute;
  width: 120%;
  height: 170em;
  top: -10em;
  left: -10em;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 999;
`;

const Wrapper = styled.div`
  top: 50%;
  left: 50%;
  transform: translate(-0%, 100%);
  min-height: 27em;
  width: 50em;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 3px;
  background-color: white;
`;

const InquiryHeader = styled.div`
  height: 5em;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${defaultTheme.colors.fourth};
`;

const Status = styled.div`
  width: 10%;
  font-size: 2.5em;
  font-weight: 900;
  text-align: center;
  vertical-align: middle;
  color: ${defaultTheme.colors.fifth};
`;

const SubWrapper = styled.div`
  width: 80%;

  div {
    margin-top: .2em;
  }

  span {
    font-size: .9em;
    font-weight: 300;
    margin-right: .5em;
  }

  button {
    font-weight: 500;
    border: none;
    color: ${defaultTheme.colors.sixth};
    background-color: white;
    cursor: pointer;
  }

  em {
    font-size: .8em;
    vertical-align: middle;
    margin-left: 1em;
    color: red;
  }
`;

const InquiryTitle = styled.strong`
  font-weight: 800;
  color: ${defaultTheme.colors.thirdText};
`;

const CancelButton = styled.button`
  font-size: 2em;
  font-weight: 100;
  height: 1em;
  width: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: ${defaultTheme.colors.fifth};
  cursor: pointer;

  span {
    font-weight: 100;
  }
`;

const InquiryContentWrapper = styled.div`
  min-height: 12em;
  width: 100%;
  padding: 1.5em 1.2em 1.5em 1.2em;
  display: flex;
  border-bottom: 1px solid ${defaultTheme.colors.fourth};
`;

const InquiryContent = styled.p`
  font-weight: .9em;
  color: ${defaultTheme.colors.thirdText};
`;

const EditForm = styled.div`
  height: 11em;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  border: 1px solid ${defaultTheme.colors.fourth};
  border-radius: 3px;

  label {
    display: none;
  }

  input {
    font-weight: 700;
    height: 2em;
    width: 100%;
    padding-left: 1em;
    border: none;
    border-bottom: 1px solid ${defaultTheme.colors.fourth};

    :focus {
      outline: none;
    }
  }

  textarea {
    margin-top: .5em;
    padding-top: .5em;
    padding-left: 1em;
    height: 7em;
    width: 100%;
    border: none;
    resize: none;
    color: ${defaultTheme.colors.primaryText};

    :focus {
      outline: none;
    }

    ::placeholder {
      font-size: .8em;
      color: ${defaultTheme.colors.fourthText}
    }
  }
`;

const SubmitButton = styled.button`
  font-size: .8em;
  margin: 1em;
  height: 2.5em;
  width: 4em;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${defaultTheme.colors.primary};
  color: ${defaultTheme.colors.primaryText};
  background-color: ${(props) => (props.error ? '#11111' : '#fff')};
  cursor: pointer;
`;

const ButtonContainer = styled.div`
  display: flex;

  button {
    font-size: .8em;
    font-weight: 300;
    height: 2.5em;
    width: 4em;
    margin-top: .5em;
    margin-right: 1em;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    cursor: pointer;
  }
`;

const Submit = styled.button`
  color: white;
  background-color: ${defaultTheme.colors.secondary};
`;

const Cancel = styled.button`
  color: ${defaultTheme.colors.primaryText};
`;

const ErrorMessage = styled.strong`
  position: absolute;
  top: 11em;
  font-size: .8em;
  margin-right: 1em;
  color: ${defaultTheme.colors.red};
`;

const ReplyForm = styled.div`
  margin-top: 1em;
  margin-bottom: 1.5em;
  width: 95%;
  border: 1px solid ${defaultTheme.colors.fourth};
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  textarea {
    margin-top: .5em;
    padding-top: .5em;
    padding-left: 1em;
    height: 3em;
    width: 100%;
    border: none;
    resize: none;
    color: ${defaultTheme.colors.primaryText};

    :focus {
      outline: none;
    }

    ::placeholder {
      font-size: .8em;
      color: ${defaultTheme.colors.fourthText}
    }
  }
`;

export default function InquiryModal({ inquiry, setInquiry }) {
  const modalRef = useRef(null);

  const getInquiryStore = useGetInquiryStore();
  const editInquiryStore = useEditInquiryStore();
  const deleteInquiryStore = useDeleteInquiryStore();
  const getAnswerStore = useGetAnswerStore();

  const createAnswerStore = useCreateAnswerStore();
  const editAnswerStore = useEditAnswerStore();
  const { answer } = useCreateAnswerStore();
  const { answers } = useGetAnswerStore();
  const { username, role } = useUserStore();
  const { inquiries } = getInquiryStore;

  const handler = ({ target }) => {
    if (modalRef.current && !modalRef.current.contains(target)) {
      setInquiry(null);
    }
  };

  const fetchInquiries = async () => {
    await getInquiryStore.fetchInquiries(
      { productId: inquiry.productId, pageNumber: 1 },
    );
  };

  const handleCancelEdit = () => {
    editInquiryStore.clear();
  };

  const handleSetInquiry = () => {
    editInquiryStore.setInquiry(
      { id: inquiry.id, title: inquiry.title, content: inquiry.content },
    );
  };

  const handleDeleteInquiry = async () => {
    const id = await deleteInquiryStore.delete({ inquiryId: inquiry.id });

    if (id) {
      await fetchInquiries();

      setInquiry(null);
    }
  };

  const handleSubmitInquiry = async () => {
    if (!editInquiryStore.isInquiryComplete()) {
      return;
    }

    const id = await editInquiryStore.submit();

    if (id) {
      await fetchInquiries();

      setInquiry(null);
    }
  };

  const handleSubmitAnswer = async () => {
    if (!createAnswerStore.isAnswerComplete()) {
      return;
    }

    const id = await createAnswerStore.submit();

    const inquiryIds = inquiries
      .reduce((acc, i) => [...acc, i.id], []);

    if (id) {
      await fetchInquiries();
      await getAnswerStore.fetchAnswers({ inquiryIds });
    }
  };

  useEffect(() => {
    createAnswerStore.setInquiryId({ inquiryId: inquiry.id });
    document.addEventListener('mousedown', handler);

    return () => {
      editInquiryStore.clear();
      deleteInquiryStore.clear();
      createAnswerStore.clear();
      editAnswerStore.clear();
      document.removeEventListener('mousedown', handler);
    };
  }, []);

  return (
    <Container>
      <Wrapper ref={modalRef}>
        <InquiryHeader>
          <Status>
            {inquiry.status === 'PENDING'
              ? '・・・'
              : '⎷'}
          </Status>
          <SubWrapper>
            <InquiryTitle>{inquiry.title}</InquiryTitle>
            <div>
              <span>{inquiry.querist.nickname}</span>
              <span>{inquiry.createdAt}</span>
              {username === inquiry.querist.username || role === 'ADMIN'
                ? (
                  <>
                    {inquiry.status === 'FINISHED'
                      ? null
                      : (
                        <>
                          <button
                            type="button"
                            onClick={handleSetInquiry}
                          >
                            수정
                          </button>
                          /
                        </>
                      )}
                    <button
                      type="button"
                      onClick={handleDeleteInquiry}
                    >
                      삭제
                    </button>
                    {deleteInquiryStore.errors.delete
                      ? (
                        <em>
                          {deleteInquiryStore.errors.delete}
                        </em>
                      )
                      : null}
                  </>
                ) : null}
            </div>
          </SubWrapper>
          <CancelButton
            type="button"
            onClick={() => setInquiry(null)}
          >
            ✕
          </CancelButton>
        </InquiryHeader>
        <InquiryContentWrapper>
          {editInquiryStore.inquiry
            ? (
              <EditForm>
                <label htmlFor="edit-title">editTitle</label>
                <input
                  type="text"
                  name="title"
                  id="edit-title"
                  placeholder="제목을 입력해주세요"
                  value={editInquiryStore.inquiry.title}
                  onChange={(e) => editInquiryStore.changeTitle(e.target.value)}
                />
                <label htmlFor="edit-content">editContent</label>
                <textarea
                  id="edit-content"
                  name="content"
                  type="text"
                  placeholder="내용을 입력해주세요"
                  value={editInquiryStore.inquiry.content}
                  onChange={(e) => editInquiryStore.changeContent(e.target.value)}
                />
                {editInquiryStore.hasError()
                  ? (
                    <ErrorMessage>
                      {editInquiryStore.getError()}
                    </ErrorMessage>
                  )
                  : null}
                <ButtonContainer>
                  <Cancel
                    type="button"
                    onClick={handleCancelEdit}
                  >
                    취소
                  </Cancel>
                  <Submit
                    type="button"
                    onClick={handleSubmitInquiry}
                  >
                    제출
                  </Submit>
                </ButtonContainer>
              </EditForm>
            )
            : <InquiryContent>{inquiry.content}</InquiryContent>}
        </InquiryContentWrapper>
        {answers.get(inquiry.id)
          ? <Answers answers={answers.get(inquiry.id)} />
          : null}
        <ReplyForm>
          <textarea
            type="text"
            placeholder={role === 'ADMIN' ? '답글' : '관리자만 답글 작성이 가능합니다'}
            readOnly={!(role === 'ADMIN')}
            value={answer.content}
            onChange={(e) => createAnswerStore.changeContent(e.target.value)}
          />
          <SubmitButton
            type="button"
            error={createAnswerStore.errors}
            onClick={handleSubmitAnswer}
          >
            작성
          </SubmitButton>
        </ReplyForm>
      </Wrapper>
    </Container>
  );
}
