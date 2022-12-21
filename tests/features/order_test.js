Feature('상품 구매');

Before(({ I }) => {
  I.clearDataBase();
  I.setUpMember();
});

Scenario('비회원이 상품을 구매하는 경우', ({ I }) => {
  I.setUpProduct({
    id: 1,
    name: 'T-shirt',
    price: 1_000,
    description: '멋진 티셔츠',
    detail: '좋은 상품',
    imageUrl: 1,
  });

  I.amOnPage('/');

  I.click('SHOP');

  I.click('T-shirt');

  I.see('로그인');
});

Scenario('회원이 상품을 구매하는 경우', ({ I }) => {
  I.setUpProduct({
    id: 1,
    name: 'T-shirt',
    price: 1_000,
    description: '멋진 티셔츠',
    detail: '좋은 상품',
    imageUrl: 1,
  });

  I.login('member1234@naver.com');

  I.amOnPage('/');

  I.click('SHOP');

  I.click('T-shirt');

  I.click('구매하기');

  I.see('결제하기');
});

Scenario('사용자가 로그인 하지 않은 채 구매하기 버튼을 눌렀다가 로그인하는 경우', ({ I }) => {
  I.setUpProduct({
    id: 1,
    name: 'T-shirt',
    price: 1_000,
    description: '멋진 티셔츠',
    detail: '좋은 상품',
    imageUrl: 1,
  });

  I.amOnPage('/');

  I.click('SHOP');

  I.click('T-shirt');

  I.click('구매하기');

  I.fillField('이메일', 'member1234@naver.com');
  I.fillField('비밀번호', 'Password1234!');

  I.click('로그인');

  I.see('결제하기');
});

Scenario('사용자가 옵션이 있는 상품을 구매하는 경우', ({ I }) => {
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

  I.amOnPage('/');

  I.click('SHOP');

  I.click('T-shirt');

  I.click('M');

  I.see('size: M');
});

Scenario('사용자가 각기 다른 옵션을 선택하는 경우', ({ I }) => {
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
  });

  I.amOnPage('/');

  I.click('SHOP');

  I.click('T-shirt');

  I.click('M');
  I.click('XL');

  I.see('size: M');
  I.see('size: XL');
});

Scenario('사용자가 선택한 옵션을 취소하는 경우', ({ I }) => {
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
  });

  I.amOnPage('/');

  I.click('SHOP');

  I.click('T-shirt');

  I.click('M');

  I.see('size: M');

  I.click('.cancel-sizeM');

  I.dontSee('size: M');
});

Scenario('사용자가 필수 옵션을 설정하지 않고 구매하기를 클릭하는 경우', ({ I }) => {
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
  });

  I.amOnPage('/');

  I.click('SHOP');

  I.click('T-shirt');

  I.click('구매하기');

  I.see('필수옵션이 모두 선택되어있지 않습니다');
});

Scenario('사용자가 같은 옵션을 또 설정하는 경우', ({ I }) => {
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
  });

  I.amOnPage('/');

  I.click('SHOP');

  I.click('T-shirt');

  I.click('M');

  I.see('size: M');

  I.click('M');

  I.dontSee('size: M');
});

Scenario('사용자가 주문 수량을 변경하는 경우', ({ I }) => {
  I.setUpProduct({
    id: 1,
    name: 'T-shirt',
    price: 1_000,
    description: '멋진 티셔츠',
    detail: '좋은 상품',
    imageUrl: 1,
  });

  I.amOnPage('/');

  I.click('SHOP');

  I.click('T-shirt');

  I.see('수량');

  I.see('1');
  I.see('1,000원');

  I.click('+');

  I.see('2');
  I.see('2,000원');
});

