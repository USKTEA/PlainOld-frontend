import styled from 'styled-components';

import { useState } from 'react';

import useGetAnswerStore from '../../hooks/useGetAnswerStore';
import useGetInquiryStore from '../../hooks/useGetInquiryStore';
import useUserStore from '../../hooks/useGetUserStore';

import defaultTheme from '../../styles/defaultTheme';

import InquiryModal from './InquiryModal';

const Head = styled.li`
  width: 100%;
  font-size: .8em;
  margin-top: 1.5em;
  padding-top: .7em;
  padding-bottom: .7em;
  display: flex;
  border-top: 1px solid ${defaultTheme.colors.fifth};
  border-bottom: 1px solid ${defaultTheme.colors.fourth};
  color: ${defaultTheme.colors.primaryText};
`;

const Status = styled.div`
  width: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.div`
  width: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Author = styled.div`
  width: 15%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Registered = styled.div`
  width: 15%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Inquiry = styled.li`
  width: 100%;
  height: 3em;
  font-size: .8em;
  padding-top: .7em;
  padding-bottom: .7em;
  display: flex;
  border-bottom: 1px solid ${defaultTheme.colors.fourth};
  color: ${defaultTheme.colors.primaryText};

  button {
    font-size: 1em;
    width: 60%;
    padding-top: .4em;
    border: none;
    text-align: start;
    background-color: white;
    cursor: pointer;
  }

  span {
    height: 2em;
    width: 10%;
    display: inline-block;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  span:nth-child(3) {
    width: 15%;
  }

  span:nth-child(4) {
    width: 15%;
  }
`;

const InquiryStatus = styled.span`
  color: ${(prop) => (prop.pending ? '#BCBBD1' : '#2E2C6F')};
`;

const OpenInquiryButton = styled.button`
  color: ${(prop) => (prop.inquiryType === 'PUBLIC' ? '#2E2C6F' : '#BCBBD1')};
`;

export default function Inquiries() {
  const [currentInquiry, setCurrentInquiry] = useState(null);

  const getInquiryStore = useGetInquiryStore();
  const getAnswerStore = useGetAnswerStore();
  const { username, role } = useUserStore();

  const { answers } = getAnswerStore;
  const { inquiries } = getInquiryStore;

  const handleOpenModal = (inquiry) => {
    if (inquiry.type === 'SECRET'
      && inquiry.querist.username !== username
      && role !== 'ADMIN') {
      return;
    }

    setCurrentInquiry(inquiry);
  };

  const countAnswer = (inquiryId) => (answers.get(inquiryId)
    ? answers.get(inquiryId).length
    : '');

  return (
    <>
      <ul>
        <Head>
          <Status>상태</Status>
          <Title>제목</Title>
          <Author>작성자</Author>
          <Registered>등록일</Registered>
        </Head>
        {inquiries.map((inquiry) => (
          <Inquiry key={inquiry.id}>
            <InquiryStatus
              pending={inquiry.status === 'PENDING'}
            >
              {inquiry.status === 'PENDING'
                ? '처리대기'
                : '답변완료'}
            </InquiryStatus>
            <OpenInquiryButton
              type="button"
              onClick={() => handleOpenModal(inquiry)}
              inquiryType={inquiry.type}
            >
              {inquiry.type === 'PUBLIC'
                ? `${`${inquiry.title} ${countAnswer(inquiry.id)}`}`
                : `${inquiry.title} ⨶`}
            </OpenInquiryButton>
            <span>
              {inquiry.querist.nickname}
            </span>
            <span>
              {inquiry.createdAt}
            </span>
          </Inquiry>
        ))}
      </ul>
      {currentInquiry && (
        <InquiryModal
          inquiry={currentInquiry}
          setInquiry={setCurrentInquiry}
        />
      )}
    </>
  );
}
