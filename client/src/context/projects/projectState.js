import { useReducer } from 'react';

import projectContext from './projectContext';
import projectReducer from './projectReducer';

import {
    PROJECT_FORM,
    OBTAIN_PROJECTS,
    ADD_PROJECT,
    VALIDATE_PROJECT_FORM,
    CURRENT_PROJECT,
    DELETE_PROJECT,
    PROJECT_ERROR,
} from '../../types/';

import axiosClient from '../../config/axios';

const ProjectState = (props) => {
    const initialState = {
        projects: [],
        projectForm: false,
        formError: false,
        currentProject: null,
        message: null,
    };

    const showForm = () => {
        dispatch({ type: PROJECT_FORM });
    };

    const obtainProjects = async () => {
        try {
            const result = await axiosClient.get('/api/projects');
            dispatch({ type: OBTAIN_PROJECTS, payload: result.data.projects });
        } catch (error) {
            const alert = {
                msg: 'there was an error',
                category: 'alerta-error',
            };
            dispatch({ type: PROJECT_ERROR, payload: alert });
        }
    };

    const addNewProject = async (project) => {
        try {
            const response = await axiosClient.post('/api/projects', project);
            dispatch({ type: ADD_PROJECT, payload: response.data });
        } catch (error) {
            const alert = {
                msg: 'there was an error',
                category: 'alerta-error',
            };
            dispatch({ type: PROJECT_ERROR, payload: alert });
        }
    };

    const showError = () => {
        dispatch({ type: VALIDATE_PROJECT_FORM });
    };

    const projectSelected = (projectId) => {
        dispatch({ type: CURRENT_PROJECT, payload: projectId });
    };

    const deleteProject = async (projectId) => {
        try {
            await axiosClient.delete(`/api/projects/${projectId}`);
            dispatch({ type: DELETE_PROJECT, payload: projectId });
        } catch (error) {
            const alert = {
                msg: 'there was an error',
                category: 'alerta-error',
            };
            dispatch({ type: PROJECT_ERROR, payload: alert });
        }
    };

    const [state, dispatch] = useReducer(projectReducer, initialState);

    return (
        <projectContext.Provider
            value={{
                projects: state.projects,
                projectForm: state.projectForm,
                formError: state.formError,
                currentProject: state.currentProject,
                message: state.message,
                showForm,
                obtainProjects,
                addNewProject,
                showError,
                projectSelected,
                deleteProject,
            }}
        >
            {props.children}
        </projectContext.Provider>
    );
};

export default ProjectState;
