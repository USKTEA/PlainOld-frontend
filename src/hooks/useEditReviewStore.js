import { editReviewStore } from '../stores/EditReviewStore';
import useStore from './useStore';

export default function useEditReviewStore() {
  return useStore(editReviewStore);
}
