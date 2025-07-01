import { by } from 'detox'

describe('Navigation Process Testing', () => {
    beforeAll(async () => {
        await device.launchApp();
        await waitFor(element(by.id('OnBoardingScreen')))
            .toBeVisible()
            .withTimeout(5000);
        await element(by.text('Next')).tap();
        await element(by.text('Next')).tap();
        await element(by.text('Login')).tap();
    });
    it('should navigate to login and go to signup comeback to login screeen', async () => {
        await element(by.text("Don't have an account? Sign Up")).tap();
        await expect(element(by.text('Already have an account? Login In'))).toBeVisible();
        await element(by.text('Already have an account? Login In')).tap();
        await expect(element(by.text("Don't have an account? Sign Up"))).toBeVisible();
    });
});