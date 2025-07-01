import {by} from 'detox'

describe('SignUp Process Testing', () => {
    beforeAll(async () => {
        await device.launchApp();
        await waitFor(element(by.id('OnBoardingScreen')))
            .toBeVisible()
            .withTimeout(5000);
        await element(by.text('Next')).tap();
        await element(by.text('Next')).tap();
        await element(by.text('Sign up')).tap();
        await element(by.id('firstName')).typeText('Nikhil');
        await element(by.id('lastName')).typeText('Wankhede');
        await element(by.id('email')).typeText('nikhil@wankhede.com');
        await element(by.id('password')).typeText('iamstillgreaterbutwithmorewisdomandhumbleness');
        // await device.pressBack();
    });
    it('should fill the credentials in the login screen and after clicking the login button it should navigate to the home screen', async () => {
        await expect(element(by.id('Register'))).toBeVisible();
        await element(by.id('Register')).tap();
        await element(by.id('Register')).tap();
        await waitFor(element(by.text('Testing Complete')))
            .toBeVisible()
            .withTimeout(4000);
    });
});