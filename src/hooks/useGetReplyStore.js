import useStore from './useStore';
import { getReplyStore } from '../stores/reply/GetReplyStore';

export default function useGetReplyStore() {
  return useStore(getReplyStore);
}
