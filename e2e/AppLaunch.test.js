
describe('App Lanuch Testing', () => {
  beforeAll(async () => {
    await device.launchApp();
    // await device.launchApp();
  });

  it('should have logo on SplashScreen', async () => {
    await expect(element(by.id("logo-image"))).toBeVisible();
    await expect(element(by.id("loading-indicator"))).toBeVisible();
  });

  it('should go on OnBoardingScreen after a while', async () => {
    await waitFor(element(by.id("OnBoardingScreen"))).toBeVisible().withTimeout(5000);
    await expect(element(by.id("OnBoardingScreen"))).toBeVisible();
  });
});
