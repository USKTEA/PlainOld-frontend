import GetCancelRequestStore from './GetCancelRequestStore';

const context = describe;

describe('GetCancelRequestStore', () => {
  let getCancelRequestStore;

  beforeEach(() => {
    getCancelRequestStore = new GetCancelRequestStore();
  });

  describe('FetchCancelRequest', () => {
    context('성공적으로 CancelRequest를 받아왔을 경우', () => {
      it('CancelRequest의 정보를 가지고 있는다', async () => {
        const orderNumber = 'tjrxo1234-11111111';

        let { cancelRequest } = getCancelRequestStore;

        expect(cancelRequest).toBeFalsy();

        await getCancelRequestStore.fetchCancelRequest({ orderNumber });

        cancelRequest = getCancelRequestStore.cancelRequest;

        expect(cancelRequest).toBeTruthy();
      });
    });

    context('CancelRequest를 받아오지 못했을 경우', () => {
      it('CancelRequest의 정보를 가지고 있지 않는다', async () => {
        const orderNumber = 'INVALID';

        let { cancelRequest } = getCancelRequestStore;

        expect(cancelRequest).toBeFalsy();

        await getCancelRequestStore.fetchCancelRequest({ orderNumber });

        cancelRequest = getCancelRequestStore.cancelRequest;

        expect(cancelRequest).toBeFalsy();
      });
    });
  });
});
