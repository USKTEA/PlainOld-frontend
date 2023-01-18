import styled from 'styled-components';
import useUserStore from '../../hooks/useUserStore';
import defaultTheme from '../../styles/defaultTheme';

import ReviewRate from './ReviewRate';

const Container = styled.li`
  height: 20em;
  width: 100%;
  padding-top: 1em;
  padding-bottom: 1em;
  border-bottom: 1px solid ${defaultTheme.colors.fourth};
  display: flex;
  flex-direction: column;

  p {
    color: ${defaultTheme.colors.primaryText}
  }

  > button {
    background-color: white;
  }
`;

const ReviewInformation = styled.div`
  font-size: .8em;
  font-weight: 300;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  p {
    color: ${defaultTheme.colors.sixth};
    margin-bottom: .5em;
    font-weight: 100;
  }
`;

const RateContentReply = styled.div`
  height: 100%;
  width: 90%;
  display: flex;
  flex-direction: column;
  align-content: space-between;
  justify-content: space-between;

  p {
    margin-top: 1.3em;
  }
`;

const SubContainer = styled.div`
  display: flex;
  width: 100%;
`;

const Wrapper = styled.div`
  padding: .5em;
  width: 90%;

  span {
    font-size: .9em;
    font-weight: 700;
    margin-top: 1em;
    display: inline-block;
  }
`;

const ReplyForm = styled.div`
  margin-top: 1em;
  border: 1px solid ${defaultTheme.colors.fourth};
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  textarea {
    margin-top: .5em;
    padding-top: .5em;
    padding-left: 1em;
    height: 6em;
    width: 100%;
    border: none;
    resize: none;
    color: ${defaultTheme.colors.primaryText};

    :focus {
      outline: none;
    }
  }
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

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;

  button {
   width: 3em;
   font-size: .8em;
   background-color: white;
   color: ${defaultTheme.colors.fourthText};
  }

  button:first-child {
    border-right: 1px solid ${defaultTheme.colors.fourthText};
  }
`;

export default function SelectedReview({ review, handleClick }) {
  const { username } = useUserStore();

  console.log(username);
  return (
    <Container className="review">
      <button type="button" onClick={() => handleClick(review.id)}>
        <RateContentReply>
          <ReviewRate rate={review.rate} />
          <p>
            {review.comment}
          </p>
        </RateContentReply>
        <ReviewInformation>
          <p>
            {review.reviewer.nickname}
          </p>
          <p>
            {review.createdAt}
          </p>
        </ReviewInformation>
      </button>
      <SubContainer>
        <Wrapper>
          <span>댓글 0</span>
          <ReplyForm>
            <textarea type="text" placeholder={username ? '댓글' : '로그인이 필요합니다'} />
            <SubmitButton type="button">작성</SubmitButton>
          </ReplyForm>
        </Wrapper>
        <div>
          {review.reviewer.username === username
            ? (
              <ButtonContainer>
                <button type="button">수정</button>
                <button type="button">삭제</button>
              </ButtonContainer>
            )
            : null}
        </div>
      </SubContainer>
    </Container>
  );
}
