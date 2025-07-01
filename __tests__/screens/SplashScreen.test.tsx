import { render, waitFor } from "@testing-library/react-native"
import { screen } from "@testing-library/react-native"
import SplashScreen from "../../src/screens/SplashScreen"
import { prepareNavigation, resetAndNavigate } from "../../src/utils/NavigationUtil"

jest.mock('../../src/utils/NavigationUtil', () => ({
    prepareNavigation: jest.fn(),
    resetAndNavigate: jest.fn(),
}));


describe('Splash Screen', () => {
    it('should render correctly', () => {
        render(<SplashScreen />);
        expect(screen.getByTestId('logo-image')).toBeOnTheScreen();
        expect(screen.getByTestId('loading-indicator')).toBeOnTheScreen();
    })
    it('should call the prepareNavigation function', () => {
        render(<SplashScreen />);
        expect(prepareNavigation).toHaveBeenCalled();
    })
    it('should call resetAndNavigate after 3 seconds of loading', async () => {
        render(<SplashScreen />);
        await waitFor(() => {
            expect(resetAndNavigate).toHaveBeenCalledWith('OnBoardingScreen');
        }, { timeout: 3500 })
    })
})