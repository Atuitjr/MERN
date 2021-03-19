/* eslint-disable import/no-anonymous-default-export */
import {
    SIGN_IN_SUCCESS,
    SIGN_IN_ERROR,
    OBTAIN_USER,
    LOG_IN_SUCCESS,
    LOG_IN_ERROR,
    LOG_OUT,
} from '../../types/';

export default (state, action) => {
    switch (action.type) {
        case LOG_IN_SUCCESS:
        case SIGN_IN_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                authenticated: true,
                message: null,
                loading: false,
            };
        case OBTAIN_USER:
            return {
                ...state,
                authenticated: true,
                user: action.payload.user,
                loading: false,
            };
        case LOG_OUT:
        case LOG_IN_ERROR:
        case SIGN_IN_ERROR:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                user: null,
                authenticated: null,
                message: action.payload,
                loading: false,
            };

        default:
            return state;
    }
};
