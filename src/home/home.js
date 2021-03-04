import React, { useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

import DisplayAllUser from '../component/displayAllUser';
import Login from '../component/login/login';

const userUrl = 'http://localhost:8900/showUser';
const deleteUrl = 'http://localhost:8900/deleteUser';
const userAllUrl = 'http://localhost:8900/showUserAll';

function Home() {
    const [userData, setUserData] = useState(null);
    const [userDataFull, setUserDataFull] = useState(null);
    function handleShow(){
        axios.get(userUrl,{
            headers:{"x-access-token":localStorage.getItem("token")}
        })
            .then((response) => {
                setUserData(response.data)
            })
    }

    function handleShowAll(){
        axios.get(userAllUrl,{
            headers:{"x-access-token":localStorage.getItem("token")}
        })
            .then((response) => {
                setUserDataFull(response.data)
            })
    }
    function handleDeleteClick(userId) {
        axios.delete(deleteUrl, { params: { _id: userId } })
            .then((response) => alert(response.data));
        handleShow();
    }
    function handleLogout(){
        localStorage.removeItem('token');
    }
    return (
        <>
        <br/>
            <button  style={{margin:20}} onClick={handleShow} className="btn btn-dark">show current User table</button>
            <button  style={{margin:20}} onClick={handleShowAll} className="btn btn-dark">show User table</button>
            <button className="btn btn-dark" onClick={handleLogout}>Logout</button>
            {userData && <DisplayAllUser user={userData} handleDeleteClick={handleDeleteClick} />}
            {userDataFull && <DisplayAllUser user={userDataFull} handleDeleteClick={handleDeleteClick} />}
        </>
    )
    }
    
export default Home;