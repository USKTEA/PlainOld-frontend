Feature('상품 상세 화면');

Before(({ I }) => {
  I.clearDatabase();
});

Scenario('사용자가 상품 목록에서 옵션이 없는 상품을 클릭했을 경우', ({ I }) => {
  I.setUpProduct({
    id: 1,
    name: 'T-shirt',
    price: 1_000,
    description: '멋진 티셔츠',
    detail: '좋은 상품',
    imageUrl: 1,
  });

  I.amOnPage('/products');

  I.click('T-shirt');

  I.see('T-shirt');
  I.see('1,000원');
  I.see('멋진 티셔츠');
  I.see('배송 방법');
  I.see('배송비');
  I.see('수량');
  I.see('총 상품금액(1개)');
});

Scenario('사용자가 상품 목록에서 옵션이 있는 상품을 클릭했을 경우', ({ I }) => {
  I.setUpProduct({
    id: 1,
    name: 'T-shirt',
    price: 1_000,
    description: '멋진 티셔츠',
    detail: '좋은 상품',
    imageUrl: 1,
  });

  I.setUpOption({
    id: 1,
    productId: 1,
    options: [
      { name: 'size', choices: ['M', 'L', 'XL'], require: true },
    ],
    require: true,
  });

  I.amOnPage('/products');

  I.click('T-shirt');

  I.see('T-shirt');
  I.see('1,000원');
  I.see('size');
  I.see('M');
  I.see('L');
  I.see('XL');
});

Scenario('사용자가 배송 방법이 택배인 상품을 클릭했을 경우', ({ I }) => {
  I.setUpProductWithShippingMethod('택배');

  I.amOnPage('/products');

  I.click('T-shirt');

  I.see('배송방법');
  I.see('택배');
});

Scenario('사용자가 배송비가 2500원인 상품을 클릭했을 경우', ({ I }) => {
  I.setUpProductWithShippingPee(2_500);

  I.amOnPage('/products');

  I.click('T-shirt');

  I.see('배송비');
  I.see('2,500원');
});

Scenario(
  '사용자가 배송비가 있고 무료배송 금액보다 상품 금액이 크거나 같은 상품을 클릭했을 경우',
  ({ I }) => {
    I.setUpProductWithShipping(
      {
        id: 1,
        name: 'T-shirt',
        price: 1_000,
        description: '멋진 티셔츠',
        detail: '좋은 상품',
        imageUrl: 1,
        shipping: {
          method: '택배',
          shippingPee: 2_500,
          freeShippingAmount: 50_000,
        },
      },
    );

    I.amOnPage('/products');

    I.click('T-shirt');

    I.see('택배');
    I.see('무료');
    I.see('50,000원 이상 무료배송');
  },
);

Scenario(
  '사용자가 배송비가 있고 무료배송 금액보다 상품 금액이 작은 상품을 클릭했을 경우',
  ({ I }) => {
    I.setUpProductWithShipping(
      {
        id: 1,
        name: 'T-shirt',
        price: 1_000,
        description: '멋진 티셔츠',
        detail: '좋은 상품',
        imageUrl: 1,
        shipping: {
          method: '택배',
          shippingPee: 2_500,
          freeShippingAmount: 50_000,
        },
      },
    );

    I.amOnPage('/products');

    I.click('T-shirt');

    I.see('택배');
    I.see('2,500원');
    I.see('50,000원 이상 무료배송');
  },
);

Scenario('사용자가 상품 상세 정보를 확인하는 경우', ({ I }) => {
  I.setUpProduct({
    id: 1,
    name: 'T-shirt',
    price: 1_000,
    description: '멋진 티셔츠',
    detail: '좋은 상품',
    imageUrl: 1,
  });

  I.amOnPage('/products');

  I.click('T-shirt');
  I.click('상세정보');
  I.see('좋은 상품');
});

Scenario('사용자가 구매평을 확인하는 경우', ({ I }) => {
  I.setUpProduct({
    id: 1,
    name: 'T-shirt',
    price: 1_000,
    description: '멋진 티셔츠',
    detail: '좋은 상품',
    imageUrl: 1,
  });

  I.setUpReview({
    id: 1,
    productId: 1,
    reviewerId: 1,
    points: 5,
    content: '매우 좋아요',
  });

  I.amOnPage('/products');

  I.click('T-shirt');

  I.click('구매평(1)');

  I.see('김뚜루');
  I.see('매우 좋아요');
});

Scenario('사용자가 상품문의를 확인하는 경우', ({ I }) => {
  I.setUpProduct({
    id: 1,
    name: 'T-shirt',
    price: 1_000,
    description: '멋진 티셔츠',
    detail: '좋은 상품',
    imageUrl: 1,
  });

  I.setUpQna({
    id: 1,
    productId: 1,
    questionerId: 1,
    title: '이거 좋아요?',
    content: '얼마나 좋아요?',
    private: false,
  });

  I.amOnPage('/products');

  I.click('T-shirt');

  I.click('Q&A(1)');

  I.see('이거 좋아요?');
  I.see('김뚜루');
});

Scenario('사용자가 상품문의를 확인하는데 비밀글이 있을 경우', ({ I }) => {
  I.setUpProduct({
    id: 1,
    name: 'T-shirt',
    price: 1_000,
    description: '멋진 티셔츠',
    detail: '좋은 상품',
    imageUrl: 1,
  });

  I.setUpQna({
    id: 1,
    productId: 1,
    questionerId: 1,
    title: '이거 좋아요?',
    content: '얼마나 좋아요?',
    private: true,
  });

  I.amOnPage('/products');

  I.click('T-shirt');

  I.click('Q&A(1)');

  I.see('비밀글');
  I.see('김뚜루');
});
