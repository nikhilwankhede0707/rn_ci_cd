import { render } from "@testing-library/react-native"
import { screen } from "@testing-library/react-native"
import HomeScreen from "../../src/screens/HomeScreen"

describe('Home Screen', () => {
    it('should render correctly', () => {
        render(<HomeScreen />);
        expect(screen.getByText('Testing Complete')).toBeOnTheScreen();
    })
})
