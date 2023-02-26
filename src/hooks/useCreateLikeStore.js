import useStore from './useStore';
import { createLikeStore } from '../stores/like/CreateLikeStore';

export default function useCreateLikeStore() {
  return useStore(createLikeStore);
}
