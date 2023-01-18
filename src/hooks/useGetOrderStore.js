import useStore from './useStore';
import { getOrderStore } from '../stores/GetOrderStore';

export default function useGetOrderStore() {
  return useStore(getOrderStore);
}
