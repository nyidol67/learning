import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DisplayAllUser from '../component/displayAllUser';
import Pagination from './pagination';
import { useHistory } from 'react-router-dom';
import DisplayModal from './displayModal';
import {Link } from 'react-router-dom';

const userUrl = 'http://localhost:8900/showUser';
const deleteUrl = 'http://localhost:8900/deleteUser';
const userAllUrl = 'http://localhost:8900/showUserAll';


function Home() {
    const History = useHistory();
    const [userData, setUserData] = useState(null);
    const [userDataFull, setUserDataFull] = useState(null);
    const [userPerPage,setUserPerPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    let currentUser;
    const [isOpen, setIsOpen] = useState(false);// for modal
   
    useEffect(() => {
        axios.get(userAllUrl)
            .then((response) => {
                setUserDataFull(response.data)
            })
        console.log("inside use effect");
    }, []);

    function handleShow() {
        axios.get(userUrl, {
            headers: { "x-access-token": localStorage.getItem("token") }
        })
            .then((response) => {
                setUserData(response.data);
            });
        setIsOpen(true);
    }
    
    function handleDeleteClick(userId) {
        axios.delete(deleteUrl, { params: { _id: userId } })
            .then((response) => alert(response.data));
    }

    function handleLogout() {
        localStorage.removeItem('token');
        History.push("/");
    }

    let indexOfLastUser = userPerPage * currentPage;
    let indexOfFirstUser = indexOfLastUser - userPerPage;
    if (userDataFull) {
        currentUser = userDataFull.slice(indexOfFirstUser, indexOfLastUser);
    }

    function paginate(pageNumber) {
        setCurrentPage(pageNumber);
    }

    return (
        <>
            <br />
            <button  onClick={handleShow} className="btn btn-dark" disabled={!(localStorage.getItem("token"))}>My Info</button>
            <button className="btn btn-dark" onClick={handleLogout} style={{ margin: 20 }}>Logout</button>
            <Link to='/changePassword'><button className="btn btn-dark">Change Password</button></Link>
            {userData && <DisplayModal user={userData} setIsOpen={setIsOpen} isOpen={isOpen} />}
            {userDataFull && currentUser && <DisplayAllUser user={currentUser} handleDeleteClick={handleDeleteClick} />}
            {currentUser && userDataFull && <div>
                <Pagination userPerPage={userPerPage} totalUser={userDataFull.length} currentPage={currentPage} paginate={paginate} />
                <label for="quantity">Go to Page Number:</label>
                <input type="number" id="quantity" name="quantity" min="1" max={Math.ceil(userDataFull.length / userPerPage)} onChange={e => paginate(e.target.value)} value={currentPage}></input>
                <br/>
                <label for="userPerPage">Select No. of User in a Page:</label>
                <input type="number" id="userPerPage" name="userPerPage" min="1" max={userDataFull.length} onChange={e => setUserPerPage(e.target.value)} value={userPerPage}></input>
            </div>}
        </>
    )

}
export default Home;