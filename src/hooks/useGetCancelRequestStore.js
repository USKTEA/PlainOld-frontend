import useStore from './useStore';
import { getCancelRequestStore } from '../stores/cancelRequest/GetCancelRequestStore';

export default function useGetCancelRequestStore() {
  return useStore(getCancelRequestStore);
}
