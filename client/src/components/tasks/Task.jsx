import { useContext } from 'react';
import taskContext from '../../context/tasks/taskContext';

const Task = ({ task }) => {
    const { name, state, _id, project } = task;

    const TaskContext = useContext(taskContext);
    const { deleteTask, obtainTasks, updateTask, saveActualTask } = TaskContext;

    const deleteHandle = () => {
        deleteTask(_id, project);
        obtainTasks(project);
    };

    const taskStateHandle = (task) => {
        task.state = !task.state;
        updateTask(task);
    };

    const selectTask = (task) => {
        saveActualTask(task);
    };

    return (
        <li className='tarea sombra'>
            <p>{name}</p>
            <div className='estado'>
                {state ? (
                    <button
                        type='button'
                        className='completo'
                        onClick={() => taskStateHandle(task)}
                    >
                        Complete
                    </button>
                ) : (
                    <button
                        type='button'
                        className='incompleto'
                        onClick={() => taskStateHandle(task)}
                    >
                        Incomplete
                    </button>
                )}
            </div>
            <div className='acciones'>
                <button
                    type='button'
                    className='btn btn-primario'
                    onClick={() => selectTask(task)}
                >
                    Edit
                </button>
                <button
                    type='button'
                    className='btn btn-secundario'
                    onClick={() => deleteHandle()}
                >
                    Delete
                </button>
            </div>
        </li>
    );
};
export default Task;
