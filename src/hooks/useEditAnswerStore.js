import useStore from './useStore';
import { editAnswerStore } from '../stores/answer/EditAnswerStore';

export default function useEditAnswerStore() {
  return useStore(editAnswerStore);
}
