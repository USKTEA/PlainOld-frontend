Feature('홈페이지');

Scenario('사용자는 메인화면에 접속했을 경우', ({ I }) => {
  I.amOnPage('/');

  I.see('Plain Old');
});

Scenario('사용자가 헤더의 ABOUT을 클릭하는 경우', ({ I }) => {
  I.amOnPage('/');

  I.click('ABOUT');

  I.waitInUrl('/brand');
});

Scenario('사용자가 SHOP NOW를 클릭하는 경우', ({ I }) => {
  I.amOnPage('/');

  I.click('SHOP NOW');

  I.waitInUrl('/products');
});
