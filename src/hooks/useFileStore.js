import useStore from './useStore';
import { fileStore } from '../stores/file/FileStore';

export default function useFileStore() {
  return useStore(fileStore);
}
