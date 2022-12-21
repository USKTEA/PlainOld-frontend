import { Link } from 'react-router-dom';

export default function AccountPage() {
  return (
    <>
      <nav>
        <Link to="/orders">주문 조회</Link>
      </nav>
      <p>누적 구매금액: 900,000원</p>
    </>
  );
}
