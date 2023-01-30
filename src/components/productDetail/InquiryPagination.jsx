import styled from 'styled-components';
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

  const { inquiries, page } = getInquiryStore;

  const { productId } = inquiries[0];

  return (
    <Pagination>
      {Array.from({ length: page.total }, (_, index) => index + 1)
        .map((number) => (
          <li key={number}>
            <button
              className="page"
              type="button"
              onClick={() => getInquiryStore.fetchInquiries({ productId, pageNumber: number })}
            >
              {number}
            </button>
          </li>
        ))}
    </Pagination>
  );
}
