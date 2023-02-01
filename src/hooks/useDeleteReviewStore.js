import useStore from './useStore';
import { deleteReviewStore } from '../stores/review/DeleteReviewStore';

export default function useDeleteReviewStore() {
  return useStore(deleteReviewStore);
}
