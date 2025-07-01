import { loginUser, registerUser, selectUser, setUser } from "../../../src/redux/reducers/userSlice";
import { RootState, store } from "../../../src/redux/store";


jest.mock("redux-persist",()=>{
    const actualReduxPersist = jest.requireActual("redux-persist");
    return {
        ...actualReduxPersist,
        persistStore: jest.fn().mockReturnValue({}),
    }
})


describe("User Slice",()=>{
    test('initial state should be correct',()=>{
        const state = store.getState() as RootState;
        expect(selectUser(state)).toBe(null)
    })

    test('should handle set user',()=>{
        const user = {name:"Nikhil",email:"nikhilwankhede@gmail.com"};
        store.dispatch(setUser(user));
        const state = store.getState() as RootState;
        expect(selectUser(state)).toBe(user)
    })

    test('should handle login user',async()=>{
        const user = {email:"nikhilwankhede@gmail.com",password:"123456"};
        const action = await store.dispatch(loginUser(user));
        const state = store.getState() as RootState;
        expect(selectUser(state)).toEqual(user)
    })

    test('should not handle login user',async()=>{
        const user = {};
        const action = await store.dispatch(loginUser(user));
        const state = store.getState() as RootState;
        expect(action.type).toBe(loginUser.rejected.type)
        expect(selectUser(state)).toBeNull()
    })
})

describe('register user', () => {
    test('should handle register user',async()=>{
        const user = {email:"nikhilwankhede@gmail.com",name:"Nikhil"};
        const action = await store.dispatch(registerUser(user));
        const state = store.getState() as RootState;
        expect(action.payload).toBe(user);
        expect(selectUser(state)).toBe(user)
    })

    test('should not handle register user',async()=>{
        const user = {};
        const action = await store.dispatch(registerUser(user));
        const state = store.getState() as RootState;
        expect(action.type).toBe(registerUser.rejected.type)
        expect(selectUser(state)).toBeNull()
    })
})
