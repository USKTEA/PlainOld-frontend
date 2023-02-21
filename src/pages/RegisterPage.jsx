import { useEffect } from 'react';

import useCreateUserStore from '../hooks/useCreateUserStore';

import RegisterForm from '../components/register/RegisterForm';

export default function RegisterPage() {
  const createUserStore = useCreateUserStore();

  useEffect(() => () => {
    createUserStore.clear();
  }, []);

  return (<RegisterForm />);
}
