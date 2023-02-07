import CreateCancelRequestStore from './CreateCancelRequestStore';

const context = describe;

describe('CreateCancelRequestStore', () => {
  let createCancelRequestStore;

  beforeEach(() => {
    createCancelRequestStore = new CreateCancelRequestStore();
  });

  describe('SetOrderNumber', () => {
    it('request에 orderNumber를 설정한다', () => {
      let { request } = createCancelRequestStore;

      expect(request.orderNumber).toBeFalsy();

      const orderNumber = 'tjrxo1234-11111111';

      createCancelRequestStore.setOrderNumber(orderNumber);

      request = createCancelRequestStore.request;

      expect(request).toBeTruthy();
    });
  });

  describe('ChangeContent', () => {
    it('request의 content를 변경한다', () => {
      let { request } = createCancelRequestStore;

      expect(request.content).toBeFalsy();

      const content = '이렇게 수정합니다';

      createCancelRequestStore.changeContent(content);

      request = createCancelRequestStore.request;

      expect(request.content).toBe(content);
    });
  });

  describe('Submit', () => {
    context('CancelRequest가 성공적으로 제출되었을 경우', () => {
      it('CancelRequest의 id를 반환받는다', async () => {
        const orderNumber = 'tjrxo1234-11111111';

        createCancelRequestStore.setOrderNumber(orderNumber);

        const id = await createCancelRequestStore.submit();

        expect(id).toBeTruthy();
      });
    });

    context('CancelRequest 제출이 실패했을 경우', () => {
      it('에러가 세팅된다', async () => {
        const orderNumber = 'INVALID';

        createCancelRequestStore.setOrderNumber(orderNumber);

        const id = await createCancelRequestStore.submit();

        expect(id).toBeFalsy();

        expect(createCancelRequestStore.errors.submit).toBeTruthy();
      });
    });
  });
});
