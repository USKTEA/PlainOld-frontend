import useStore from './useStore';
import { createInquiryStore } from '../stores/inquiry/CreateInquiryStore';

export default function useCreateInquiryStore() {
  return useStore(createInquiryStore);
}
