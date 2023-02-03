import styled from 'styled-components';
import useGetAnswerStore from '../../hooks/useGetAnswerStore';
import useGetInquiryStore from '../../hooks/useGetInquiryStore';

const Pagination = styled.div`
  margin-top: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    border: none;
    background-color: white;
    cursor: pointer;
  }
`;

export default function InquiryPagination() {
  const getInquiryStore = useGetInquiryStore();
  const getAnswerStore = useGetAnswerStore();

  const { inquiries, page } = getInquiryStore;

  const { productId } = inquiries[0];

  const handleFetchInquiries = async (number) => {
    await getInquiryStore.fetchInquiries({ productId, pageNumber: number });

    const inquiryIds = getInquiryStore.inquiries
      .reduce((acc, i) => [...acc, i.id], []);

    await getAnswerStore.fetchAnswers({ inquiryIds });
  };

  return (
    <Pagination>
      {Array.from({ length: page.total }, (_, index) => index + 1)
        .map((number) => (
          <li key={number}>
            <button
              className="page"
              type="button"
              onClick={() => handleFetchInquiries(number)}
            >
              {number}
            </button>
          </li>
        ))}
    </Pagination>
  );
}
