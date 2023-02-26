import useStore from './useStore';
import { countProductLikeStore } from '../stores/like/CountProductLikeStore';

export default function useCountProductLikeStore() {
  return useStore(countProductLikeStore);
}
