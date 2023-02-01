import useStore from './useStore';
import { createReplyStore } from '../stores/reply/CreateReplyStore';

export default function useCreateReplyStore() {
  return useStore(createReplyStore);
}
