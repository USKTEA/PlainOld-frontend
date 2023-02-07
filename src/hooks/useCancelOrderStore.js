import useStore from './useStore';
import { cancelOrderStore } from '../stores/order/CancelOrderStore';

export default function useCancelOrderStore() {
  return useStore(cancelOrderStore);
}
