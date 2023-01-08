import { fireEvent, render, screen } from '@testing-library/react';

import Item from '../../models/Item';

import { cartStore } from '../../stores/CartStore';

import ChangeQuantityModal from './ChangeQuantityModal';

const setModalOpen = jest.fn();

const context = describe;

describe('ChangeQuantityModal', () => {
  const itemWithOption = new Item({
    id: 1,
    productId: 1,
    price: 10_000,
    name: 'T-Shirt',
    thumbnailUrl: '1',
    shippingFee: 2_500,
    freeShippingAmount: 50_000,
    option: {
      size: 'L',
      color: 'Black',
    },
  });

  const itemWithoutOption = new Item({
    id: 1,
    productId: 1,
    price: 10_000,
    name: 'T-Shirt',
    thumbnailUrl: '1',
    shippingFee: 2_500,
    freeShippingAmount: 50_000,
  });

  const renderChangeQuantityModal = () => {
    render((
      <ChangeQuantityModal
        setModalOpen={setModalOpen}
      />));
  };

  beforeEach(() => {
    cartStore.reset();
  });

  context('옵션이 없는 상품을 선택했을 경우', () => {
    it('현재 선택된 정보를 화면에 보여준다', () => {
      cartStore.addItem([itemWithoutOption]);
      cartStore.selectChangeQuantityItem({ name: 'T-Shirt' });

      renderChangeQuantityModal();

      screen.getByText('T-Shirt');
      screen.getByText('수량');
      expect(screen.getAllByText('10,000원').length).toBeTruthy();
    });
  });

  context('옵션이 있는 상품을 선택했을 경우', () => {
    it('현재 선택되어 있는 옵션을 정보를 볼 수 있다', () => {
      cartStore.addItem([itemWithOption]);
      cartStore.selectChangeQuantityItem({ name: 'T-Shirt' });

      renderChangeQuantityModal();

      screen.getByText('T-Shirt');
      screen.getByText('L / Black');
      screen.getAllByDisplayValue('1');
    });
  });

  describe('수량 변경', () => {
    context('선택한 상품의 수량을 증가시키는 경우', () => {
      it('상품 수량과 금액이 증가하는 것을 볼 수 있다', () => {
        cartStore.addItem([itemWithOption]);
        cartStore.selectChangeQuantityItem({ name: 'T-Shirt' });

        renderChangeQuantityModal();

        screen.getByDisplayValue('1');
        screen.getByText('총 수량 1개');
        expect(screen.getAllByText('10,000원').length).toBeTruthy();

        fireEvent.click(screen.getByRole('button', { name: '+' }));

        screen.getByDisplayValue('2');
        screen.getByText('총 수량 2개');
        expect(screen.getAllByText('20,000원').length).toBeTruthy();
      });
    });

    context('선택한 상품의 수량을 감소시키는 경우', () => {
      it('상품 수량과 금액이 증가하는 것을 볼 수 있다', () => {
        cartStore.addItem([itemWithOption, itemWithOption]);
        cartStore.selectChangeQuantityItem({ name: 'T-Shirt' });

        renderChangeQuantityModal();

        screen.getByDisplayValue('2');
        screen.getByText('총 수량 2개');
        expect(screen.getAllByText('20,000원').length).toBeTruthy();

        fireEvent.click(screen.getByRole('button', { name: '-' }));

        screen.getByDisplayValue('1');
        screen.getByText('총 수량 1개');
        expect(screen.getAllByText('10,000원').length).toBeTruthy();
      });
    });

    context('선택한 상품의 수량을 1개 미만으로 감소시키는 경우', () => {
      it('상품 수량은 1개 미만으로 감소되지 않는 것을 볼 수 있다', () => {
        cartStore.addItem([itemWithOption, itemWithOption]);
        cartStore.selectChangeQuantityItem({ name: 'T-Shirt' });

        renderChangeQuantityModal();

        screen.getByDisplayValue('2');
        screen.getByText('총 수량 2개');
        expect(screen.getAllByText('20,000원').length).toBeTruthy();

        fireEvent.click(screen.getByRole('button', { name: '-' }));

        screen.getByDisplayValue('1');
        screen.getByText('총 수량 1개');

        fireEvent.click(screen.getByRole('button', { name: '-' }));

        screen.getByDisplayValue('1');
        screen.getByText('총 수량 1개');
      });
    });

    context('수량을 직접 변경시키는 경우', () => {
      it('아이템의 수량이 입력된 숫자만큼 변경된 것을 볼 수 있다', () => {
        cartStore.addItem([itemWithOption]);
        cartStore.selectChangeQuantityItem({ name: 'T-Shirt' });

        renderChangeQuantityModal();

        screen.getByDisplayValue('1');
        expect(screen.getAllByText('10,000원').length).toBeTruthy();

        fireEvent.change(screen.getByLabelText('L / Black'), {
          target: {
            value: 10,
          },
        });

        screen.getByDisplayValue('10');
        expect(screen.getAllByText('100,000원').length).toBeTruthy();
      });
    });
  });

  describe('취소', () => {
    context('취소 버튼을 클릭했을 경우', () => {
      it('모달이 사라진 것을 볼 수 있다', () => {
        cartStore.addItem([itemWithOption, itemWithOption]);
        cartStore.selectChangeQuantityItem({ name: 'T-Shirt' });

        renderChangeQuantityModal();

        screen.getByRole('heading', { name: '수량 변경' });

        fireEvent.click(screen.getByRole('button', { name: '취소' }));

        expect(setModalOpen).toBeCalled();
      });
    });
  });

  describe('변경', () => {
    context('변경 버튼을 클릭했을 경우', () => {
      it('모달이 사라진 것을 볼 수 있다', () => {
        cartStore.addItem([itemWithOption, itemWithOption]);
        cartStore.selectChangeQuantityItem({ name: 'T-Shirt' });

        renderChangeQuantityModal();

        screen.getByRole('heading', { name: '수량 변경' });

        fireEvent.click(screen.getByRole('button', { name: '변경' }));

        expect(setModalOpen).toBeCalled();
      });
    });
  });
});
