import { useReducer } from 'react';
import authReducer from './authReducer';
import authContext from './authContext';

import axiosClient from '../../config/axios';
import tokenAuth from '../../config/authToken';

import {
    SIGN_IN_SUCCESS,
    SIGN_IN_ERROR,
    OBTAIN_USER,
    LOG_IN_SUCCESS,
    LOG_IN_ERROR,
    LOG_OUT,
} from '../../types/';

const AuthState = (props) => {
    const initialState = {
        token: localStorage.getItem('token'),
        authenticated: null,
        user: null,
        message: null,
        loading: true,
    };

    const [state, dispatch] = useReducer(authReducer, initialState);

    const signInUser = async (user) => {
        try {
            const response = await axiosClient.post('/api/users', user);
            dispatch({ type: SIGN_IN_SUCCESS, payload: response.data });
            authenticatedUser();
        } catch (error) {
            const alert = {
                msg: error.response.data.msg,
                category: 'alerta-error',
            };
            dispatch({ type: SIGN_IN_ERROR, payload: alert });
        }
    };

    //return the user data
    const authenticatedUser = async () => {
        const token = localStorage.getItem('token');

        tokenAuth(token);

        try {
            const response = await axiosClient.get('/api/auth');
            dispatch({ type: OBTAIN_USER, payload: response.data });
        } catch (error) {
            console.log(error);
            dispatch({ type: LOG_IN_ERROR });
        }
    };

    //log in
    const logInUser = async (data) => {
        try {
            const response = await axiosClient.post('/api/auth', data);
            dispatch({ type: LOG_IN_SUCCESS, payload: response.data });
            authenticatedUser();
        } catch (error) {
            const alert = {
                msg: error.response.data.msg,
                category: 'alerta-error',
            };
            dispatch({ type: LOG_IN_ERROR, payload: alert });
        }
    };

    //log out
    const logOut = () => {
        dispatch({ type: LOG_OUT });
    };

    return (
        <authContext.Provider
            value={{
                token: state.token,
                authenticated: state.authenticated,
                user: state.user,
                message: state.message,
                loading: state.loading,
                signInUser,
                logInUser,
                authenticatedUser,
                logOut,
            }}
        >
            {props.children}
        </authContext.Provider>
    );
};

export default AuthState;
