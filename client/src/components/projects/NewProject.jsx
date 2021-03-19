import { useState, useContext } from 'react';
import projectContext from '../../context/projects/projectContext';

const NewProject = () => {
    const [project, setProject] = useState({ name: '' });

    const ProjectContext = useContext(projectContext);
    const {
        projectForm,
        formError,
        showForm,
        addNewProject,
        showError,
    } = ProjectContext;

    const { name } = project;

    const changeHandler = (e) => {
        setProject({ ...project, [e.target.name]: e.target.value });
    };

    const submitHandler = (e) => {
        e.preventDefault();
        if (name.trim() === '') {
            showError();
            return;
        }
        addNewProject(project);
        setProject({ name: '' });
    };

    return (
        <>
            <button
                type='button'
                className='btn btn-primario btn-block'
                onClick={() => showForm()}
            >
                New Project
            </button>
            {projectForm && (
                <form
                    className='formulario-nuevo-proyecto'
                    onSubmit={submitHandler}
                >
                    <input
                        type='text'
                        name='name'
                        id='name'
                        className='input-text'
                        placeholder='Project name'
                        value={name}
                        onChange={changeHandler}
                    />
                    <input
                        type='submit'
                        className='btn btn-primario btn-block'
                        value='Create project'
                    />
                </form>
            )}
            {formError && (
                <p className='mensaje error'>
                    The name of the project is required
                </p>
            )}
        </>
    );
};

export default NewProject;
