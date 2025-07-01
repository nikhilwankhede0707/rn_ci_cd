import { render, fireEvent } from "@testing-library/react-native";
import OnboardItem from "../../../src/components/global/OnboardItem";
import { Text } from "react-native";
import CustomButton from "../../../src/components/ui/CustomButton";

describe('OnBoardItem', () => {
        const mockOnPressFirst = jest.fn();
        const mockTitle = "GOAT";
        afterEach(() => {jest.clearAllMocks()});
        it("should display button text", () => {
            const { getByText, getByTestId } = render(<CustomButton
                title={mockTitle}
                onPress={mockOnPressFirst}
            />);
            expect(getByText(mockTitle)).toBeTruthy();
        })
        it("should loader", () => {
            const { getByTestId } = render(<CustomButton
                loading={true}
                title={mockTitle}
                onPress={mockOnPressFirst}
            />);
            expect(getByTestId("activity-indicator")).toBeOnTheScreen();
        })
})