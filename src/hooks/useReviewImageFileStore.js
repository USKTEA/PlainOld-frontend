import useStore from './useStore';
import { reviewImageFileStore } from '../stores/file/ReviewImageFileStore';

export default function useReviewImageFileStore() {
  return useStore(reviewImageFileStore);
}
