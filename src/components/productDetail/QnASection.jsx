import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';

import useGetInquiryStore from '../../hooks/useGetInquiryStore';

import defaultTheme from '../../styles/defaultTheme';
import EmptyInquiry from './EmptyInquiry';
import Inquiries from './Inquiries';
import InquiryPagination from './InquiryPagination';
import WriteInquiryModal from './WriteInquiryModal';

const Container = styled.div`
  margin-top: 5em;
  min-height: 30em;
`;

const Title = styled.h3`
  font-weight: 700;
  margin-bottom: 1em;
  color: ${defaultTheme.colors.primaryText};

  span {
    font-size: .9em;
    font-weight: 300;
  }
`;

const Message = styled.p`
  font-size: .8em;
  font-weight: 300;
  margin-bottom: .5em;
  color: ${defaultTheme.colors.primaryText};
`;

const ButtonWrapper = styled.div`
  display: flex;
  margin-bottom: 1em;

  button {
    font-size: .7em;
  }
`;

const ProductInquiryButton = styled.button`
  font-weight: 300;
  height: 3em;
  width: 6em;
  margin-right: .2em;
  padding: 1em;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${defaultTheme.colors.secondary};
  color: white;
  cursor: pointer;
`;

const PersonalInquiryButton = styled.button`
  font-weight: 300;
  height: 3em;
  width: 8em;
  padding: 1em;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${defaultTheme.colors.fourth};
  background-color: white;
  color: ${defaultTheme.colors.primaryText};
  cursor: pointer;
`;

export default function QnASection({ setRef }) {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [accessToken] = useLocalStorage('accessToken', '');

  const getInquiryStore = useGetInquiryStore();

  const { inquiries } = getInquiryStore;

  const handleOpenInquiryModal = () => {
    if (!accessToken) {
      navigate('/login');
    }

    setModalOpen((previous) => !previous);
  };

  return (
    <>
      <Container
        ref={(element) => { setRef(element)('QnA'); }}
      >
        <Title>
          Q&A
          <span>{` (${inquiries.length})`}</span>
        </Title>
        <Message>구매하시려는 상품에 대해 궁금한 점이 있으면 문의주세요.</Message>
        <ButtonWrapper>
          <ProductInquiryButton
            type="button"
            onClick={handleOpenInquiryModal}
          >
            상품문의
          </ProductInquiryButton>
          <PersonalInquiryButton
            type="button"
          >
            1:1 문의
          </PersonalInquiryButton>
        </ButtonWrapper>
        {inquiries.length
          ? (
            <>
              <Inquiries />
              <InquiryPagination />
            </>
          )
          : <EmptyInquiry />}
      </Container>
      {modalOpen && (
        <WriteInquiryModal
          setModalOpen={setModalOpen}
        />
      )}
    </>
  );
}
