import useStore from './useStore';
import { getReplyStore } from '../stores/GetReplyStore';

export default function useGetReplyStore() {
  return useStore(getReplyStore);
}
