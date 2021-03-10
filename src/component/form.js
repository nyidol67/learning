import React, { useEffect, useState } from 'react';
import { Formik,Form, FieldArray,Field} from "formik";
import * as yup from "yup";
import axios from 'axios';
import {useHistory} from 'react-router-dom';

const addUrl = 'http://localhost:8900/addUser';
const url = 'http://localhost:8900/';


function UForm(props) {
  const [Username, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [mailid, setMailid] = useState("");
  const [hobbies, setHobbies] = useState([{ name: "", description: "" },]);
  const History = useHistory();
  const validationSchema = yup.object({
    name: yup.string().required("Required"),
    mobile: yup.string().required("Required"),
    address: yup.string().required("Required"),
    mailid: yup.string().required("Required"),
    password: yup.string().concat(props.type == "create" ? yup.string().required('Password is required') : null),
    
  });
  let  formValue;
  if(props.type == "edit"){
  formValue = {
    name: Username, mobile: mobile, address: address, mailid: mailid,hobbies: hobbies
  }}
  else{
    formValue = {
      name: "", mobile: "", address: "", mailid: "", password:"",hobbies: hobbies
    }
  }
  useEffect(()=>{
    if (props.type == "edit") {
      axios.get(url + `${props.id}` + '/getUser')
        .then((response) => {
          setName(response.data[0].name);
          setMobile(response.data[0].mobile);
          setAddress(response.data[0].address);
          setMailid(response.data[0].mailid);
          setHobbies(response.data[0].hobbies);
        });
      //formValue = { name: Username, mobile: mobile, address: address, mailid: mailid }
    }
  },[]);

  function createOrUpdate(value) {
    if (props.type == "create") {
      axios.post(addUrl, value)
        .then((response) => alert("User data succesfully added"));
      History.push("/");
    }
    else {
      axios.put(url + `${props.id}` + '/updateUser', value)
        .then((response) => alert("User data succesfully updated"));
      History.push("/dashboard");
      
    }
  }
  return (
    <div className="container">
      <h1><center>Fill the Forms</center></h1>
      <Formik
        enableReinitialize={true}
        initialValues={formValue }
        validationSchema={validationSchema}
        onSubmit={values => {
          createOrUpdate(values);
        }}
      >
        {({ handleSubmit, handleChange, values, errors }) => (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                onChange={handleChange}
                value={values.name}
                name="name"
                className="form-control"
              />
            </div>
            {errors.name}
            <br />
            <div className="form-group">
              <label>Mobile:</label>
              <input
                type="text"
                onChange={handleChange}
                value={values.mobile}
                name="mobile"
                className="form-control"
              />
            </div>
            {errors.mobile}
            <br />
            <div className="form-group">
              <label>Address:</label>
              <input
                type="text"
                onChange={handleChange}
                value={values.address}
                name="address"
                className="form-control"
              />
            </div>

            {errors.address}
            <br />
            <div className="form-group">
              <label>mail id:</label>
              <input
                type="text"
                onChange={handleChange}
                value={values.mailid}
                name="mailid"
                className="form-control"
              />
            </div>
            {errors.mailid}
            <br />
            { props.type == "create" &&
              <div className="form-group">
                <label>password:</label>
                <input
                  type="text"
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  className="form-control"
                />
              </div>
            }
            {props.type=="create" && errors.password}
            <label> Hobbies</label>
           <FieldArray
             name="hobbies"
             render={arrayHelpers => (
               <div>
                 {
                   values.hobbies.map((hobbies, index) => (
                     <div key={index}>
                       <label>name</label><Field name={`hobbies.${index}.name`}/>
                       <label>description</label><Field name={`hobbies.${index}.description`} />
                       <button
                         type="button"
                         onClick={() => arrayHelpers.remove(index)} // remove a hobbies from the list
                       >
                         -
                       </button>
                       <button
                         type="button"
                         onClick={() => arrayHelpers.insert(index, '')}
                       >
                         +
                       </button>
                     </div>
                   ))
                 }
                 
               </div>
             )}
           />
            <button className="btn btn-success" type="submit">Submit</button>
          </form>
        )}
      </Formik>
    </div>
  );
}
export default UForm;
