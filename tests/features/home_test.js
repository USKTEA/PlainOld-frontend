Feature('home');

Scenario('test something', ({ I }) => {
  I.amOnPage('/');

  I.see('Hello, world!');
});
