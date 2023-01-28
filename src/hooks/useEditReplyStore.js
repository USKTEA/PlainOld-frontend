import useStore from './useStore';
import { editReplyStore } from '../stores/EditReplyStore';

export default function useEditReplyStore() {
  return useStore(editReplyStore);
}
