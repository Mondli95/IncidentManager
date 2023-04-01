import { createContext, useEffect, useReducer } from "react";
import Reducer from './Reducer';

const INITIAL_STATE = {
    userDetails: JSON.parse(localStorage.getItem('userDetails')) || null,
    isFetching: false,
    error: false
}

// console.log(INITIAL_STATE);

export const Context = createContext(INITIAL_STATE);

export const ContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

    useEffect(() => {
        localStorage.setItem("userDetails", JSON.stringify(state.userDetails));
    }, [state.userDetails]);

    return (
        <Context.Provider value={{
            userDetails: state.userDetails,
            isFetching: state.isFetching,
            error: state.error,
            dispatch
        }}>
            {children}
        </Context.Provider>
    )
}