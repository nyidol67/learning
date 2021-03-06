import React from 'react';
import Login from './login';
import { Link } from 'react-router-dom';
function LoginDashboard() {
    return (
        <>
            <Link to="/create">
                <button className="btn btn-dark" style={{ margin: 10 }}>Signup</button>
            </Link>
            <Login />
        </>
    )
}
export default LoginDashboard;