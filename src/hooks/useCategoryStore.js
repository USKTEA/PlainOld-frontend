import { categoryStore } from '../stores/category/CategoryStore';
import useStore from './useStore';

export default function useCategoryStore() {
  return useStore(categoryStore);
}
