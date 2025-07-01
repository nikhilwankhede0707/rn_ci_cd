import { CommonActions, createNavigationContainerRef, StackActions } from "@react-navigation/native";
import { goBack, navigate, navigationRef, prepareNavigation, push, resetAndNavigate } from "../../src/utils/NavigationUtil";

jest.mock("@react-navigation/native", () => {
    const actualNavigation = jest.requireActual("@react-navigation/native");
    return {
        ...actualNavigation,
        createNavigationContainerRef: jest.fn(() => ({
            isReady: jest.fn().mockReturnValue(true),
            dispatch: jest.fn(),
        })),
        CommonActions: {
            goBack: jest.fn(),
            navigate: jest.fn(),
            reset: jest.fn(),
        },
        StackActions: {
            push: jest.fn()
        }
    };
})

describe('Navigation Functions Tests', () => {
    test("goBack navigation test", () => {
        goBack()
    });
    test("navigate navigation test", async () => {
        const routeName = "nikhil";
        const params = { "key": "value" };
        await navigate(routeName, params)
        expect(CommonActions.navigate).toHaveBeenCalledWith(routeName, params);
    });
    test("resetAndNavigate navigation test", async () => {
        const routeName = "nikhil";
        await resetAndNavigate(routeName);
        expect(CommonActions.reset).toHaveBeenCalledWith({
            index: 0,
            routes: [{ name: routeName }],
        })
    });
    test('push navigation test', async () => {
        const routeName = "nikhil";
        const params = { "key": "value" };
        await push(routeName, params);
        expect(StackActions.push).toHaveBeenCalledWith(routeName, params);
    })
    test('prepare navigation test', async () => {
        await prepareNavigation();
        expect(navigationRef.isReady).toHaveReturnedWith(true);
    })
})
