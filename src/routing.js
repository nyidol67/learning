import React, { useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './home/home';
import Header from './component/header';
import Create from './home/create';
import Edit from './home/edit';
import Login from './component/login/login';

function setToken(userToken){
    sessionStorage.setItem('token',JSON.stringify(userToken));
}
function getToken(){
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.token;
}
function Routing() {
    const token = getToken();
    if(!token){
        return(<Login setToken={setToken}/>)
    }
    return (
        <BrowserRouter>
            <>
                <Header />
                <Route exact path="/" component={Home}></Route>
                <Route exact path="/create" component={Create}></Route>
                <Route exact path="/:id/edit" component={Edit}></Route>
            </>
        </BrowserRouter>
    )
}
export default Routing;