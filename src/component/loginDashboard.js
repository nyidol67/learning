import React from 'react';
import Login from './login';
import { Link } from 'react-router-dom';
import {addDays} from 'date-fns';

function LoginDashboard() {
   const date = new Date();
   const tommorow = addDays(date,1);
   console.log(tommorow);
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