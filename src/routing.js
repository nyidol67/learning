import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './component/header';
import Create from './home/create';
import Edit from './home/edit';
import Dashboard from './component/dashboard'
import Login from './component/login';
import LoginDashboard from './component/loginDashboard';
import ChangePasswordForm from './home/changePasswordForm';

function Routing() {
    
    return (
        <BrowserRouter>
            <>
                <Header />
                <Switch>
                <Route exact path="/" component={LoginDashboard}></Route>
                <Route exact path="/dashboard" component={Dashboard}></Route>
                <Route exact path="/create" component={Create}></Route>
                <Route exact path="/changePassword" component={ChangePasswordForm}></Route>
                <Route exact path="/login" component={Login}></Route>
                <Route exact path="/:id/edit" component={Edit}></Route>
                </Switch>
            </>
        </BrowserRouter>
    )
}
export default Routing;