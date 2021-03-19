import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import alertContext from '../../context/alerts/alertContext';
import authContext from '../../context/auth/authContext';

const Login = ({ history }) => {
    const AlertContext = useContext(alertContext);
    const AuthContext = useContext(authContext);

    const { alert, showAlert } = AlertContext;
    const { message, authenticated, logInUser } = AuthContext;

    useEffect(() => {
        if (authenticated) history.push('/projects');
        if (message) showAlert(message.msg, message.category);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [message, authenticated, history]);

    const [user, setUser] = useState({ email: '', password: '' });

    const { email, password } = user;

    const onChangeHandler = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const submitHandler = (e) => {
        e.preventDefault();

        if (email.trim() === '' || password.trim() === '') {
            showAlert('All fields are required', 'alerta-error');
            return;
        }

        if (password.length < 6) {
            showAlert(
                'The password has to have less than 6 charachter',
                'alerta-error'
            );
            return;
        }

        logInUser(user);
    };

    return (
        <div className='form-usuario'>
            {alert && (
                <div className={`alerta ${alert.category}`}>{alert.msg}</div>
            )}
            <div className='contenedor-form sombra-dark'>
                <h1>Log In</h1>
                <form onSubmit={submitHandler}>
                    <div className='campo-form'>
                        <label htmlFor='email'>Email</label>
                        <input
                            type='email'
                            name='email'
                            id='email'
                            placeholder='Your mail'
                            value={email}
                            onChange={onChangeHandler}
                        />
                    </div>
                    <div className='campo-form'>
                        <label htmlFor='password'>Password</label>
                        <input
                            type='password'
                            name='password'
                            id='password'
                            placeholder='Your password'
                            value={password}
                            onChange={onChangeHandler}
                        />
                    </div>
                    <div className='campo-form'>
                        <input
                            type='submit'
                            className='btn btn-primario btn-block'
                            value='Log in'
                        />
                    </div>
                </form>
                <Link to={'/new-account'} className='enlace-cuenta'>
                    Sign In
                </Link>
            </div>
        </div>
    );
};

export default Login;
