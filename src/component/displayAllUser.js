import React from 'react';
import { Link } from 'react-router-dom';
function DisplayAllUser(props) {
    const user = props.user;
    return (
        <>
            <h3 style={{ color: "grey" }}><center>List of Users</center></h3>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        
                        <th>Name</th>
                        <th>Mobile Number</th>
                        <th>Address</th>
                        <th>mailid</th>
                        <th>hobbies</th>
                        <th>Function</th>
                        
                    </tr>

                </thead>
                <tbody>
                    {user.map((item,i) => {
                        return (
                            <tr key={i}>
                                
                                <td >{item.name}</td>
                                <td >{item.mobile}</td>
                                <td >{item.address}</td>
                                <td >{item.mailid}</td>
                                <td>
                                    <table>
                                        <thead><tr><th>name</th><th>description</th></tr></thead>
                                        <tbody>{item.hobbies.map((item,index)=>{return (
                                            <tr key = {index}>
                                                <td>{item.name}</td>
                                                <td>{item.description}</td>
                                            </tr>
                                        )})}</tbody>
                                    </table>
                                </td>
                                <td>
                                    <ul className="list-inline m-0">
                                        <li className="list-inline-item">
                                            <Link to={'/'}><button className="btn btn-danger btn-sm rounded-0" value={item._id} onClick={(e) => { props.handleDeleteClick(e.currentTarget.value) }}><i className="fa fa-trash"></i></button></Link>
                                        </li>
                                        <li className="list-inline-item">
                                            <Link to={`/${item._id}/edit`}><button className="btn btn-primary btn-sm rounded-0" value={item._id}><i className="fa fa-edit"></i></button></Link>
                                        </li>
                                    </ul>
                                </td>
                            </tr>
                        )
                    })
                    }
                </tbody>
            </table>


        </>
    )

}
export default DisplayAllUser;