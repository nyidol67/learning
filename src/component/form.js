import React, { useState, useEffect } from 'react';
import { Formik } from "formik";
import * as yup from "yup";
import axios from 'axios';

const addUrl = 'http://localhost:8900/addUser';
const url = 'http://localhost:8900/'

const validationSchema = yup.object({
  name: yup.string().required("Required"),
  mobile: yup.string().required("Required"),
  address: yup.string().required("Required")
});
function Form(props) {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const type = props.type;
  let values = {name:"",mobile:"",address:""};
  function handleEdit() {
    axios.get(url + `${props.id}` + '/getUser')
      .then((response) => {
        setName(response.data[0].name);
        setMobile(response.data[0].mobile);
        setAddress(response.data[0].address);
      });
  }
  function createOrUpdate(value) {
    if (props.type == "create") {
      axios.post(addUrl, value)
        .then((response) => alert("User data succesfully added"));
    }
    else if (props.type == "edit") {
      axios.put(url + `${props.id}` + '/updateUser', value)
        .then((response) => alert("User data succesfully updated"));
    }
  }

  return (
    <div className="container">
      <h1><center>Fill the Forms</center></h1>
      <button onClick={handleEdit}>edit on previous</button>

      <Formik
        initialValues={values}
        validationSchema={validationSchema}
        onSubmit={values => {
          createOrUpdate(values);
        }}
      >
        {({ handleSubmit, handleChange, values, errors }) => (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
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
              <label>Mobile</label>
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
              <label>Address</label>
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
            <button className="btn btn-success" type="submit">Submit</button>
          </form>
        )}
      </Formik>
    </div>
  );
}
export default Form; 