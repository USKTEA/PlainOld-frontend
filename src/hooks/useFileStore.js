import useStore from './useStore';
import { fileStore } from '../stores/FileStore';

export default function useFileStore() {
  return useStore(fileStore);
}
