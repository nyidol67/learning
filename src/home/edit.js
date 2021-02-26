import React from 'react';
import Form from '../component/form';
function Edit(props){
    return(
        <>
         <p>This is edit and id is {props.match.params.id}</p>
         <p>fill the edit form</p>
         <Form type="edit" id={props.match.params.id}/>
        </>
    )
}
export default Edit;