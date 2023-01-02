import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { productStore } from '../stores/ProductStore';

import ProductDetail from '../components/ProductDetail';
import Item from '../models/Item';
import { orderItemStore } from '../stores/OrderItemStore';

export default function ProductDetailPage() {
  const { id } = useParams();

  const fetchProduct = async () => {
    await productStore.fetchProduct({ id });

    const { product } = productStore;

    const {
      name, price, image, shipping,
    } = product;

    const item = new Item({
      id: orderItemStore.generateId(),
      productId: product.id,
      price,
      name,
      thumbnailUrl: image.thumbnailUrl,
      shippingFee: shipping.shippingFee,
      freeShippingAmount: shipping.freeShippingAmount,
    });

    orderItemStore.addOrderItem(item);
  };

  useEffect(() => {
    fetchProduct();

    return () => {
      productStore.clear();
      orderItemStore.reset();
    };
  }, []);

  return (<ProductDetail />);
}
