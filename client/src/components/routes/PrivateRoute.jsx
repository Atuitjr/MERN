import { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';

import authContext from '../../context/auth/authContext';

const PrivateRoute = ({ component: Component, ...props }) => {
    const AuthContext = useContext(authContext);
    const { authenticated, authenticatedUser, loading } = AuthContext;

    useEffect(() => {
        authenticatedUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Route
            {...props}
            render={(props) =>
                !authenticated && !loading ? (
                    <Redirect to='/' />
                ) : (
                    <Component {...props} />
                )
            }
        ></Route>
    );
};

export default PrivateRoute;
