import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { persistor, store } from '../../src/redux/store';
import { registerUser } from '../../src/redux/reducers/userSlice';
import RegisterScreen from '../../src/screens/RegisterScreen';
import { goBack, navigate } from '../../src/utils/NavigationUtil';


jest.mock('../../src/utils/NavigationUtil', () => ({
    navigate: jest.fn(),
    goBack:jest.fn(),
}));


jest.mock('redux-persist', () => ({
    persistStore: jest.fn().mockReturnValue({
        purge: jest.fn(),
    }),
    persistReducer: jest.requireActual('redux-persist').persistReducer,
}));

describe('Register Screen Test', () => {
    beforeEach(() => {
        persistor.purge();
        jest.clearAllMocks();
    });
    it('should render correctly', () => {
        const { getByPlaceholderText,getByTestId,getByText} = render(
            <Provider store={store}>
                <RegisterScreen />
            </Provider>
        );
        expect(getByPlaceholderText("First name")).toBeOnTheScreen();
        expect(getByPlaceholderText("Last name")).toBeOnTheScreen();
        expect(getByPlaceholderText("Email")).toBeOnTheScreen();
        expect(getByPlaceholderText("Password")).toBeOnTheScreen();
        expect(getByText("Already have an account? Login In")).toBeOnTheScreen();
        expect(getByTestId("Register")).toBeOnTheScreen();
        expect(getByTestId("back-button")).toBeOnTheScreen();
        expect(getByTestId("Sign Up")).toBeOnTheScreen();
    });
    it('should throw error when not entered any value and trying to signup',async()=>{
        const { getByPlaceholderText,getByTestId,getByText} = render(
            <Provider store={store}>
                <RegisterScreen />
            </Provider>
        );
        fireEvent(getByTestId("Register"),"press");
        await waitFor(()=>{
            expect(getByText('Please enter your first name')).toBeTruthy();
            expect(getByText('Please enter your email')).toBeTruthy();
            expect(getByText('Enter your last name')).toBeTruthy();
            expect(getByText('Please Enter your password')).toBeTruthy();
        })
    })

    it('should not validate invalid email',async()=>{
        const { getByPlaceholderText,getByTestId,getByText} = render(
            <Provider store={store}>
                <RegisterScreen />
            </Provider>
        );
        fireEvent(getByPlaceholderText("Email"),"changeText","nikh.com");
        fireEvent(getByTestId("Register"),"press");
        await waitFor(()=>{
            expect(getByText('Please enter a valid email')).toBeTruthy();
        })
    })

    it('should validate valid email',async()=>{
        const { getByPlaceholderText,getByTestId,getByText,queryByText} = render(
            <Provider store={store}>
                <RegisterScreen />
            </Provider>
        );
        fireEvent(getByPlaceholderText("Email"),"changeText","nikh@gmail.com");
        fireEvent(getByTestId("Register"),"press");
        await waitFor(()=>{
            expect(queryByText('Please enter a valid email')).toBeNull();
        });
    })

    it('should signup with valid email,password,last_name,first_name without any error',async()=>{
        const { getByPlaceholderText,getByTestId,getByText,queryByText} = render(
            <Provider store={store}>
                <RegisterScreen />
            </Provider>
        );
        const user = {
            name:"nikhil",
            last_name:"wankhede",
            email:"nikhil@gmail.com",
            password:"12345",
        };
        fireEvent(getByPlaceholderText("First name"),"changeText",user.name);
        fireEvent(getByPlaceholderText("Last name"),"changeText",user.last_name);
        fireEvent(getByPlaceholderText("Email"),"changeText",user.email)
        fireEvent(getByPlaceholderText("Password"),"changeText",user.password)
        fireEvent(getByTestId("Register"),"press");
        const action = await store.dispatch(registerUser(user));
        expect(action.type).toBe(registerUser.fulfilled.type);
    })

    it('should remove empty email error on focus',async()=>{
        const { getByPlaceholderText,getByTestId,getByText,queryByText} = render(
            <Provider store={store}>
                <RegisterScreen />
            </Provider>
        );
        const email = getByPlaceholderText('Email');
        fireEvent(email,"changeText","");
        fireEvent.press(getByTestId('Register'));
        await waitFor(() => {
            expect(getByText('Please enter your email')).toBeTruthy();
        })
        fireEvent(email,"focus");
        await waitFor(()=>{
            expect(queryByText('Please enter your email')).toBeNull();
        })
    })

    it('should remove invalid email error on focus',async()=>{
        const { getByPlaceholderText,getByTestId,getByText,queryByText} = render(
            <Provider store={store}>
                <RegisterScreen />
            </Provider>
        );
        const email = getByPlaceholderText('Email');
        fireEvent(email,"changeText","invalid.com");
        fireEvent.press(getByTestId('Register'));
        await waitFor(() => {
            expect(getByText('Please enter a valid email')).toBeTruthy();
        })
        fireEvent(email,"focus");
        await waitFor(()=>{
            expect(queryByText('Please enter a valid email')).toBeNull();
        })
    })

    it('should remove password error on focus',async()=>{
        const { getByPlaceholderText,getByTestId,getByText,queryByText} = render(
            <Provider store={store}>
                <RegisterScreen />
            </Provider>
        );
        const password = getByPlaceholderText('Password');
        fireEvent(password,"changeText","");
        fireEvent.press(getByTestId('Register'));
        await waitFor(() => {
            expect(getByText('Please Enter your password')).toBeTruthy();
        })
        fireEvent(password,"focus");
        await waitFor(()=>{
            expect(queryByText('Please Enter your password')).toBeNull();
        })
    })

    it('should remove last_name error on focus',async()=>{
        const { getByPlaceholderText,getByTestId,getByText,queryByText} = render(
            <Provider store={store}>
                <RegisterScreen />
            </Provider>
        );
        const last_name = getByPlaceholderText('Last name');
        fireEvent(last_name,"changeText","");
        fireEvent.press(getByTestId('Register'));
        await waitFor(() => {
            expect(getByText('Enter your last name')).toBeTruthy();
        })
        fireEvent(last_name,"focus");
        await waitFor(()=>{
            expect(queryByText('Enter your last name')).toBeNull();
        })
    })
    
    it('should remove first_name error on focus',async()=>{
        const { getByPlaceholderText,getByTestId,getByText,queryByText} = render(
            <Provider store={store}>
                <RegisterScreen />
            </Provider>
        );
        const first_name = getByPlaceholderText('First name');
        fireEvent(first_name,"changeText","");
        fireEvent.press(getByTestId('Register'));
        await waitFor(() => {
            expect(getByText('Please enter your first name')).toBeTruthy();
        })
        fireEvent(first_name,"focus");
        await waitFor(()=>{
            expect(queryByText('Please enter your first name')).toBeNull();
        })
    })

    it("should go to the login screen when link clicked",async()=>{
            const {getByText} = render(
                <Provider store={store}>
                    <RegisterScreen />
                </Provider>
            );
            const loginLink = getByText("Already have an account? Login In");
            fireEvent(loginLink,"click");
            await waitFor(()=>{
                expect(navigate).toHaveBeenCalledWith("LoginScreen");
            })
    })
    it('should display loading state correctly', () => {
        const { getByTestId, getByPlaceholderText } = render(
            <Provider store={store}>
                <RegisterScreen />
            </Provider>
        );
        
        const user = {
            name:"nikhil",
            last_name:"wankhede",
            email:"nikhil@gmail.com",
            password:"12345",
        };
        fireEvent(getByPlaceholderText("First name"),"changeText",user.name);
        fireEvent(getByPlaceholderText("Last name"),"changeText",user.last_name);
        fireEvent(getByPlaceholderText("Email"),"changeText",user.email)
        fireEvent(getByPlaceholderText("Password"),"changeText",user.password)
        fireEvent(getByTestId("Register"),"press");
        fireEvent.press(getByTestId('Register'));
    });
    it('should call goBack when button clicked ', () => {
        const { getByTestId, getByPlaceholderText } = render(
            <Provider store={store}>
                <RegisterScreen />
            </Provider>
        );
        fireEvent(getByTestId("back-button"),"press");
        expect(goBack).toHaveBeenCalled();
    });
    it('should handle input changes correctly', () => {
        const { getByPlaceholderText } = render(
            <Provider store={store}>
                <RegisterScreen />
            </Provider>
        );

        const emailInput = getByPlaceholderText('Email');
        const passwordInput = getByPlaceholderText('Password');
        const firstNameInput = getByPlaceholderText('First name');
        const lastNameInput = getByPlaceholderText('Last name');

        fireEvent.changeText(emailInput, 'test@example.com');
        fireEvent.changeText(passwordInput, 'password123');
        fireEvent.changeText(firstNameInput, 'Nikhil');
        fireEvent.changeText(lastNameInput, 'Wankhede');
        expect(emailInput.props.value).toBe('test@example.com');
        expect(passwordInput.props.value).toBe('password123');
        expect(firstNameInput.props.value).toBe('Nikhil');
        expect(lastNameInput.props.value).toBe('Wankhede');
    });
})