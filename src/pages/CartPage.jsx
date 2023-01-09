import { useLocalStorage } from 'usehooks-ts';
import { useEffect } from 'react';

import useCartStore from '../hooks/useCartStore';
import Cart from '../components/cart/Cart';

export default function CartPage() {
  const [cartItems] = useLocalStorage('cartItems', '');
  const cartStore = useCartStore();

  useEffect(() => {
    if (cartItems) {
      cartStore.loadItems({ items: cartItems });
    }
  }, []);

  return (<Cart />);
}
