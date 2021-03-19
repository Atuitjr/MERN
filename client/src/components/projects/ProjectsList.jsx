import { useEffect, useContext } from 'react';
import projectContext from '../../context/projects/projectContext';
import alertContext from '../../context/alerts/alertContext';

import Project from './project';

const ProjectsList = () => {
    const ProjectContext = useContext(projectContext);
    const { message, projects, obtainProjects } = ProjectContext;
    const AlertContext = useContext(alertContext);
    const { alert, showAlert } = AlertContext;

    useEffect(() => {
        if (message) showAlert(message.msg, message.category);

        obtainProjects();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [message]);

    if (projects.length === 0) return <p>Create some projects!</p>;

    return (
        <ul className='listado-proyectos'>
            {alert && (
                <div className={`alerta ${alert.category}`}>{alert.msg}</div>
            )}
            {projects.map((project) => (
                <Project key={project['_id']} project={project} />
            ))}
        </ul>
    );
};
export default ProjectsList;
