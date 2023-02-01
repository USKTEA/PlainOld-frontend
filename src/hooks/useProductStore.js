import { productStore } from '../stores/product/ProductStore';
import useStore from './useStore';

export default function useProductStore() {
  return useStore(productStore);
}
