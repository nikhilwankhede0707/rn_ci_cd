import { render, fireEvent } from "@testing-library/react-native";
import OnboardItem from "../../../src/components/global/OnboardItem";
import { Text } from "react-native";

describe('OnBoaedItem', () => {
    const mockOnPressFirst = jest.fn();
    const mockOnPressSecond = jest.fn();
    const mockTitle = "GOAT";
    const mockSubtitle = "goat";
    const mockButtonTitleFirst = "Nikhil";
    const mockButtonTitleSecond = "Wankhede";
    const mockImageSource = {
        uri: "https://goat.nikhil.com/G.png"
    };
    afterEach(() => { jest.clearAllMocks() });
    it("should display first button text", () => {
        const { getByText, getByTestId } = render(<OnboardItem
            buttonTitleFirst={mockButtonTitleFirst}
            imageSource={mockImageSource}
            subtitle={mockSubtitle}
            title={mockTitle}
            onPressFirst={mockOnPressFirst}
        />);
        expect(getByText(mockTitle)).toBeTruthy();
        expect(getByText(mockSubtitle)).toBeTruthy();
        expect(getByText(mockButtonTitleFirst)).toBeTruthy();
        expect(getByTestId("background-image")).toBeTruthy();
    })
    it("should display first button text", () => {
        const { getByText, getByTestId } = render(<OnboardItem
            buttonTitleFirst={mockButtonTitleFirst}
            imageSource={mockImageSource}
            subtitle={mockSubtitle}
            title={mockTitle}
            onPressFirst={mockOnPressFirst}
            buttonTitleSecond={mockButtonTitleSecond}
            onPressSecond={mockOnPressSecond}
        />);
        expect(getByText(mockTitle)).toBeTruthy();
        expect(getByText(mockSubtitle)).toBeTruthy();
        expect(getByText(mockButtonTitleFirst)).toBeTruthy();
        expect(getByText(mockButtonTitleSecond)).toBeTruthy();
        expect(getByTestId("background-image")).toBeTruthy();
    })
})