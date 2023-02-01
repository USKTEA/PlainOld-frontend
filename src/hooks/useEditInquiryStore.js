import useStore from './useStore';
import { editInquiryStore } from '../stores/EditInquiryStore';

export default function useEditInquiryStore() {
  return useStore(editInquiryStore);
}
