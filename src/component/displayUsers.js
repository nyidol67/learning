import React from 'react';
import reactDOM from 'react-dom';
function DisplayUser(props){
    const {name, mobile, address} = props.user;
    return(<>
        <p>{name}</p>
        <p>{mobile}</p>
        <p>{address}</p>
        </>
    )
}
export default DisplayUser;