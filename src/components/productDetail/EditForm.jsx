import styled from 'styled-components';
import useEditReplyStore from '../../hooks/useEditReplyStore';
import useGetReplyStore from '../../hooks/useGetReplyStore';
import useGetReviewStore from '../../hooks/useGetReviewStore';
import defaultTheme from '../../styles/defaultTheme';

const Container = styled.div`
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

const ErrorMessage = styled.strong`
  font-size: .9em;
  margin-right: 1em;
  color: ${defaultTheme.colors.red};
`;

export default function EditForm() {
  const editReplyStore = useEditReplyStore();
  const getReplyStore = useGetReplyStore();
  const getReviewStore = useGetReviewStore();

  const handleSubmitEdited = async () => {
    if (!editReplyStore.validate()) {
      return;
    }

    const id = await editReplyStore.submitEdited();

    if (id) {
      const { reviews } = getReviewStore;
      const reviewIds = reviews.reduce((acc, i) => [...acc, i.id], []);

      await getReplyStore.fetchReplies({ reviewIds });
    }
  };

  const handleCancelEdit = () => {
    editReplyStore.clear();
  };

  return (
    <Container>
      <textarea
        type="text"
        placeholder="내용을 입력해주세요"
        value={editReplyStore.toEdit.comment}
        onChange={(e) => editReplyStore.editComment(e.target.value)}
      />
      {editReplyStore.errors.edit
        ? (
          <ErrorMessage>
            {editReplyStore.errors.edit}
          </ErrorMessage>
        )
        : null}
      <ButtonContainer>
        <CancelButton
          type="button"
          onClick={handleCancelEdit}
        >
          취소
        </CancelButton>
        <SubmitButton
          type="button"
          onClick={handleSubmitEdited}
        >
          작성
        </SubmitButton>
      </ButtonContainer>
    </Container>
  );
}
