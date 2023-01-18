import useStore from './useStore';

import { getReviewStore } from '../stores/GetReviewStore';

export default function useReviewStore() {
  return useStore(getReviewStore);
}
