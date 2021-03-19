import { useState, useContext, useEffect } from 'react';
import projectContext from '../../context/projects/projectContext';
import taskContext from '../../context/tasks/taskContext';

const TaskForm = () => {
    const [task, setTask] = useState({ name: '' });
    const ProjectContext = useContext(projectContext);
    const TaskContext = useContext(taskContext);

    const {
        addTask,
        taskError,
        setError,
        obtainTasks,
        selectedTask,
        updateTask,
        cleanTask,
    } = TaskContext;

    const { name } = task;

    useEffect(() => {
        if (selectedTask) {
            setTask(selectedTask);
        } else {
            setTask({ name: '' });
        }
    }, [selectedTask]);

    const { currentProject } = ProjectContext;
    if (!currentProject) return null;

    const changeHandler = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value });
    };

    const submitHandler = (e) => {
        e.preventDefault();

        if (name.trim() === '') {
            setError();
            return;
        }
        if (selectedTask) {
            updateTask(task);
            cleanTask();
        } else {
            task.project = currentProject._id;
            addTask(task);
        }
        obtainTasks(currentProject._id);
        setTask({ name: '' });
    };

    return (
        <div className='formulario'>
            <form onSubmit={submitHandler}>
                <div className='contenedor-input'>
                    <input
                        type='text'
                        name='name'
                        id='name'
                        className='input-text'
                        placeholder='Task name'
                        value={name}
                        onChange={changeHandler}
                    />
                </div>
                <div className='contenedor-input'>
                    <input
                        type='submit'
                        className='btn btn-primario btn-submit btn-block'
                        value={selectedTask ? 'Edit task name' : 'Create task'}
                    />
                </div>
            </form>
            {taskError && (
                <p className='mensaje error'>
                    The name of the task is required
                </p>
            )}
        </div>
    );
};
export default TaskForm;
