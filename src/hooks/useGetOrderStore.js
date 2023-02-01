import useStore from './useStore';
import { getOrderStore } from '../stores/order/GetOrderStore';

export default function useGetOrderStore() {
  return useStore(getOrderStore);
}
