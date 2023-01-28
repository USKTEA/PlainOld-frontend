import useStore from './useStore';
import { deleteReplyStore } from '../stores/DeleteReplyStore';

export default function useDeleteReplyStore() {
  return useStore(deleteReplyStore);
}
