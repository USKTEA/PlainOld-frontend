import useStore from './useStore';
import { oAuthStore } from '../stores/oAuth/OAuthStore';

export default function useOAuthStore() {
  return useStore(oAuthStore);
}
