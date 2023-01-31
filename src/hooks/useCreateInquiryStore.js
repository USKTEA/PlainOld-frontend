import useStore from './useStore';
import { createInquiryStore } from '../stores/CreateInquiryStore';

export default function useCreateInquiryStore() {
  return useStore(createInquiryStore);
}
