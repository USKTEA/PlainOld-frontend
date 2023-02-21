import useStore from './useStore';
import { createUserStore } from '../stores/user/CreateUserStore';

export default function useCreateUserStore() {
  return useStore(createUserStore);
}
