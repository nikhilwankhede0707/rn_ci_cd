import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { persistor, store } from '../../src/redux/store';
import LoginScreen from '../../src/screens/LoginScreen';
import { navigate } from '../../src/utils/NavigationUtil';
import { loginUser } from '../../src/redux/reducers/userSlice';
import { CakeIcon } from 'react-native-heroicons/solid';


jest.mock('../../src/utils/NavigationUtil', () => ({
    navigate: jest.fn(),
}));


jest.mock('redux-persist', () => ({
    persistStore: jest.fn().mockReturnValue({
        purge: jest.fn(),
    }),
    persistReducer: jest.requireActual('redux-persist').persistReducer,
}));

describe('Login Screen Test', () => {
    beforeEach(() => {
        persistor.purge();
        jest.clearAllMocks();
    });
    it('should render correctly', () => {
        const { getByPlaceholderText, getByText } = render(
            <Provider store={store}>
                <LoginScreen />
            </Provider>
        );
        expect(getByPlaceholderText('Email')).toBeTruthy();
        expect(getByPlaceholderText('Password')).toBeTruthy();
        expect(getByText("Don't have an account? Sign Up")).toBeTruthy();
    });
    it('should throw error when not entered any value and trying to login',async()=>{
        const { getByPlaceholderText, getByText ,getByTestId} = render(
            <Provider store={store}>
                <LoginScreen />
            </Provider>
        );
        const email = getByPlaceholderText('Email');
        const password = getByPlaceholderText('Password');
        const loginBtn = getByTestId("Login");
        fireEvent(email,"changeText","");
        fireEvent(password,"changeText","");
        fireEvent(loginBtn,"press");
        await waitFor(() => {
            expect(getByText('Please enter your email')).toBeTruthy();
            expect(getByText('Please Enter your password')).toBeTruthy();
        });
    })

    it('should validate email properly',async()=>{
        const { getByPlaceholderText, getByText ,getByTestId} = render(
            <Provider store={store}>
                <LoginScreen />
            </Provider>
        );
        const email = getByPlaceholderText('Email');
        const password = getByPlaceholderText('Password');
        const loginBtn = getByTestId("Login");
        fireEvent(email,"changeText","andogundu");
        fireEvent(password,"changeText","12345");
        fireEvent(loginBtn,"press");
        await waitFor(() => {
            expect(getByText('Please enter a valid email')).toBeTruthy();
        });
    })

    it('should pass valid email and password without any error',async()=>{
        const { getByPlaceholderText, getByText ,getByTestId , queryByText} = render(
            <Provider store={store}>
                <LoginScreen />
            </Provider>
        );
        const user = {email:"andogundu@gmail.com",password:"12345"};
        const email = getByPlaceholderText('Email');
        const password = getByPlaceholderText('Password');
        const loginBtn = getByTestId("Login");
        fireEvent(email,"changeText",user.email);
        fireEvent(password,"changeText",user.password);
        fireEvent(loginBtn,"press");
        await waitFor(() => {
            expect(queryByText('Please enter your email')).toBeNull();
            expect(queryByText('Please enter a valid email')).toBeNull();
            expect(queryByText('Please Enter your password')).toBeNull();
        });
        const action = await store.dispatch(loginUser(user));
        expect(action.type).toBe(loginUser.fulfilled.type);
    })

    it('should remove empty email error on focus',async()=>{
        const { getByPlaceholderText,queryByText,getByText,getByTestId} = render(
            <Provider store={store}>
                <LoginScreen />
            </Provider>
        );
        const email = getByPlaceholderText('Email');
        fireEvent(email,"changeText","");
        fireEvent.press(getByTestId('Login'));
        await waitFor(() => {
            expect(getByText('Please enter your email')).toBeTruthy();
        })
        fireEvent(email,"focus");
        await waitFor(()=>{
            expect(queryByText('Please enter your email')).toBeNull();
        })
    })


    it('should remove invalid email error on focus',async()=>{
        const { getByPlaceholderText,queryByText,getByText,getByTestId} = render(
            <Provider store={store}>
                <LoginScreen />
            </Provider>
        );
        const email = getByPlaceholderText('Email');
        fireEvent(email,"changeText","anyThing.com");
        fireEvent.press(getByTestId('Login'));
        await waitFor(() => {
            expect(getByText('Please enter a valid email')).toBeTruthy();
        })
        fireEvent(email,"focus");
        await waitFor(()=>{
            expect(queryByText('Please enter a valid email')).toBeNull();
        })
    })

    it('should remove password error on focus',async()=>{
        const {getByPlaceholderText,queryByText,getByText,getByTestId} = render(
            <Provider store={store}>
                <LoginScreen />
            </Provider>
        );
        const password = getByPlaceholderText('Password');
        fireEvent(password,"changeText","");
        fireEvent.press(getByTestId('Login'));
        await waitFor(() => {
            expect(getByText('Please Enter your password')).toBeTruthy();
        })
        fireEvent(password,"focus");
        await waitFor(()=>{
            expect(queryByText('Please Enter your password')).toBeNull();
        })
    })
    it("should go to the signup screen when link clicked",async()=>{
            const {getByText} = render(
                <Provider store={store}>
                    <LoginScreen />
                </Provider>
            );
            const signUpLink = getByText("Don't have an account? Sign Up");
            fireEvent(signUpLink,"click");
            await waitFor(()=>{
                expect(navigate).toHaveBeenCalledWith("RegisterScreen");
            })
    })
    it('should display loading state correctly', () => {
        const { getByTestId, getByPlaceholderText } = render(
            <Provider store={store}>
                <LoginScreen />
            </Provider>
        );
        fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
        fireEvent.changeText(getByPlaceholderText('Password'), 'password123');
        fireEvent.press(getByTestId('Login'));
    });
});