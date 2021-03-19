import { useContext } from 'react';
import projectContext from '../../context/projects/projectContext';
import taskContext from '../../context/tasks/taskContext';

import Task from './Task';

const TaskList = () => {
    const ProjectContext = useContext(projectContext);
    const { currentProject, deleteProject } = ProjectContext;
    const TaskContext = useContext(taskContext);
    const { projectTasks } = TaskContext;

    if (!currentProject) return <h2>Select a project</h2>;

    const { name, _id } = currentProject;

    return (
        <>
            <h2>Project {name}</h2>
            <ul className='listado-tareas'>
                {projectTasks.length === 0 ? (
                    <li className='tarea'>
                        <p>There are no tasks</p>
                    </li>
                ) : (
                    projectTasks.map((task) => (
                        <Task key={task._id} task={task} />
                    ))
                )}
            </ul>
            <button
                type='button'
                className='btn btn-eliminar'
                onClick={() => deleteProject(_id)}
            >
                Delete project &times;
            </button>
        </>
    );
};
export default TaskList;
