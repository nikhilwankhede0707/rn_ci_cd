import { fireEvent, render } from "@testing-library/react-native"
import CustomHeading from "../../../src/components/global/CustomHeading"
import { goBack } from "../../../src/utils/NavigationUtil"

jest.mock("../../../src/utils/NavigationUtil", () => ({
    goBack: jest.fn()
}))

describe("CUSTOM HEADING TEST", () => {
    it("Should Show Correct Text", () => {
        const title = "I AM TITLE"
        const { getByText } = render(<CustomHeading title={title} />)
        expect(getByText(title)).toBeTruthy();
    })
    it("Should call goBack when back button pressed", () => {
        const title = "I AM TITLE"
        const { getByTestId } = render(<CustomHeading title={title} />)
        const button = getByTestId("back-button")
        fireEvent.press(button);
        expect(goBack).toHaveBeenCalled()
    })

})