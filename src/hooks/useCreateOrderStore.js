import { createOrderStore } from '../stores/order/CreateOrderStore';
import useStore from './useStore';

export default function useCreateOrderStore() {
  return useStore(createOrderStore);
}
