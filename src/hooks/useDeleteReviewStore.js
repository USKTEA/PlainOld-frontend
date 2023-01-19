import useStore from './useStore';
import { deleteReviewStore } from '../stores/DeleteReviewStore';

export default function useDeleteReviewStore() {
  return useStore(deleteReviewStore);
}
