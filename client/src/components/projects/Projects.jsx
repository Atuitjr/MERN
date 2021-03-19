import { useContext, useEffect } from 'react';
import SideBar from '../layout/SideBar';
import Bar from '../layout/Bar';
import TaskForm from '../tasks/TaskForm';
import TaskList from '../tasks/TaskList';

import authContext from '../../context/auth/authContext';

const Projects = () => {
    const AuthContext = useContext(authContext);
    const { authenticatedUser } = AuthContext;

    useEffect(() => {
        authenticatedUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className='contenedor-app'>
            <SideBar></SideBar>
            <div className='seccion-principal'>
                <Bar />
                <main>
                    <TaskForm />
                    <div className='contenedor-tareas'>
                        <TaskList />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Projects;
