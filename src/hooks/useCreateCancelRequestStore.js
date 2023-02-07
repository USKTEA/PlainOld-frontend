import useStore from './useStore';
import { createCancelRequestStore } from '../stores/cancelRequest/CreateCancelRequestStore';

export default function useCreateCancelRequestStore() {
  return useStore(createCancelRequestStore);
}
