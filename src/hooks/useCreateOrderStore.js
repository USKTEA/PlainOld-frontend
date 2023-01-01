import { createOrderStore } from '../stores/CreateOrderStore';
import useStore from './useStore';

export default function useCreateOrderStore() {
  return useStore(createOrderStore);
}
