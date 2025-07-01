
describe('Login Process Testing', () => {
  beforeAll(async () => {
    await device.launchApp();
    await waitFor(element(by.id('OnBoardingScreen')))
      .toBeVisible()
      .withTimeout(5000);
    await element(by.text('Next')).tap();
    await element(by.text('Next')).tap();
    await element(by.text('Login')).tap();
    await element(by.id('emailInput')).typeText("transorm@yourself.com");
    await element(by.id('passwordInput')).typeText("iwill@0707");
    await device.pressBack();
  });
  it('should fill the credentials in the login screen and after clicking the login button it should navigate to the home screen',async()=>{
    await expect(element(by.id('Login'))).toBeVisible();
    await element(by.id('Login')).tap();
    await waitFor(element(by.text('Testing Complete')))
      .toBeVisible()
      .withTimeout(4000);
  })
});
