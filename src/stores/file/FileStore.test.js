import FileStore from './FileStore';

const context = describe;

describe('FileStore', () => {
  let fileStore;

  beforeEach(() => {
    fileStore = new FileStore();
  });

  describe('AddFile', () => {
    it('file을 추가한다', () => {
      const imageFile = new File(['image'], 'image.png', { type: 'image/png' });

      expect([...fileStore.file.keys()].length).toBe(0);

      fileStore.addFile(imageFile);

      expect([...fileStore.file.keys()].length).toBe(1);
    });
  });

  describe('DeleteFile', () => {
    it('file을 삭제한다', () => {
      const imageFile = new File(['image'], 'image.png', { type: 'image/png' });

      expect([...fileStore.file.keys()].length).toBe(0);

      fileStore.addFile(imageFile);

      expect([...fileStore.file.keys()].length).toBe(1);

      fileStore.deleteFile();

      expect([...fileStore.file.keys()].length).toBe(0);
    });
  });

  describe('HasFilesToUpload', () => {
    context('등록된 파일이 있을 경우', () => {
      it('true를 반환한다', () => {
        const imageFile = new File(['image'], 'image.png', { type: 'image/png' });

        fileStore.addFile(imageFile);

        expect([...fileStore.file.keys()].length).toBe(1);
        expect(fileStore.hasFilesToUpload()).toBeTruthy();
      });
    });

    context('등록된 파일이 없을 경우', () => {
      it('false를 반환한다', () => {
        expect([...fileStore.file.keys()].length).toBe(0);

        expect(fileStore.hasFilesToUpload()).toBeFalsy();
      });
    });
  });
});
