import useStore from './useStore';
import { deleteLikeStore } from '../stores/like/DeleteLikeStore';

export default function useDeleteLikeStore() {
  return useStore(deleteLikeStore);
}
