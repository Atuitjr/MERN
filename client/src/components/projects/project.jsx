import { useContext } from 'react';
import projectContext from '../../context/projects/projectContext';
import taskContext from '../../context/tasks/taskContext';

const Project = ({ project }) => {
    const ProjectContext = useContext(projectContext);
    const TaskContext = useContext(taskContext);
    const { projectSelected } = ProjectContext;
    const { obtainTasks } = TaskContext;

    const { name, _id } = project;

    const selectProject = (projectId) => {
        projectSelected(projectId);
        obtainTasks(projectId);
    };

    return (
        <li>
            <button
                type='button'
                className='btn btn-blank'
                onClick={() => selectProject(_id)}
            >
                {name}
            </button>
        </li>
    );
};
export default Project;
