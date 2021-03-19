/* eslint-disable import/no-anonymous-default-export */
import {
    PROJECT_FORM,
    OBTAIN_PROJECTS,
    ADD_PROJECT,
    VALIDATE_PROJECT_FORM,
    CURRENT_PROJECT,
    DELETE_PROJECT,
    PROJECT_ERROR,
} from '../../types/';

export default (state, action) => {
    switch (action.type) {
        case PROJECT_FORM:
            return {
                ...state,
                projectForm: true,
            };
        case OBTAIN_PROJECTS:
            return {
                ...state,
                projects: action.payload,
            };
        case ADD_PROJECT:
            return {
                ...state,
                projects: [...state.projects, action.payload],
                currentProject: action.payload,
                projectForm: false,
                formError: false,
            };
        case VALIDATE_PROJECT_FORM:
            return { ...state, formError: true };
        case CURRENT_PROJECT:
            return {
                ...state,
                currentProject: state.projects.filter(
                    (project) => project['_id'] === action.payload
                )[0],
            };
        case DELETE_PROJECT:
            return {
                ...state,
                projects: state.projects.filter(
                    (project) => project._id !== action.payload
                ),
                currentProject: null,
            };
        case PROJECT_ERROR:
            return { ...state, message: action.payload };
        default:
            return state;
    }
};
