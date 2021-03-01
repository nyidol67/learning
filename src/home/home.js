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
        handleShow();
    }
    return (
        <>
       
        <br/>
            <button  style={{margin:20}} onClick={handleShow} className="btn btn-dark">show User table</button>
            <Link to="/create">
                <button className="btn btn-dark" style={{margin:20}}>Create user Data</button>
            </Link>
            {userData && <DisplayAllUser user={userData} handleDeleteClick={handleDeleteClick} />}
        </>
    )
}
export default Home;