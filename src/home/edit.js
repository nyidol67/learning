import React from 'react';
import UForm from '../component/form';
function Edit(props){
    return(
        <>
         <UForm type="edit" id={props.match.params.id}/>
        </>
    )
}
export default Edit;