import React, { useMemo, useEffect, useState } from 'react';
import axios from 'axios';
//import DisplayAllUser from '../component/displayAllUser';
import { useHistory } from 'react-router-dom';
import DisplayModal from './displayModal';
import { Link } from 'react-router-dom';
import ReactTable from '../component/reactTable';
import {Container} from 'reactstrap';
import Mongo from 'mongodb';
import {format, formatDistanceToNow} from 'date-fns';
var ObjectId = Mongo.ObjectId;

const userUrl = 'http://localhost:8900/showUser';
const deleteUrl = 'http://localhost:8900/deleteUser';
const userAllUrl = 'http://localhost:8900/showUserAll';
const paginationUrl = 'http://localhost:8900/user';

function Home() {
    
    const History = useHistory();
    const [userData, setUserData] = useState(null);
    const [userDataFull, setUserDataFull] = useState(null);
    //const [userPerPage, setUserPerPage] = useState(5);
    //const [currentPage, setCurrentPage] = useState(0);
    const [queryParam,setQueryParam] = useState({pageIndex: 0, pageSize: 5 });
    const [canNext, setCanNext] = useState(true);
    const [canPrev, setCanPrev] = useState(false);
    const [total, setTotal] = useState(null);
    const [isOpen, setIsOpen] = useState(false);// for modal

    // useEffect(() => {
    //     axios.get(paginationUrl + "?"+new URLSearchParams(queryParam).toString())
    //         .then((response) => {
    //             setUserDataFull(response.data.result);
    //             setCanNext(response.data.next);
    //             setCanPrev(response.data.previous);
    //             setTotal(response.data.total);
    //         })
    // }, [queryParam]);
    
    useEffect(()=>{
        axios.get(userAllUrl)
        .then((response)=>{
            setUserDataFull(response.data);
        })
    },[])

    function handleShow() {
        axios.get(userUrl, {
            headers: { "x-access-token": localStorage.getItem("token") }
        })
            .then((response) => {
                if (response) {
                    setUserData(response.data);
                }

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
    const columns = useMemo(()=>[
        {
            Header:"Name",
            accessor:"name"
        },
        {
            Header:"Mobile",
            accessor:"mobile"
        },
        {
            Header:"Address",
            accessor:"address"
        },
        {
            Header:"Hobbies",
            accessor:(values)=>{
                return values.hobbies.map((item, key)=>(
                    <tr key={key}>
                        <td>{item.name}</td>
                        <td>{item.description}</td>
                    </tr>
                ))
                
            }   
        },
        {
            Header:"Created at",
            accessor:(values)=>{
                const d = ObjectId(values._id).getTimestamp();
                const formattedDate = format(d,"PPPPpppp");
                const data = formatDistanceToNow(d,{addSuffix:true})
                return(<div>{formattedDate} <span>({data})</span></div>);
            }

        }    
    ],[]);
    
    return (
        <div className="container">
            
            <br />
            <button onClick={handleShow} className="btn btn-dark">My Info</button>
            <button className="btn btn-dark" onClick={handleLogout} style={{ margin: 20 }}>Logout</button>
            <Link to='/changePassword'><button className="btn btn-dark">Change Password</button></Link>
            {userData && <DisplayModal user={userData} setIsOpen={setIsOpen} isOpen={isOpen} />}
            <br />
            {/* <div className="row">
                <div className="col-sm-3"> <label htmlFor="quantity"><strong>Jump to</strong></label>
                    <input type="number" id="quantity" name="quantity" min={1} max={Math.ceil(total / userPerPage)} onChange={e => setCurrentPage(parseInt(e.target.value))} value={currentPage}></input>
                </div>
                <div className="col-sm-3"> <label htmlFor="userPerPage"><strong>User per page</strong></label>
                    <input type="number" id="userPerPage" name="userPerPage" min={1} max={total} onChange={e => setUserPerPage(e.target.value)} value={userPerPage}></input>
                </div>
            </div> */}

            {/* {userDataFull && <DisplayAllUser user={userDataFull} handleDeleteClick={handleDeleteClick} />} */}
            <Container style={{marginTop:100}}>
            {userDataFull && <ReactTable columns={columns} data={userDataFull} />}
            </Container>
            {/* <nav>
                <ul className="pagination">
                    <li className="page-item">
                        <button onClick={() => setCurrentPage(currentPage - 1)} className="page-link" disabled={!canPrev}>Previous</button>
                    </li>
                    <li className="page-item">
                        <button onClick={() => setCurrentPage(currentPage)} className="page-link">{currentPage}</button>
                    </li>
                    <li className="page-item">
                        <button onClick={() => setCurrentPage(currentPage + 1)} className="page-link" disabled={!canNext}>next</button>
                    </li>
                </ul>
            </nav> */}
        </div>
    )
}
export default Home;