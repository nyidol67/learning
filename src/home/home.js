import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DisplayAllUser from '../component/displayAllUser';
import Pagination from './pagination';

const userUrl = 'http://localhost:8900/showUser';
const deleteUrl = 'http://localhost:8900/deleteUser';
const userAllUrl = 'http://localhost:8900/showUserAll';

function Home() {
    console.log("re-render");
    const [userData, setUserData] = useState(null);
    const [userDataFull, setUserDataFull] = useState(null);
    const [userPerPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    let currentUser;

    useEffect(()=>{
        axios.get(userAllUrl)
            .then((response) => {
                setUserDataFull(response.data)
            })
            console.log("inside use effect");
    },[]);

    function handleShow() {
        axios.get(userUrl, {
            headers: { "x-access-token": localStorage.getItem("token") }
        })
            .then((response) => {
                setUserData(response.data);
            });
    }
    // function handleShowAll() {
    //     axios.get(userAllUrl, {
    //         headers: { "x-access-token": localStorage.getItem("token") }
    //     })
    //         .then((response) => {
    //             setUserDataFull(response.data)
    //         })
    // }
    function handleDeleteClick(userId) {
        axios.delete(deleteUrl, { params: { _id: userId } })
            .then((response) => alert(response.data));
    }

    function handleLogout() {
        localStorage.removeItem('token');
    }
 
    let indexOfLastUser = userPerPage * currentPage;
    let indexOfFirstUser = indexOfLastUser - userPerPage;
    if(userDataFull){
        currentUser = userDataFull.slice(indexOfFirstUser,indexOfLastUser);
    }
    function paginate(pageNumber){
        setCurrentPage(pageNumber);
    }
    return (
        <>
            <br />
            <button style={{ margin: 20 }} onClick={handleShow} className="btn btn-dark" disabled={!(localStorage.getItem("token"))}>show current User table</button>
            {/* <button style={{ margin: 20 }} onClick={handleShowAll} className="btn btn-dark">show User table</button> */}
            <button className="btn btn-dark" onClick={handleLogout}>Logout</button>
            {userData && <DisplayAllUser user={userData} handleDeleteClick={handleDeleteClick} />}
            {userDataFull && currentUser && <DisplayAllUser user={currentUser} handleDeleteClick={handleDeleteClick} />}
            {currentUser && <Pagination userPerPage={userPerPage} totalUser={userDataFull.length} currentPage={currentPage} paginate={paginate}/>}
        </>
    )
}
export default Home;