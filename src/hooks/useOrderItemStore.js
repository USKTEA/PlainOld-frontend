import { orderItemStore } from '../stores/order/OrderItemStore';

import useStore from './useStore';

export default function useOrderItemStore() {
  return useStore(orderItemStore);
}
