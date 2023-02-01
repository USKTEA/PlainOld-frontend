import useStore from './useStore';
import { cartStore } from '../stores/cart/CartStore';
import { serverCartStore } from '../stores/cart/ServerCartStore';

export default function useCartStore() {
  const accessToken = JSON.parse(localStorage.getItem('accessToken'));

  if (!accessToken) {
    return useStore(cartStore);
  }

  return useStore(serverCartStore);
}
