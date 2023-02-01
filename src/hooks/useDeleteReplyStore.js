import useStore from './useStore';
import { deleteReplyStore } from '../stores/reply/DeleteReplyStore';

export default function useDeleteReplyStore() {
  return useStore(deleteReplyStore);
}
