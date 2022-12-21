Feature('상품 목록 화면');

Before(({ I }) => {
  I.clearDatebase();
});

Scenario('판매 중인 상품이 없는 경우', ({ I }) => {
  I.amOnPage('/');

  I.click('SHOP');

  I.see('상품이 존재하지 않습니다');
});

Scenario('판매 중인 상품이 12개 미만인 경우', ({ I }) => {
  I.setUpProducts(1);

  I.amOnPage('/');

  I.click('SHOP');

  I.dontSee('상품이 존재하지 않습니다');

  I.see('T-shirt');
  I.see('9,000원');
  I.see('1', 'page-number');
});

Scenario('판매 중인 상품이 12개 이상인 경우', ({ I }) => {
  I.setUpProducts(13);

  I.amOnPage('/');

  I.click('SHOP');

  I.dontSee('상품이 존재하지 않습니다');

  I.see('1', 'page-number');
  I.see('2', 'page-number');
});

Scenario('판매 중인 상품을 카테고리로 필터링했을 경우', ({ I }) => {
  I.setUpProductWithCategory('T-shirts');

  I.amOnPage('/');

  I.click('SHOP');

  I.see('T-shirt');
  I.see('9,000원');

  I.click('Pants');
  I.see('상품이 존재하지 않습니다');

  I.click('T-shirts');

  I.see('T-shirt');
  I.see('9,000원');
});

Scenario('판매 중인 상품의 가격이 0원인 경우', ({ I }) => {
  I.setUpProduct({
    id: 1,
    name: 'T-shirt',
    price: 0,
    description: '멋진 티셔츠',
    detail: '좋은 상품',
    imageUrl: 1,
  });

  I.amOnPage('/');

  I.click('SHOP');

  I.see('무료');

  I.click('T-shirt');

  I.see('0원');
});
