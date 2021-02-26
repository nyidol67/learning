import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

import DisplayAllUser from '../component/displayAllUser';

const userUrl = 'http://localhost:8900/showUser';
const deleteUrl = 'http://localhost:8900/deleteUser';

function Home() {
    const [userData, setUserData] = useState(null);
    function handleShow(){
        axios.get(userUrl)
            .then((response) => {
                setUserData(response.data)
            })
    }
    function handleDeleteClick(userId) {
        axios.delete(deleteUrl, { params: { _id: userId } })
            .then((response) => alert(response.data));

        handleShowClick();
    }
    return (
        <>
       
        <br/>
            <button onClick={handleShow}>show User table</button>
            <Link to="/create">
                <button className="btn btn-dark" style={{margin:10}}>Create user Data</button>
            </Link>
            {userData && <DisplayAllUser user={userData} handleDeleteClick={handleDeleteClick} />}
        </>
    )
}
export default Home;