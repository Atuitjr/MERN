import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Login from './components/auth/Login';
import NewAccount from './components/auth/NewAccount';
import Projects from './components/projects/Projects';

import ProjectState from './context/projects/projectState';
import TaskState from './context/tasks/taskState';
import AlertState from './context/alerts/alertState';
import AuthState from './context/auth/authState';

import PrivateRoute from './components/routes/PrivateRoute';

import authToken from './config/authToken';

//is there a token
const token = localStorage.getItem('token');
authToken(token);

function App() {
    return (
        <ProjectState>
            <TaskState>
                <AlertState>
                    <AuthState>
                        <Router>
                            <Switch>
                                <Route exact path='/' component={Login}></Route>
                                <Route
                                    path='/new-account'
                                    component={NewAccount}
                                ></Route>
                                <PrivateRoute
                                    path='/projects'
                                    component={Projects}
                                ></PrivateRoute>
                            </Switch>
                        </Router>
                    </AuthState>
                </AlertState>
            </TaskState>
        </ProjectState>
    );
}

export default App;
