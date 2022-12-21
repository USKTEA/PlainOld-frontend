import { Link } from 'react-router-dom';

export default function Category() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/products">All</Link>
        </li>
        <li>
          <Link to="/proudcts?category=T-shirt">T-shirt</Link>
        </li>
      </ul>
    </nav>
  );
}
