import { useEffect } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { useNavigate } from 'react-router-dom';

import useOrderFromStore from '../hooks/useOrderFomStore';
import useOrderItemStore from '../hooks/useOrderItemStore';

import OrderForm from '../components/orderForm/OrderForm';

export default function OrderPage() {
  const navigate = useNavigate();
  const [accessToken] = useLocalStorage('accessToken', '');
  const [orderItems] = useLocalStorage('orderItems', '');

  const orderItemStore = useOrderItemStore();
  const orderFormStore = useOrderFromStore();

  useEffect(() => {
    if (orderItems) {
      orderItemStore.loadItems(orderItems);
    }

    return () => {
      orderItemStore.reset();
      orderFormStore.reset();
    };
  }, []);

  useEffect(() => {
    if (!accessToken) {
      navigate('/login');
    }
  }, []);

  return (<OrderForm />);
}
