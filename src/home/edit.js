import React from 'react';
import UForm from '../component/form';
function Edit(props){
    return(
        <>
         <p>This is edit and id is {props.match.params.id}</p>
         <p>fill the edit form</p>
         <UForm type="edit" id={props.match.params.id}/>
        </>
    )
}
export default Edit;