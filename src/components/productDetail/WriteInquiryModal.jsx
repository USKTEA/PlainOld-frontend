import { useEffect, useRef } from 'react';

import styled from 'styled-components';

import useCreateInquiryStore from '../../hooks/useCreateInquiryStore';
import useGetInquiryStore from '../../hooks/useGetInquiryStore';
import useProductStore from '../../hooks/useProductStore';

import defaultTheme from '../../styles/defaultTheme';

const Container = styled.div`
  position: absolute;
  width: 120%;
  height: 250em;
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
  transform: translate(-0%, -50%);
  height: 33em;
  width: 24em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-radius: 3px;
  background-color: white;
`;

const SubWrapper = styled.div`
  width: 100%;
  padding: 1em;
  display: flex;
  flex-direction: column;
`;

const Title = styled.label`
  height: 3em;
  font-size: .9em;
  width: 100%;
  padding-top: 1em;
  padding-bottom: 1em;
  text-align: center;
  border-bottom: 1px solid ${defaultTheme.colors.fourth};
`;

const Item = styled.div`
  font-size: .9em;
  width: 100%;
  margin-bottom: 1em;
  border: 1px solid ${defaultTheme.colors.fourth};
  display: flex;
  align-items: center;
`;

const ImageContainer = styled.div`
  width: 3em;
  height: 3em;
  padding: .5em;
  margin-right: 1em;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid ${defaultTheme.colors.fourth};
`;

const InquiryTitle = styled.label`
  display: none;
`;

const TitleInput = styled.input`
  height: 2em;
  margin-bottom: 1em;
  padding-left: .5em;
  border: none;
  border-bottom: 1px solid ${defaultTheme.colors.fourth};
  color: ${defaultTheme.colors.fifth};
  :focus {
    outline: none;
  }
`;

const InquiryFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  border: 1px solid ${defaultTheme.colors.fourth};

  :focus {
    outline: 1px solid ${defaultTheme.colors.fifth};
  }
`;

const InquiryForm = styled.textarea`
  font-size: .9em;
  height: 21em;
  width: 100%;
  margin-bottom: 1em;
  padding: 1em;
  border: none;
  color: ${defaultTheme.colors.primaryText};
  resize: none;
  :focus {
    outline: none;
  }
`;

const ToggleSecretButton = styled.button`
  font-size: 1.5em;
  width: 15%;
  height: 1.5em;
  margin-right: .2em ;
  margin-bottom: .2em;
  border: none;
  display: flex;
  cursor: pointer;
  background: url(${(props) => (props.isPublic ? '/assets/images/public.png' : '/assets/images/secret.png')}) no-repeat 50% 50%;
`;

const Submit = styled.button`
  height: 3em;
  width: 100%;
  border: none;
  background-color: ${defaultTheme.colors.primary};
  color: white;
  cursor: pointer;
`;

const ErrorMessage = styled.strong`
  position: absolute;
  top: 84%;
  right: 59%;
  font-size: .7em;
  text-align: end;
  color: ${defaultTheme.colors.red};
`;

export default function WriteInquiryModal({ setModalOpen }) {
  const modalRef = useRef(null);

  const { product } = useProductStore();
  const createInquiryStore = useCreateInquiryStore();
  const getInquiryStore = useGetInquiryStore();

  const { inquiry } = createInquiryStore;

  const handler = ({ target }) => {
    if (modalRef.current && !modalRef.current.contains(target)) {
      setModalOpen(((previous) => !previous));
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handler);
    createInquiryStore.setProductId({ id: product.id });

    return () => {
      document.removeEventListener('mousedown', handler);
      createInquiryStore.clear();
    };
  }, []);

  const handleSubmitInquiry = async () => {
    if (!createInquiryStore.isInquiryComplete()) {
      return;
    }

    const id = await createInquiryStore.submitInquiry();

    if (id) {
      await getInquiryStore.fetchInquiries({ productId: product.id, pageNumber: 1 });
      setModalOpen(((previous) => !previous));
    }
  };

  return (
    <Container>
      <Wrapper ref={modalRef}>
        <Title
          htmlFor="content"
        >
          상품문의 작성
        </Title>
        <SubWrapper>
          <Item>
            <ImageContainer>
              <img
                src={`/assets/images/${product.image.thumbnailUrl}.png`}
                alt={product.name}
                height={40}
                width={40}
              />
            </ImageContainer>
            <span>{product.name}</span>
          </Item>
          <InquiryTitle htmlFor="title">
            제목
          </InquiryTitle>
          <TitleInput
            id="title"
            type="text"
            placeholder="제목"
            onChange={(e) => createInquiryStore.changeTitle(e.target.value)}
          />
          {createInquiryStore.hasErrors()
            ? (
              <ErrorMessage>
                {createInquiryStore.getError()}
              </ErrorMessage>
            )
            : null}
          <InquiryFormWrapper>
            <InquiryForm
              name="inquiry-content"
              id="content"
              placeholder="내용을 입력해주세요"
              cols="30"
              rows="10"
              onChange={(e) => createInquiryStore.changeContent(e.target.value)}
            />
            <ToggleSecretButton
              className="toggle-secret"
              isPublic={inquiry.type === 'PUBLIC'}
              type="button"
              onClick={() => createInquiryStore.toggleSecret()}
            />
          </InquiryFormWrapper>
        </SubWrapper>
        <Submit
          type="button"
          onClick={handleSubmitInquiry}
        >
          등록
        </Submit>
      </Wrapper>
    </Container>
  );
}
