import { render, fireEvent } from "@testing-library/react-native";
import CustomSafeAreaScrollView from "../../../src/components/global/CustomSafeAreaViewScroll";
import { Text } from "react-native";

describe('CustomSafeAreaViewScroll', () => {
    it("should render children correctly", () => {
        const { getByText } = render(<CustomSafeAreaScrollView>
            <Text>Nikhil Is The Greatest Of ALl TIME</Text>
        </CustomSafeAreaScrollView>);
        expect(getByText("Nikhil Is The Greatest Of ALl TIME")).toBeTruthy();
    })
});