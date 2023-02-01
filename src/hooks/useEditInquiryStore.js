import useStore from './useStore';
import { editInquiryStore } from '../stores/inquiry/EditInquiryStore';

export default function useEditInquiryStore() {
  return useStore(editInquiryStore);
}
