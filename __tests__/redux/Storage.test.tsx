import { MMKV } from "react-native-mmkv";
import reduxStorage from "../../src/redux/storage";

jest.mock("react-native-mmkv",()=>{
    const setMock = jest.fn();
    const getStringMock = jest.fn();
    const deleteMock = jest.fn();

    return {
        MMKV:jest.fn().mockImplementation(()=>({
            set:setMock,
            getString:getStringMock,
            delete:deleteMock
        })),
        setMock,
        getStringMock,
        deleteMock
    }
});


describe('Redux Storage Testing', () => {
    let setMock :jest.Mock;
    let getStringMock:jest.Mock;
    let deleteMock :jest.Mock;

    beforeEach(()=>{
        ({setMock,getStringMock,deleteMock} = require("react-native-mmkv"))
    })

    afterEach(()=>{
        jest.clearAllMocks();
    });

    test("Get Item",async()=>{
        const key = "nik";
        const value = "nik_value";
        getStringMock.mockReturnValue(value);
        const result = await reduxStorage.getItem(key);
        expect(result).toBe(value);
        expect(getStringMock).toHaveBeenCalledWith(key)
    })

    test("Set Item",async()=>{
        const key = "nik";
        const value = "nik";
        await reduxStorage.setItem(key,value);
        expect(setMock).toHaveBeenCalledWith(key,value);
    })

    test("Remove Item",async()=>{
        const key = "nik";
        await reduxStorage.removeItem(key);
        expect(deleteMock).toHaveBeenCalledWith(key);
    })
})
