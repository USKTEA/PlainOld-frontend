import useStore from './useStore';
import { getAnswerStore } from '../stores/answer/GetAnswerStore';

export default function useGetAnswerStore() {
  return useStore(getAnswerStore);
}
