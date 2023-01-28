import useStore from './useStore';
import { createReplyStore } from '../stores/CreateReplyStore';

export default function useCreateReplyStore() {
  return useStore(createReplyStore);
}
