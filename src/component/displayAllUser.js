import React from 'react';
import { Link } from 'react-router-dom';
function DisplayAllUser(props) {
    return (
        <>

            <h3 style={{ color: "grey" }}><center>List of Users</center></h3>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Name</th>
                        <th>Mobile Number</th>
                        <th>Address</th>
                        <th>Function</th>
                    </tr>

                </thead>
                <tbody>
                    {props.user.map((item) => {
                        return (
                            <tr>
                                <td>{item._id}</td>
                                <td>{item.name}</td>
                                <td>{item.mobile}</td>
                                <td>{item.address}</td>
                                <td>
                                    <ul className="list-inline m-0">
                                        <li className="list-inline-item">
                                            <Link to={'/'}><button className="btn btn-danger btn-sm rounded-0" value={item._id} onClick={(e) => { props.handleDeleteClick(e.currentTarget.value) }}><i class="fa fa-trash"></i></button></Link>
                                        </li>
                                        <li className="list-inline-item">
                                            <Link to={`/${item._id}/edit`}><button className="btn btn-primary btn-sm rounded-0" value={item._id}><i class="fa fa-edit"></i></button></Link>
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