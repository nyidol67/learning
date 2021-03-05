import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './home/home';
import Header from './component/header';
import Create from './home/create';
import Edit from './home/edit';
import Dashboard from './component/dashboard'
import Login from './component/login/login';

function Routing() {
    
    return (
        
        <BrowserRouter>
            <>
                <Header />
                <Route exact path="/" component={Dashboard}></Route>
                {/* <Route exact path="/home" component={Home}></Route> */}
                <Route exact path="/create" component={Create}></Route>
                <Route exact path="/login" component={Login}></Route>
                <Route exact path="/:id/edit" component={Edit}></Route>
                
            </>
        </BrowserRouter>
    )
}
export default Routing;