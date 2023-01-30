import useStore from './useStore';
import { getInquiryStore } from '../stores/GetInquiryStore';

export default function useGetInquiryStore() {
  return useStore(getInquiryStore);
}
