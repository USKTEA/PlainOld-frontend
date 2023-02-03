import useStore from './useStore';
import { createAnswerStore } from '../stores/answer/CreateAnswerStore';

export default function useCreateAnswerStore() {
  return useStore(createAnswerStore);
}
