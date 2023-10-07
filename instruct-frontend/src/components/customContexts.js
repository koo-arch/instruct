import { createContext, useState, useContext } from 'react';

const CustomContext = createContext();

export const useCustomContext = () => {
    return useContext(CustomContext);
}

export const ContextProvider = ({ children }) => {

    const barInitialState = {
        open: false,
        severity: "success",
        message: "成功しました。"
    }
    const [snackbarStatus, setSnackbarStatus] = useState(barInitialState);

    const [postFlag, setPostFlag] = useState(false);

    const [seatsNum, setSeatsNum] = useState(0);

    const value = {
        postFlag,
        setPostFlag,
        snackbarStatus,
        setSnackbarStatus,
        seatsNum,
        setSeatsNum,
    };
    return (
        <CustomContext.Provider value={value}>{children}</CustomContext.Provider>
    );
}