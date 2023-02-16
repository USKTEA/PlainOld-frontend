import useStore from './useStore';
import { getUserStore } from '../stores/user/GetUserStore';

export default function useGetUserStore() {
  return useStore(getUserStore);
}
