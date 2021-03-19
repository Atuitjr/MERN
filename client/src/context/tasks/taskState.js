import { useReducer } from 'react';

import taskContext from './taskContext';
import taskReducer from './taskReducer';

import axiosClient from '../../config/axios';

import {
    PROJECT_TASKS,
    ADD_TASK,
    VALIDATE_TASK_FORM,
    DELETE_TASK,
    CURRENT_TASK,
    UPDATE_TASK,
    CLEAN_TASK,
} from '../../types';

const TaskState = (props) => {
    const initialState = {
        projectTasks: [],
        taskError: false,
        selectedTask: null,
    };

    const [state, dispatch] = useReducer(taskReducer, initialState);

    const obtainTasks = async (project) => {
        try {
            const response = await axiosClient.get('/api/tasks', {
                params: { project },
            });
            dispatch({ type: PROJECT_TASKS, payload: response.data.tasks });
        } catch (error) {}
    };

    const addTask = async (task) => {
        try {
            const response = await axiosClient.post('/api/tasks', task);
            dispatch({ type: ADD_TASK, payload: response.data });
        } catch (error) {}
    };

    const setError = () => {
        dispatch({ type: VALIDATE_TASK_FORM });
    };

    const deleteTask = async (taskId, project) => {
        try {
            await axiosClient.delete(`/api/tasks/${taskId}`, {
                params: { project },
            });
            dispatch({ type: DELETE_TASK, payload: taskId });
        } catch (error) {}
    };

    const saveActualTask = (task) => {
        dispatch({ type: CURRENT_TASK, payload: task });
    };

    const updateTask = async (task) => {
        try {
            const response = await axiosClient.put(
                `/api/tasks/${task._id}`,
                task
            );
            dispatch({ type: UPDATE_TASK, payload: response.data.task });
        } catch (error) {}
    };

    const cleanTask = () => {
        dispatch({ type: CLEAN_TASK });
    };
    return (
        <taskContext.Provider
            value={{
                projectTasks: state.projectTasks,
                taskError: state.taskError,
                selectedTask: state.selectedTask,
                obtainTasks,
                addTask,
                setError,
                deleteTask,
                saveActualTask,
                updateTask,
                cleanTask,
            }}
        >
            {props.children}
        </taskContext.Provider>
    );
};

export default TaskState;
