import { render, fireEvent, screen } from "@testing-library/react-native";
import FooterTextTouchable from "../../../src/components/ui/FooterTextTouchable";

describe('Footer Text Tests', () => {
    const mockOnPress = jest.fn(() => console.log("I am pressed"));
    const mockText = "I Am TEXT";
    it("should be loaded on the screen", () => {
        const { getByText } = render(<FooterTextTouchable onPress={mockOnPress} text={mockText} />);
        expect(screen.getByTestId("footer-view")).toBeOnTheScreen();
        expect(getByText(mockText)).toBeTruthy();
    });

    it("should execute onPress function", () => {
        render(<FooterTextTouchable onPress={mockOnPress} text={mockText} />);
        const footer = screen.getByTestId("footer-button")
        fireEvent.press(footer);
        expect(mockOnPress).toHaveBeenCalled();
    })
    it("should have correct styling actually", () => {
        render(<FooterTextTouchable onPress={mockOnPress} text={mockText} style={{ width: "100%" }} />);
        const footerView = screen.getByTestId("footer-view")
        expect(footerView).toHaveStyle({
            width: "100%", 
            position: "relative",
            alignSelf: "center",
        });
    });
})