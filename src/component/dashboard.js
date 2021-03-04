import React from "react";
import {Link} from 'react-router-dom';
import Login from './login/login';
function Dashboard() {
    return (
        <>
            <h1>DashBoard visible to everyone</h1>
            <Link to="/create">
                <button className="btn btn-dark" style={{margin:10}}>Signup</button>
            </Link>
            <Link to="/home">
                <button className="btn btn-dark" style={{margin:10}}>home</button>
            </Link>
            {/* <Login/> */}
            <Link to="/login">
                <button className="btn btn-dark" style={{margin:10}}>home</button>
            </Link>
        </>
    )
}
export default Dashboard;