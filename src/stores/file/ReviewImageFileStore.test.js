import ReviewImageFileStore from './ReviewImageFileStore';

const context = describe;

describe('ReviewImageFileStore', () => {
  let reviewImageFileStore;

  beforeEach(() => {
    reviewImageFileStore = new ReviewImageFileStore();
  });

  describe('upload', () => {
    context('파일 업로드를 성공했을 경우', () => {
      it('파일의 url을 받을 수 있다', async () => {
        const imageFile = new File(['image'], 'image.png', { type: 'image/png' });

        reviewImageFileStore.addFile(imageFile);

        await reviewImageFileStore.upload();

        const { url } = reviewImageFileStore;

        expect(url).toBeTruthy();
      });
    });

    context('파일 업로드를 실패했을 경우', () => {
      it('파일 url을 받을 수 없고 에러가 세팅된 것을 볼 수 있다', async () => {
        const imageFile = new File(['image'], 'shouldNotUploaded.mpeg', { type: 'audio/mpeg' });

        reviewImageFileStore.addFile(imageFile);

        await reviewImageFileStore.upload();

        const { url } = reviewImageFileStore;

        expect(url).toBeFalsy();
        expect(reviewImageFileStore.errors.upload).toBeTruthy();
      });
    });
  });
});
