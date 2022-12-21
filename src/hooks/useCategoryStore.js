import { categoryStore } from '../stores/CategoryStore';
import useStore from './useStore';

export default function useCategoryStore() {
  return useStore(categoryStore);
}
