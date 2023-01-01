import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import useCreateOrderStore from '../hooks/useCreateOrderStore';

import OrderInformation from '../components/OrderInformation';

export default function OrderSuccessPage() {
  const navigate = useNavigate();

  const createOrderStore = useCreateOrderStore();

  const { result } = createOrderStore;

  useEffect(() => {
    if (result === null) {
      navigate('/error');
    }

    return () => createOrderStore.clear();
  }, []);

  return (<OrderInformation />);
}
