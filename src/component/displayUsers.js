import React from 'react';

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