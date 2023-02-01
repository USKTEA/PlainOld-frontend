import useStore from './useStore';
import { userStore } from '../stores/user/UserStore';

export default function useUserStore() {
  return useStore(userStore);
}
