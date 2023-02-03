import useStore from './useStore';
import { deleteAnswerStore } from '../stores/answer/DeleteAnswerStore';

export default function useDeleteAnswerStore() {
  return useStore(deleteAnswerStore);
}
