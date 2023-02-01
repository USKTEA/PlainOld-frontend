import useStore from './useStore';
import { editReplyStore } from '../stores/reply/EditReplyStore';

export default function useEditReplyStore() {
  return useStore(editReplyStore);
}
