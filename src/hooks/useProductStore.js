import { productStore } from '../stores/ProductStore';
import useStore from './useStore';

export default function useCategoryStore() {
  return useStore(productStore);
}
