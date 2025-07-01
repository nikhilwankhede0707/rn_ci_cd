import { render, fireEvent, screen, act } from "@testing-library/react-native";
import Input from "../../../src/components/ui/Input";
import { Colors } from "../../../src/utils/Colors";

describe('Input Tests', () => {
    const mockOnChangeText = jest.fn(() => console.log("I am changed punch me i bleed"));
    const mockText = "I Am TEXT";
    const mockOnFocus = jest.fn(() => { });
    const mockOnBlur = jest.fn(() => { });
    const mockErrorText = "I am Error";
    it("should be disabled", () => {
        render(<Input
            value={mockText}
            onChangeText={mockOnChangeText}
            placeholder="I am placeholder"
            disabled={true}
        />);
        const inputEle = screen.getByTestId("animatedView");
        const textInput = screen.getByTestId("textInput");
        expect(textInput).toHaveProp("editable", false);
        expect(inputEle).toHaveStyle({
            pointerEvents: 'none',
        })
    });
    it("should not be disabled", () => {
        render(<Input
            value={mockText}
            onChangeText={mockOnChangeText}
            placeholder="I am placeholder"
        />);
        const inputEle = screen.getByTestId("animatedView");
        const textInput = screen.getByTestId("textInput");
        expect(textInput).toHaveProp("editable", true);
        expect(inputEle).toHaveStyle({
            pointerEvents: 'auto',
        })
    });
    it("should have error with correct text", () => {
        render(<Input
            value={mockText}
            onChangeText={mockOnChangeText}
            placeholder="I am placeholder"
            error={mockErrorText}
        />);
        const errorText = screen.getByTestId("errorText");
        expect(errorText).toHaveTextContent(mockErrorText);
    });
    it("should call onTextChange function", () => {
        render(<Input
            value={mockText}
            onChangeText={mockOnChangeText}
            placeholder="I am placeholder"
            error={mockErrorText}
        />);
        const inputText = screen.getByTestId("textInput");
        fireEvent.changeText(inputText, "New Text")
        expect(mockOnChangeText).toHaveBeenCalled();
    });

    it("should have called onFocus and onBlur Multiple times and should have correct styling as per condition", () => {
        render(<Input
            value={mockText}
            onChangeText={mockOnChangeText}
            placeholder="I am placeholder"
            onFocus={mockOnFocus}
            onBlur={mockOnBlur}
        />);
        const inputText = screen.getByTestId("textInput");
        fireEvent.changeText(inputText, "New Text")
        expect(mockOnChangeText).toHaveBeenCalled();
        act(()=>{
        fireEvent(inputText, 'focus');
        });
        expect(screen.getByTestId("inputContainer")).toHaveStyle({
            borderWidth: 2,
            borderColor: Colors.primary,
        });
        act(()=>{
            fireEvent(inputText, 'blur');
        })
        expect(screen.getByTestId("inputContainer")).toHaveStyle({
            borderWidth: 1,
            borderColor: Colors.disabled
        });
        act(()=>{
            fireEvent(inputText, 'focus');
            fireEvent(inputText, 'blur');
        })
        expect(mockOnFocus).toHaveBeenCalledTimes(2);
        expect(mockOnBlur).toHaveBeenCalledTimes(2);
    })

    it("should call default onFocus and onBlur ",()=>{
        render(<Input
            value={mockText}
            onChangeText={mockOnChangeText}
            placeholder="I am placeholder"
        />);
        const inputText = screen.getByTestId("textInput");
        act(()=>{
            fireEvent(inputText, 'focus');
            fireEvent(inputText, 'blur');
        })
    })
})