Scenario('회원이 주문 수량을 변경하는 경우 주문하는 경우', ({ I }) => {
  I.setUpProductWithShipping(
    {
      id: 1,
      name: 'T-shirt',
      price: 30_000,
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

  I.login('member1234@naver.com');

  I.amOnPage('/');

  I.click('SHOP');

  I.click('T-shirt');

  I.see('수량');

  I.see('1');
  I.see('30,000원');

  I.click('+');

  I.see('2');
  I.see('60,000원');

  I.click('구매하기');

  I.see('2개');
  I.see('배송비 무료');
  I.see('60,000원');
});

Scenario('회원이 상품 옵션을 설장하고 수량을 변경해서 주문하는 경우', ({ I }) => {
  I.setUpProductWithShipping(
    {
      id: 1,
      name: 'T-shirt',
      price: 30_000,
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

  I.setUpOption({
    id: 1,
    productId: 1,
    options: [
      { name: 'size', choices: ['M', 'L', 'XL'], require: true },
    ],
  });

  I.login('member1234@naver.com');

  I.amOnPage('/');

  I.click('SHOP');

  I.click('T-shirt');

  I.click('M');

  I.click('+');

  I.see('2');
  I.see('60,000원');
});

Scenario('주문 수량을 1이하로 변경을 시도하는 경우', ({ I }) => {
  I.setUpProductWithShipping(
    {
      id: 1,
      name: 'T-shirt',
      price: 30_000,
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

  I.amOnPage('/');

  I.click('SHOP');

  I.click('T-shirt');

  I.click('+');

  I.see('2');
  I.see('60,000원');

  I.click('-');

  I.see('1');
  I.see('30,000원');

  I.click('-');

  I.see('1');
  I.see('30,000원');
});

Scenario('비회원 주문으로 상품을 구매하는 경우', ({ I }) => {
  I.setUpProductWithShipping(
    {
      id: 1,
      name: 'T-shirt',
      price: 30_000,
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

  I.amOnPage('/');

  I.click('SHOP');

  I.click('T-shirt');

  I.click('구매하기');

  I.click('비회원 주문');

  I.see('주문자 정보');

  I.dontSee('수정');

  I.see('배송 정보');

  I.dontSee('변경');
});

Scenario('회원이 상품을 구매하는데 배송 정보가 없는 경우', ({ I }) => {
  I.setUpProductWithShipping(
    {
      id: 1,
      name: 'T-shirt',
      price: 30_000,
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

  I.login('member1234@naver.com');

  I.amOnPage('/');

  I.click('SHOP');

  I.click('T-shirt');

  I.click('구매하기');

  I.see('주문자 정보');
  I.see('김뚜루');
  I.see('010-1111-1111');
  I.see('member1234@naver.com');
  I.see('수정');

  I.see('배송 정보');
  I.dontSee('변경');
});

Scenario('회원이 상품을 구매하는데 배송 정보가 있을 경우', ({ I }) => {
  I.setUpProductWithShipping(
    {
      id: 1,
      name: 'T-shirt',
      price: 30_000,
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

  I.changeShippingInformation({
    memberId: 1,
    shippingInformation: {
      receiver: '김뚜루루',
      phoneNumber: '010-2222-2222',
      address: {
        zonecode: 11111,
        roadAddress: '서울시 성동구 상원12길 34',
        detailAddress: '6층 612호',
      },
    },
  });

  I.login('member1234@naver.com');

  I.amOnPage('/');

  I.click('SHOP');

  I.click('T-shirt');

  I.click('구매하기');

  I.see('배송 정보');
  I.see('김뚜루루');
  I.see('010-2222-2222');
  I.see('서울시 성동구 상원12길 34');
  I.see('6층 612호');
  I.see('(11111)');
});

Scenario('구매하는 상품의 종류가 1개인 경우', ({ I }) => {
  I.setUpProductWithShipping(
    {
      id: 1,
      name: 'T-shirt',
      price: 30_000,
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

  I.login('member1234@naver.com');

  I.amOnPage('/');

  I.click('SHOP');

  I.click('T-shirt');

  I.see('수량');
  I.click(1);

  I.click('구매하기');

  I.see('1개');
  I.see('30,000원');
  I.see('배송비 2,500원');
});

Scenario('구매하는 상품의 종류가 1개인 경우', ({ I }) => {
  I.setUpProductWithShipping(
    {
      id: 1,
      name: 'T-shirt',
      price: 30_000,
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

  I.setUpOption({
    id: 1,
    productId: 1,
    options: [
      { name: 'size', choices: ['M', 'L', 'XL'], require: true },
    ],
  });

  I.login('member1234@naver.com');

  I.amOnPage('/');

  I.click('SHOP');

  I.click('T-shirt');

  I.click('M');

  I.click('구매하기');

  I.see('size: M - 1개');
});

Scenario('구매하는 상품의 종류가 2개인 경우', ({ I }) => {
  I.setUpProductWithShipping(
    {
      id: 1,
      name: 'T-shirt',
      price: 30_000,
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

  I.setUpOption({
    id: 1,
    productId: 1,
    options: [
      { name: 'size', choices: ['M', 'L', 'XL'], require: true },
    ],
  });

  I.login('member1234@naver.com');

  I.amOnPage('/');

  I.click('SHOP');

  I.click('T-shirt');

  I.click('M');

  I.click('L');

  I.click('구매하기');

  I.see('size: M - 1개');
  I.see('size: L - 1개');
});

Scenario('구매하는 상품의 금액 총합이 무료배송 금액보다 높을 경우', ({ I }) => {
  I.setUpProductWithShipping(
    {
      id: 1,
      name: 'T-shirt',
      price: 30_000,
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

  I.setUpOption({
    id: 1,
    productId: 1,
    options: [
      { name: 'size', choices: ['M', 'L', 'XL'], require: true },
    ],
  });

  I.login('member1234@naver.com');

  I.amOnPage('/');

  I.click('SHOP');

  I.click('T-shirt');

  I.click('M');

  I.click('L');

  I.click('구매하기');

  I.see('size: M - 1개');
  I.see('size: L - 1개');

  I.see('60,000원');
  I.see('배송비 무료');
  I.see('60,000원');
});

Scenario('구매하는 상품의 금액 총합이 무료배송 금액보다 낮을 경우', ({ I }) => {
  I.setUpProductWithShipping(
    {
      id: 1,
      name: 'T-shirt',
      price: 20_000,
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

  I.setUpOption({
    id: 1,
    productId: 1,
    options: [
      { name: 'size', choices: ['M', 'L', 'XL'], require: true },
    ],
  });

  I.login('member1234@naver.com');

  I.amOnPage('/');

  I.click('SHOP');

  I.click('T-shirt');

  I.click('M');

  I.click('L');

  I.click('구매하기');

  I.see('size: M - 1개');
  I.see('size: L - 1개');

  I.see('40,000원');
  I.see('배송비 2,500원');
  I.see('42,500원');
});

Scenario('회원이 모든 정보를 입력하고 무통장 결제로 결제하기를 클릭한 경우', ({ I }) => {
  I.setUpProductWithShipping(
    {
      id: 1,
      name: 'T-shirt',
      price: 20_000,
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

  I.changeShippingInformation({
    memberId: 1,
    shippingInformation: {
      receiver: '김뚜루루',
      phoneNumber: '010-2222-2222',
      address: {
        zonecode: 11111,
        roadAddress: '서울시 성동구 상원12길 34',
        detailAddress: '6층 612호',
      },
    },
  });

  I.login('member1234@naver.com');

  I.amOnPage('/');

  I.click('SHOP');

  I.click('T-shirt');

  I.click('구매하기');

  I.click('무통장 입금');

  I.fillField('입금자명 (미입력시 주문자명)', '김뚜루');

  I.click('전체 동의');

  I.click('결제하기');

  I.see('주문완료');
  I.see('입금계좌 안내');
  I.see('주문번호');
});

Scenario('비회원이 모든 정보를 입력하고 무통장 결제로 결제하기를 클릭한 경우', ({ I }) => {
  I.setUpProductWithShipping(
    {
      id: 1,
      name: 'T-shirt',
      price: 20_000,
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

  I.amOnPage('/');

  I.click('SHOP');

  I.click('T-shirt');

  I.click('구매하기');

  I.click('비회원 주문');

  I.fillField('이름', '김뚜루');
  I.fillField('연락처', '010-1111-1111');
  I.fillField('이메일', 'visitor1234@naver.com');

  I.fillField('수령인', '김뚜루');
  I.fillField('연락처', '010-1111-1111');
  I.fillField('우편번호', '11111');
  I.fillField('주소', '서울시 성동구 상원12길 34');
  I.fillField('상세주소', '6층 612호');

  I.click('무통장 입금');

  I.fillField('입금자명 (미입력시 주문자명)', '김뚜루');

  I.click('전체 동의');

  I.click('결제하기');

  I.see('주문완료');
  I.see('입금계좌 안내');
  I.see('주문번호');
});

Scenario('회원이 주문자 정보를 변경하는 경우', ({ I }) => {
  I.setUpProductWithShipping(
    {
      id: 1,
      name: 'T-shirt',
      price: 20_000,
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

  I.login('member1234@naver.com');

  I.amOnPage('/');

  I.click('SHOP');

  I.click('T-shirt');

  I.click('구매하기');

  I.click('수정');

  I.fillField('이름', '');
  I.fillField('연락처', '');
  I.fillField('이메일', '');

  I.fillField('이름', '안김뚜루');
  I.fillField('연락처', '010-2222-2222');
  I.fillField('이메일', 'member1234@gmail.com');

  I.see('안김뚜루');
  I.see('010-2222-2222');
  I.see('member1234@gmail.com');
});

Scenario('회원이 배송정보를 변경하는 경우', ({ I }) => {
  I.setUpProductWithShipping(
    {
      id: 1,
      name: 'T-shirt',
      price: 20_000,
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

  I.changeShippingInformation({
    memberId: 1,
    shippingInformation: {
      receiver: '김뚜루루',
      phoneNumber: '010-2222-2222',
      address: {
        zonecode: 11111,
        roadAddress: '서울시 성동구 상원12길 34',
        detailAddress: '6층 612호',
      },
    },
  });

  I.login('member1234@naver.com');

  I.amOnPage('/');

  I.click('SHOP');

  I.click('T-shirt');

  I.click('구매하기');

  I.click('변경');

  I.click('신규입력');

  I.fillField('수령인', '안김뚜루');
  I.fillField('연락처', '010-1111-1111');
  I.fillField('우편번호', '11111');
  I.fillField('주소', '서울시 성동구 상원12길 34');
  I.fillField('상세주소', '6층 612호');

  I.click('무통장입금');

  I.click('전체 동의');

  I.click('결제하기');

  I.see('주문완료');
  I.dontSee('김뚜루루');
  I.see('안김뚜루');
});

Scenario('사용자가 주문자 정보에 이름을 입력하지 않고 결제하려는 경우', ({ I }) => {
  I.setUpProductWithShipping(
    {
      id: 1,
      name: 'T-shirt',
      price: 20_000,
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

  I.amOnPage('/');

  I.click('SHOP');

  I.click('T-shirt');

  I.click('구매하기');

  I.click('비회원 주문');

  I.fillField('이름', '');
  I.fillField('연락처', '010-2222-2222');
  I.fillField('이메일', 'member1234@gmail.com');

  I.fillField('수령인', '안김뚜루');
  I.fillField('연락처', '010-1111-1111');
  I.fillField('우편번호', '11111');
  I.fillField('주소', '서울시 성동구 상원12길 34');
  I.fillField('상세주소', '6층 612호');

  I.click('결제하기');

  I.see('주문자 이름을 입력해주세요');

  I.dontSee('주문완료');
});

Scenario('사용자가 주문자 정보에 연락처를 입력하지 않고 결제하려는 경우', ({ I }) => {
  I.setUpProductWithShipping(
    {
      id: 1,
      name: 'T-shirt',
      price: 20_000,
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

  I.amOnPage('/');

  I.click('SHOP');

  I.click('T-shirt');

  I.click('구매하기');

  I.click('비회원 주문');

  I.fillField('이름', '김뚜루');
  I.fillField('연락처', '');
  I.fillField('이메일', 'member1234@gmail.com');

  I.fillField('수령인', '안김뚜루');
  I.fillField('연락처', '010-1111-1111');
  I.fillField('우편번호', '11111');
  I.fillField('주소', '서울시 성동구 상원12길 34');
  I.fillField('상세주소', '6층 612호');

  I.click('결제하기');

  I.see('전화번호를 입력하세요');

  I.dontSee('주문완료');
});

Scenario('사용자가 주문자 정보에 이메일을 입력하지 않고 결제하려는 경우', ({ I }) => {
  I.setUpProductWithShipping(
    {
      id: 1,
      name: 'T-shirt',
      price: 20_000,
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

  I.amOnPage('/');

  I.click('SHOP');

  I.click('T-shirt');

  I.click('구매하기');

  I.click('비회원 주문');

  I.fillField('이름', '김뚜루');
  I.fillField('연락처', '010-2222-2222');
  I.fillField('이메일', '');

  I.fillField('수령인', '안김뚜루');
  I.fillField('연락처', '010-1111-1111');
  I.fillField('우편번호', '11111');
  I.fillField('주소', '서울시 성동구 상원12길 34');
  I.fillField('상세주소', '6층 612호');

  I.click('결제하기');

  I.see('이메일을 입력해주세요');

  I.dontSee('주문완료');
});

Scenario('사용자가 배송 정보에 수령인을 입력하지 않은 경우', ({ I }) => {
  I.setUpProductWithShipping(
    {
      id: 1,
      name: 'T-shirt',
      price: 20_000,
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

  I.amOnPage('/');

  I.click('SHOP');

  I.click('T-shirt');

  I.click('구매하기');

  I.click('비회원 주문');

  I.fillField('이름', '김뚜루');
  I.fillField('연락처', '010-2222-2222');
  I.fillField('이메일', 'member1234@naver.com');

  I.fillField('수령인', '');
  I.fillField('연락처', '010-1111-1111');
  I.fillField('우편번호', '11111');
  I.fillField('주소', '서울시 성동구 상원12길 34');
  I.fillField('상세주소', '6층 612호');

  I.click('결제하기');

  I.see('2글자 이상 입력해 주세요');

  I.dontSee('주문완료');
});

Scenario('사용자가 배송 정보에 연락처를 입력하지 않은 경우', ({ I }) => {
  I.setUpProductWithShipping(
    {
      id: 1,
      name: 'T-shirt',
      price: 20_000,
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

  I.amOnPage('/');

  I.click('SHOP');

  I.click('T-shirt');

  I.click('구매하기');

  I.click('비회원 주문');

  I.fillField('이름', '김뚜루');
  I.fillField('연락처', '010-2222-2222');
  I.fillField('이메일', 'member1234@naver.com');

  I.fillField('수령인', '김뚜루');
  I.fillField('연락처', '');
  I.fillField('우편번호', '11111');
  I.fillField('주소', '서울시 성동구 상원12길 34');
  I.fillField('상세주소', '6층 612호');

  I.click('결제하기');

  I.see('전화번호를 입력하세요');

  I.dontSee('주문완료');
});

Scenario('사용자가 배송 정보에 우편번호를 입력하지 않은 경우', ({ I }) => {
  I.setUpProductWithShipping(
    {
      id: 1,
      name: 'T-shirt',
      price: 20_000,
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

  I.amOnPage('/');

  I.click('SHOP');

  I.click('T-shirt');

  I.click('구매하기');

  I.click('비회원 주문');

  I.fillField('이름', '김뚜루');
  I.fillField('연락처', '010-2222-2222');
  I.fillField('이메일', 'member1234@naver.com');

  I.fillField('수령인', '김뚜루');
  I.fillField('연락처', '010-2222-2222');
  I.fillField('우편번호', '');
  I.fillField('주소', '서울시 성동구 상원12길 34');
  I.fillField('상세주소', '6층 612호');

  I.click('결제하기');

  I.see('주소를 정확하게 입력해주세요');

  I.dontSee('주문완료');
});

Scenario('사용자가 배송 정보에 주소를 입력하지 않은 경우', ({ I }) => {
  I.setUpProductWithShipping(
    {
      id: 1,
      name: 'T-shirt',
      price: 20_000,
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

  I.amOnPage('/');

  I.click('SHOP');

  I.click('T-shirt');

  I.click('구매하기');

  I.click('비회원 주문');

  I.fillField('이름', '김뚜루');
  I.fillField('연락처', '010-2222-2222');
  I.fillField('이메일', 'member1234@naver.com');

  I.fillField('수령인', '김뚜루');
  I.fillField('연락처', '010-2222-2222');
  I.fillField('우편번호', '11111');
  I.fillField('주소', '');
  I.fillField('상세주소', '6층 612호');

  I.click('결제하기');

  I.see('주소를 정확하게 입력해주세요');

  I.dontSee('주문완료');
});

Scenario('사용자가 배송 정보에 상세주소를 입력하지 않은 경우', ({ I }) => {
  I.setUpProductWithShipping(
    {
      id: 1,
      name: 'T-shirt',
      price: 20_000,
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

  I.amOnPage('/');

  I.click('SHOP');

  I.click('T-shirt');

  I.click('구매하기');

  I.click('비회원 주문');

  I.fillField('이름', '김뚜루');
  I.fillField('연락처', '010-2222-2222');
  I.fillField('이메일', 'member1234@naver.com');

  I.fillField('수령인', '김뚜루');
  I.fillField('연락처', '010-2222-2222');
  I.fillField('우편번호', '11111');
  I.fillField('주소', '서울시 성동구 상원12길 34');
  I.fillField('상세주소', '');

  I.click('결제하기');

  I.see('주소를 정확하게 입력해주세요');

  I.dontSee('주문완료');
});

Scenario('사용자가 개인정보 수집 및 이용에 동의하지 않고 결제하는 경우', ({ I }) => {
  I.setUpProductWithShipping(
    {
      id: 1,
      name: 'T-shirt',
      price: 20_000,
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

  I.amOnPage('/');

  I.click('SHOP');

  I.click('T-shirt');

  I.click('구매하기');

  I.click('비회원 주문');

  I.fillField('이름', '김뚜루');
  I.fillField('연락처', '010-2222-2222');
  I.fillField('이메일', 'member1234@naver.com');

  I.fillField('수령인', '김뚜루');
  I.fillField('연락처', '010-2222-2222');
  I.fillField('우편번호', '11111');
  I.fillField('주소', '서울시 성동구 상원12길 34');
  I.fillField('상세주소', '6층 612호');

  I.click('결제하기');

  I.see('개인정보 수집 및 이용에 동의하여 주시기 바랍니다');

  I.dontSee('주문완료');
});

Scenario('사용자가 구매조건 확인 및 결제진행에 동의하지 않고 결제하는 경우', ({ I }) => {
  I.setUpProductWithShipping(
    {
      id: 1,
      name: 'T-shirt',
      price: 20_000,
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

  I.amOnPage('/');

  I.click('SHOP');

  I.click('T-shirt');

  I.click('구매하기');

  I.click('비회원 주문');

  I.fillField('이름', '김뚜루');
  I.fillField('연락처', '010-2222-2222');
  I.fillField('이메일', 'member1234@naver.com');

  I.fillField('수령인', '김뚜루');
  I.fillField('연락처', '010-2222-2222');
  I.fillField('우편번호', '11111');
  I.fillField('주소', '서울시 성동구 상원12길 34');
  I.fillField('상세주소', '6층 612호');

  I.click('개인정보 수집 및 이용 동의 약관');

  I.click('결제하기');

  I.see('구매조건 확인 및 결제진행에 동의하여 주시기 바랍니다');

  I.dontSee('주문완료');
});
// 시나리오26 27 28 29 30 보충해야해
