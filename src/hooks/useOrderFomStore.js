import useStore from './useStore';
import { orderFormStore } from '../stores/OrderFormStore';

export default function useOrderFromStore() {
  return useStore(orderFormStore);
}
