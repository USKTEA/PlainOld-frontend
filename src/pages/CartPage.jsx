import { useEffect } from 'react';
import { useLocalStorage } from 'usehooks-ts';

import useCartStore from '../hooks/useCartStore';

import Cart from '../components/cart/Cart';

export default function CartPage() {
  const [cartItems, setCartItems] = useLocalStorage('cartItems', '');
  const [accessToken] = useLocalStorage('accessToken', '');

  const cartStore = useCartStore();

  const loadFormServer = async () => {
    await cartStore.load();

    const { cart: { items } } = cartStore;

    setCartItems([...items.values()]);
  };

  useEffect(() => {
    if (accessToken) {
      loadFormServer();

      return;
    }

    if (cartItems) {
      cartStore.loadItems({ items: cartItems });
    }
  }, []);

  return (<Cart />);
}
