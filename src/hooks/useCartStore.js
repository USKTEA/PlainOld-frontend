import useStore from './useStore';
import { cartStore } from '../stores/CartStore';

export default function useCartStore() {
  return useStore(cartStore);
}
