import useStore from './useStore';

import { getReviewStore } from '../stores/review/GetReviewStore';

export default function useGetReviewStore() {
  return useStore(getReviewStore);
}
