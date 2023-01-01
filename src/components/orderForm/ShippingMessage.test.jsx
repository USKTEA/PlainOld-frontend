import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ShippingMessage from './ShippingMessage';

const context = describe;

const handleChangeMessage = jest.fn();

describe('ShippingMessage', () => {
  context('처음 렌더링 됐을 경우', () => {
    it('기본 값을 렌더링한다', () => {
      render((<ShippingMessage handleChange={handleChangeMessage} />));

      expect(screen.getByRole('option', { name: '배송메모를 선택해 주세요.' }).selected).toBe(true);
    });
  });

  context('Option을 선택했을 경우', () => {
    it('선택한 Option이 보이고 Option의 값을 콜백에 전달한다', async () => {
      render((<ShippingMessage handleChange={handleChangeMessage} />));

      const user = userEvent.setup();

      await user.selectOptions(screen.getByRole('combobox'), '배송 전에 미리 연락 바랍니다.');

      expect(screen.getByRole('option', { name: '배송 전에 미리 연락 바랍니다.' }).selected).toBe(true);
      expect(handleChangeMessage).toBeCalledWith('배송 전에 미리 연락 바랍니다.');
    });
  });
});
