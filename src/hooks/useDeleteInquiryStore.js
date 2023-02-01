import useStore from './useStore';
import { deleteInquiryStore } from '../stores/inquiry/DeleteInquiryStore';

export default function useDeleteInquiryStore() {
  return useStore(deleteInquiryStore);
}
