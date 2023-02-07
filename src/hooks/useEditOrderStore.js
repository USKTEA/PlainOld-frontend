import useStore from './useStore';
import { editOrderStore } from '../stores/order/EditOrderStore';

export default function useEditOrderStore() {
  return useStore(editOrderStore);
}
