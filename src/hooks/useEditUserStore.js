import useStore from './useStore';
import { editUserStore } from '../stores/user/EditUserStore';

export default function useEditUserStore() {
  return useStore(editUserStore);
}
