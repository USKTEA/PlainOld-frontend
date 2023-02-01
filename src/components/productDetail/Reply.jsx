/* eslint-disable no-alert */
import { useEffect } from 'react';
import styled from 'styled-components';

import useCreateReplyStore from '../../hooks/useCreateReplyStore';
import useDeleteReplyStore from '../../hooks/useDeleteReplyStore';
import useEditReplyStore from '../../hooks/useEditReplyStore';
import useGetReplyStore from '../../hooks/useGetReplyStore';
import useGetReviewStore from '../../hooks/useGetReviewStore';
import useUserStore from '../../hooks/useUserStore';

import defaultTheme from '../../styles/defaultTheme';
import EditForm from './EditForm';

const Container = styled.div`
  display: flex;
  min-height: 5em;
  padding-top: 1em;
  padding-bottom: 1em;
  padding-left: .5em;
  border-bottom: 1px solid ${defaultTheme.colors.fourth};
`;

const SubContainer = styled.div`
  height: 100%;
  min-height: 4em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  p {
    font-size: .9em;
  }
`;

const SubWrapper = styled.div`
  display: flex;
  align-items: center;

  em {
    font-weight: 400;
    margin-top: 0em;
    margin-right: 1em;
    font-size: .9em;
  }

  strong {
    font-size: .9em;
    font-weight: 100;
  }
`;

const ReplyIcon = styled.div`
  height: 100%;
  font-size: 1.2em;
  margin-right: 1em;
  padding-top: 1em;
  transform: scaleX(-1);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  color: ${defaultTheme.colors.fourth};

  button {
    font-size: .8em;
    color: ${defaultTheme.colors.fifth};
    background-color: white;
  }
`;

const ReplyForm = styled.div`
  margin-top: 1em;
  margin-bottom: 1em;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  border: 1px solid ${defaultTheme.colors.fourth};
  border-radius: 3px;

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
  display: flex;
`;

const SubmitButton = styled.button`
  font-size: .8em;
  font-weight: 300;
  margin: 1em;
  height: 2.5em;
  width: 4em;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background-color: ${defaultTheme.colors.secondary};
`;

const CancelButton = styled.button`
  font-size: .8em;
  font-weight: 300;
  margin-top: 1em;
  height: 2.5em;
  width: 4em;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${defaultTheme.colors.primaryText};
`;

const ErrorMessage = styled.strong`
  font-size: .9em;
  margin-right: 1em;
  color: ${defaultTheme.colors.red};
`;

export default function Reply({ reply, isFirstReply }) {
  const { username } = useUserStore();
  const createReplyStore = useCreateReplyStore();
  const getReviewStore = useGetReviewStore();
  const getReplyStore = useGetReplyStore();
  const editReplyStore = useEditReplyStore();
  const deleteReplyStore = useDeleteReplyStore();

  useEffect(() => {
    createReplyStore.clear();
    editReplyStore.clear();
  }, [reply]);

  const handleSelectReply = () => {
    createReplyStore.setParent(reply.parent || reply.id);
    createReplyStore.setToReply({ replyId: reply.id });
  };

  const handleCancelReply = () => {
    createReplyStore.removeToReply();
  };

  const handleSubmitReply = async () => {
    if (!createReplyStore.validateReplyToReply()) {
      return;
    }

    const id = await createReplyStore.createReplyToReply(
      { reviewId: reply.reviewId },
    );

    if (id) {
      const { reviews } = getReviewStore;
      const reviewIds = reviews.reduce((acc, i) => [...acc, i.id], []);

      await getReplyStore.fetchReplies({ reviewIds });
    }
  };

  const handleSelectToEdit = () => {
    editReplyStore.setToEdit(
      { id: reply.id, reviewId: reply.reviewId, comment: reply.comment },
    );
  };

  const handleDeleteReply = async () => {
    const id = await deleteReplyStore.delete({ id: reply.id });

    if (id) {
      const { reviews } = getReviewStore;
      const reviewIds = reviews.reduce((acc, i) => [...acc, i.id], []);

      await getReplyStore.fetchReplies({ reviewIds });

      return;
    }

    window.alert(deleteReplyStore.errors.delete);
  };

  return (
    <Container>
      {isFirstReply
        ? null
        : <ReplyIcon>⏎</ReplyIcon> }
      <Wrapper>
        {editReplyStore.toEdit.id === reply.id
          ? <EditForm />
          : (
            <>
              <SubContainer>
                <SubWrapper>
                  <em>{reply.replier.nickname}</em>
                  <strong>{reply.createdAt}</strong>
                </SubWrapper>
                <p>{reply.comment}</p>
                <ButtonWrapper>
                  {username ? (
                    <>
                      <button
                        type="button"
                        onClick={handleSelectReply}
                      >
                        댓글
                      </button>
                      {username === reply.replier.username
                        ? (
                          <>
                            /
                            <button
                              type="button"
                              onClick={handleSelectToEdit}
                            >
                              수정
                            </button>
                            /
                            <button
                              type="button"
                              onClick={handleDeleteReply}
                            >
                              삭제
                            </button>
                          </>
                        )
                        : null}
                    </>
                  )
                    : null}
                </ButtonWrapper>
              </SubContainer>
              {createReplyStore.toReply === reply.id
                ? (
                  <ReplyForm>
                    <textarea
                      type="text"
                      placeholder="내용을 입력해주세요"
                      value={createReplyStore.replyToReply.comment}
                      onChange={(e) => createReplyStore.changeReplyToReply(e.target.value)}
                    />
                    {createReplyStore.errors.create
                      ? (
                        <ErrorMessage>
                          {createReplyStore.errors.create}
                        </ErrorMessage>
                      )
                      : null}
                    <ButtonContainer>
                      <CancelButton
                        type="button"
                        onClick={handleCancelReply}
                      >
                        취소
                      </CancelButton>
                      <SubmitButton
                        type="button"
                        onClick={handleSubmitReply}
                      >
                        작성
                      </SubmitButton>
                    </ButtonContainer>
                  </ReplyForm>
                )
                : null}
            </>
          )}
      </Wrapper>
    </Container>
  );
}
