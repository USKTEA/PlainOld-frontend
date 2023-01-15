import useStore from './useStore';
import { cartStore } from '../stores/CartStore';
import { serverCartStore } from '../stores/ServerCartStore';

export default function useCartStore() {
  const accessToken = JSON.parse(localStorage.getItem('accessToken'));

  if (!accessToken) {
    return useStore(cartStore);
  }

  return useStore(serverCartStore);
}
