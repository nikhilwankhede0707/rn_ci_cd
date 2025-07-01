// import {by} from 'detox'
describe('OnBoarding Testing', () => {
  beforeAll(async () => {
    await device.launchApp();
    await waitFor(element(by.id('OnBoardingScreen')))
      .toBeVisible()
      .withTimeout(5000);
  });

  it('should be present at first screen when it appears', async () => {
    await expect(
      element(by.text('Grab all events now only in your hands')),
    ).toBeVisible();
    await element(by.id('OnBoardingScreen')).takeScreenshot('obs1');
    await element(by.text('Next')).tap();
  });

  it('should go on next screen when tapped ', async () => {
    await expect(
      element(by.text('Easy payment & fast event ticket')),
    ).toBeVisible();
    await expect(element(by.id('OnBoardingScreen'))).toBeVisible();
    await element(by.id('OnBoardingScreen')).takeScreenshot('obs2');
    await element(by.text('Next')).tap();
  });

  it('should go to login screen when button is clicked', async () => {
    await expect(element(by.text('Login'))).toBeVisible();
    await expect(element(by.id('OnBoardingScreen'))).toBeVisible();
    await element(by.id('OnBoardingScreen')).takeScreenshot('obs2');
    await element(by.text('Login')).tap();
    await expect(element(by.id('LoginView'))).toBeVisible();
  });
});
