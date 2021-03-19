import { useContext, useEffect } from 'react';

import authContext from '../../context/auth/authContext';

const Bar = () => {
    const AuthContext = useContext(authContext);
    const { authenticatedUser, user, logOut } = AuthContext;

    useEffect(() => {
        authenticatedUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <header className='app-header'>
            <p className='nombre-usuario'>
                Hello <span>{user ? user.name : ''}</span>
            </p>
            <nav className='nav-principal'>
                <button
                    className='btn btn-blank cerrar-sesion'
                    onClick={() => logOut()}
                >
                    Log Out
                </button>
            </nav>
        </header>
    );
};
export default Bar;
