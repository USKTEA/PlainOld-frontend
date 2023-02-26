import useStore from './useStore';
import { getLikeByUserStore } from '../stores/like/GetLikeByUserStore';

export default function useGetLikeByUserStore() {
  return useStore(getLikeByUserStore);
}
