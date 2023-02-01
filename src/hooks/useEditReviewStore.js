import { editReviewStore } from '../stores/review/EditReviewStore';
import useStore from './useStore';

export default function useEditReviewStore() {
  return useStore(editReviewStore);
}
