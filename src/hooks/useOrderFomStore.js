import useStore from './useStore';
import { orderFormStore } from '../stores/order/OrderFormStore';

export default function useOrderFromStore() {
  return useStore(orderFormStore);
}
