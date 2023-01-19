import useStore from './useStore';

import { getReviewStore } from '../stores/GetReviewStore';

export default function useGetReviewStore() {
  return useStore(getReviewStore);
}
