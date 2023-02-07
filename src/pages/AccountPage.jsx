import { useEffect } from 'react';

import { useLocalStorage } from 'usehooks-ts';
import useGetOrderStore from '../hooks/useGetOrderStore';

import MyPage from '../components/myPage/MyPage';

export default function AccountPage() {
  const [accessToken] = useLocalStorage('accessToken', '');
  const [currentOrder] = useLocalStorage('currentOrder', '');

  const getOrderStore = useGetOrderStore();

  const fetchUserOrders = async () => {
    await getOrderStore.fetchUserOrders();
  };

  const fetchOrder = async () => {
    await getOrderStore.fetchOrder({ orderNumber: currentOrder });
  };

  useEffect(() => {
    fetchUserOrders();

    if (currentOrder) {
      fetchOrder();
    }
  }, [accessToken]);

  return (
    <MyPage />
  );
}
