import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './login.css';

async function loginUser(credentials) {
    return fetch('http://localhost:8900/login', {
        method: 'POST',
        headers: {
            'Content-type': 'application.json'
        },
        body: JSON.stringify(credentials)
    }).then(data => data.json());
}
function Login({ setToken }) {
    const [userName, setUserName] = useState();
    const [password, setPassword] = useState();
    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
            userName,
            password
        });
        setToken(token);
    }
    return (
        <>
            <div className="login-wrapper">
                <h1>Please log in</h1>
                <form onSubmit={handleSubmit}>
                    <label>
                        <p>UserName</p>
                        <input type="text" onChange={e => setUserName(e.target.value)} />
                    </label>
                    <label>
                        <p>Password</p>
                        <input type="password" onChange={e => setPassword(e.target.value)} />
                    </label>
                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}
export default Login;