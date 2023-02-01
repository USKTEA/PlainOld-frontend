import useStore from './useStore';
import { createReviewStore } from '../stores/review/CreateReviewStore';

export default function useCreateReviewStore() {
  return useStore(createReviewStore);
}
