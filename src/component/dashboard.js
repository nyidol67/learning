import React from "react";
import {Link} from 'react-router-dom';
import Home from "../home/home";
import Login from './login/login';
function Dashboard() {
    return (
        <>
            <h1>DashBoard visible to everyone</h1>
            <Link to="/create">
                <button className="btn btn-dark" style={{margin:10}}>Signup</button>
            </Link>
            <Home/>
            <Login/>
        </>
    )
}
export default Dashboard;