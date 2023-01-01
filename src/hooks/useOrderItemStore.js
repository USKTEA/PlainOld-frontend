import { orderItemStore } from '../stores/OrderItemStore';

import useStore from './useStore';

export default function useOrderItemStore() {
  return useStore(orderItemStore);
}
