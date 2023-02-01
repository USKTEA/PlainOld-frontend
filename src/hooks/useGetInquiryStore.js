import useStore from './useStore';
import { getInquiryStore } from '../stores/inquiry/GetInquiryStore';

export default function useGetInquiryStore() {
  return useStore(getInquiryStore);
}
