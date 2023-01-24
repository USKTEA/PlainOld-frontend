import useStore from './useStore';
import { reviewImageFileStore } from '../stores/ReviewImageFileStore';

export default function useReviewImageFileStore() {
  return useStore(reviewImageFileStore);
}
