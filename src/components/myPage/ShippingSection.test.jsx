import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import { editOrderStore } from '../../stores/order/EditOrderStore';
import ShippingSection from './ShippingSection';

const context = describe;

describe('ShippingSection', () => {
  beforeEach(() => {
    editOrderStore.clear();
  });

  context('주문상태가 입금대기 혹은 배송준비 중인 경우', () => {
    it('배송지 수정 버튼을 볼 수 있다', () => {
      const orderNumber = 'tjrxo1234-11111111';
      const shippingInformation = {
        receiver: {
          name: '김뚜루',
          phoneNumber: '010-1111-1111',
        },
        address: {
          zipCode: '111111',
          address1: '서울시 성동구 상원12길 34',
          address2: '에이원 지식산업센터',
        },
        message: '',
      };
      const orderStatus = '입금대기';

      render(<ShippingSection
        orderNumber={orderNumber}
        shippingInformation={shippingInformation}
        status={orderStatus}
      />);

      screen.getByText('배송지 정보');
      screen.getByText('수령인');
      screen.getByText('연락처');
      screen.getByText('배송지');
      screen.getByText('배송메모');

      screen.getByText('김뚜루');
      screen.getByText('010-1111-1111');
      screen.getByRole('button', { name: '수정' });
    });
  });

  context('주문상태가 입금대기 배송준비 중이 아닌 경우', () => {
    it('배송지 수정 버튼을 볼 수 없다', () => {
      const orderNumber = 'tjrxo1234-11111111';
      const shippingInformation = {
        receiver: {
          name: '김뚜루',
          phoneNumber: '010-1111-1111',
        },
        address: {
          zipCode: '111111',
          address1: '서울시 성동구 상원12길 34',
          address2: '에이원 지식산업센터',
        },
        message: '',
      };
      const orderStatus = '배송중';

      render(<ShippingSection
        orderNumber={orderNumber}
        shippingInformation={shippingInformation}
        status={orderStatus}
      />);

      expect(screen.queryByRole('button', { name: '수정' })).toBeFalsy();
    });
  });

  describe('배송지 수정', () => {
    context('수정 버튼을 클릭했을 경우', () => {
      it('배송지 수정 모달을 볼 수 있다', () => {
        const orderNumber = 'tjrxo1234-11111111';
        const shippingInformation = {
          receiver: {
            name: '김뚜루',
            phoneNumber: '010-1111-1111',
          },
          address: {
            zipCode: '111111',
            address1: '서울시 성동구 상원12길 34',
            address2: '에이원 지식산업센터',
          },
          message: '',
        };
        const orderStatus = '입금대기';

        render(<ShippingSection
          orderNumber={orderNumber}
          shippingInformation={shippingInformation}
          status={orderStatus}
        />);

        fireEvent.click(screen.getByRole('button', { name: '수정' }));

        screen.getByRole('heading', { name: '배송정보 수정' });
      });
    });

    context('취소 버튼을 클릭했을 경우', () => {
      it('배송지 수정 모달은 닫힌다', () => {
        const orderNumber = 'tjrxo1234-11111111';
        const shippingInformation = {
          receiver: {
            name: '김뚜루',
            phoneNumber: '010-1111-1111',
          },
          address: {
            zipCode: '111111',
            address1: '서울시 성동구 상원12길 34',
            address2: '에이원 지식산업센터',
          },
          message: '',
        };
        const orderStatus = '입금대기';

        render(<ShippingSection
          orderNumber={orderNumber}
          shippingInformation={shippingInformation}
          status={orderStatus}
        />);

        fireEvent.click(screen.getByRole('button', { name: '수정' }));

        screen.getByRole('heading', { name: '배송정보 수정' });

        fireEvent.click(screen.getByRole('button', { name: '취소' }));

        expect(screen.queryByRole('heading', { name: '배송정보 수정' })).toBeFalsy();
      });
    });

    context('저장 버튼을 클릭했을 경우', () => {
      context('주문 정보를 성공적으로 수정했을 경우', () => {
        it('배송지 수정 모달은 닫힌다', async () => {
          const orderNumber = 'tjrxo1234-11111111';
          const shippingInformation = {
            receiver: {
              name: '김뚜루',
              phoneNumber: '010-1111-1111',
            },
            address: {
              zipCode: '111111',
              address1: '서울시 성동구 상원12길 34',
              address2: '에이원 지식산업센터',
            },
            message: '',
          };
          const orderStatus = '입금대기';

          render(<ShippingSection
            orderNumber={orderNumber}
            shippingInformation={shippingInformation}
            status={orderStatus}
          />);

          fireEvent.click(screen.getByRole('button', { name: '수정' }));
          fireEvent.click(screen.getByRole('button', { name: '저장' }));

          await waitFor(() => {
            expect(screen.queryByRole('heading', { name: '배송정보 수정' })).toBeFalsy();
          });
        });
      });

      context('주문 정보가 성공적으로 수정되지 않았을 경우', () => {
        it('배송지 수정 모달은 닫히지 않는다', () => {
          const orderNumber = 'tjrxo1234-11111111';
          const shippingInformation = {
            receiver: {
              name: '김뚜루',
              phoneNumber: '010-1111-1111',
            },
            address: {
              zipCode: '111111',
              address1: '서울시 성동구 상원12길 34',
              address2: '에이원 지식산업센터',
            },
            message: '',
          };
          const orderStatus = '입금대기';

          render(<ShippingSection
            orderNumber={orderNumber}
            shippingInformation={shippingInformation}
            status={orderStatus}
          />);

          fireEvent.click(screen.getByRole('button', { name: '수정' }));

          fireEvent.change(screen.getByLabelText('수령인 이름'), {
            target: { value: '' },
          });

          fireEvent.click(screen.getByRole('button', { name: '저장' }));

          screen.getByRole('heading', { name: '배송정보 수정' });
        });
      });
    });
  });
});
