import styled from 'styled-components';

import useUserStore from '../../hooks/useGetUserStore';
import useEditAnswerStore from '../../hooks/useEditAnswerStore';
import useGetInquiryStore from '../../hooks/useGetInquiryStore';
import useGetAnswerStore from '../../hooks/useGetAnswerStore';
import useDeleteAnswerStore from '../../hooks/useDeleteAnswerStore';

import defaultTheme from '../../styles/defaultTheme';

const Container = styled.ul`
  width: 100%;
`;

const Answer = styled.li`
  min-height: 3em;
  width: 100%;
  padding-top: 1em;
  padding-left: 2em;
  border-bottom: 1px solid ${defaultTheme.colors.fourth};
  display: flex;

  div {
    margin-bottom: .5em;
  }

  span {
    font-size: .9em;
    margin-right: 1em;
  }

  p {
    font-size: .9em;
    margin-bottom: .5em;
    color: ${defaultTheme.colors.fifth};
  }
`;

const Name = styled.span`
  color: ${defaultTheme.colors.thirdText};
`;

const Time = styled.span`
  color: ${defaultTheme.colors.primaryText};
`;

const EditForm = styled.div`
  height: 6em;
  width: 95%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  border: 1px solid ${defaultTheme.colors.fourth};
  border-radius: 3px;

  label {
    display: none;
  }

  div {
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
  }

  textarea {
    margin-top: .5em;
    padding-top: .5em;
    padding-left: 1em;
    height: 4em;
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

const ButtonContainer = styled.div`
  color: ${defaultTheme.colors.fourth};

  button {
    margin: none;
    border: none;
    background-color: white;
    color: ${defaultTheme.colors.thirdText};
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
  font-size: .8em;
  margin-right: 1em;
  color: ${defaultTheme.colors.red};
`;

export default function Answers({ answers }) {
  const { role } = useUserStore();
  const getInquiryStore = useGetInquiryStore();
  const getAnswerStore = useGetAnswerStore();
  const editAnswerStore = useEditAnswerStore();
  const deleteAnswerStore = useDeleteAnswerStore();

  const handleSetAnswer = (answer) => {
    editAnswerStore.setAnswer({ id: answer.id, content: answer.content });
  };

  const handleCancelEdit = () => {
    editAnswerStore.clear();
  };

  const fetchInquiries = async () => {
    const { inquiries } = getInquiryStore;

    const inquiryIds = inquiries.reduce((acc, i) => [...acc, i.id], []);

    await getAnswerStore.fetchAnswers({ inquiryIds });
  };

  const handleDeleteAnswer = async (answerId) => {
    const id = await deleteAnswerStore.delete({ answerId });

    if (id) {
      await fetchInquiries();
    }
  };

  const handleSubmitAnswer = async () => {
    if (!editAnswerStore.isAnswerComplete()) {
      return;
    }

    const id = await editAnswerStore.submit();

    if (id) {
      await fetchInquiries();
    }
  };

  return (
    <Container>
      {answers.map((answer) => (
        <Answer key={answer.id}>
          {editAnswerStore.answer?.id === answer.id
            ? (
              <EditForm>
                <label htmlFor="edit-answer">editAnswer</label>
                <textarea
                  id="edit-answer"
                  name="content"
                  type="text"
                  placeholder="내용을 입력해주세요"
                  value={editAnswerStore.answer.content}
                  onChange={(e) => editAnswerStore.changeContent(e.target.value)}
                />
                {editAnswerStore.hasError()
                  ? (
                    <ErrorMessage>
                      {editAnswerStore.getError()}
                    </ErrorMessage>
                  )
                  : null}
                <div>
                  <Cancel
                    type="button"
                    onClick={handleCancelEdit}
                  >
                    취소
                  </Cancel>
                  <Submit
                    type="button"
                    onClick={handleSubmitAnswer}
                  >
                    제출
                  </Submit>
                </div>
              </EditForm>
            )
            : (
              <>
                <span>{'>'}</span>
                <div>
                  <div>
                    <Name>{answer.answerer.nickname}</Name>
                    <Time>{answer.createdAt}</Time>
                  </div>
                  <p>{answer.content}</p>
                  {role === 'ADMIN' ? (
                    <ButtonContainer>
                      <button
                        type="button"
                        onClick={() => handleSetAnswer(answer)}
                      >
                        수정
                      </button>
                      /
                      <button
                        type="button"
                        onClick={() => handleDeleteAnswer(answer.id)}
                      >
                        삭제
                      </button>
                    </ButtonContainer>
                  ) : null}
                </div>
              </>
            ) }
        </Answer>
      ))}
    </Container>
  );
}
