import useProductStore from '../hooks/useProductStore';
import numberFormat from '../utils/numberFormat';

export default function Products() {
  const productStore = useProductStore();

  const { products } = productStore;

  if (products.length === 0) {
    return <p>상품이 존재하지 않습니다</p>;
  }

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <a href={`/products/${product.id}`}>
            <img
              src={`/assets/images/${product.thumbnailUrl}.png`}
              alt={product.name}
              width={280}
              height={280}
            />
            <span>{product.name}</span>
            <span>{`${numberFormat(product.price)}원`}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
