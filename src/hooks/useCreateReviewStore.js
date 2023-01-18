import useStore from './useStore';
import { createReviewStore } from '../stores/CreateReviewStore';

export default function useCreateReviewStore() {
  return useStore(createReviewStore);
}
