import React, { useEffect, useState } from 'react';
import {Formik} from 'formik';
import * as yup from "yup";
import axios from 'axios';

const validationSchema = yup.object({
    mailid: yup.string().required("Required"),
    password: yup.string().required("Required")
  });
function Login() {
    axios.defaults.withCredentials= true;

    const [message,setMessage] = useState("");
    const [loginStatus,setLoginStatus] = useState(false);

    const handleSubmit = (values) => {
        axios.post('http://localhost:8900/login', values)
            .then((response) => {
                if (!response.data.auth) {
                    setLoginStatus(false);
                    setMessage(response.data.message);
                } else {
                    localStorage.setItem("token",response.data.token)
                    setMessage("");
                    setLoginStatus(true);
                }
            });
    }
    useEffect(()=>{
        axios.get('http://localhost:8900/login')
        .then((response)=>{
            if(response.data.loggedIn == true)
            {
                
                setLoginStatus(true);
            }
        }
        )},[])

        const userAuthenticated=()=>{
            axios.get('http://localhost:8900/isUserAuthenticated',{
                headers:{"x-access-token":localStorage.getItem("token")},
        })
            .then((response)=>{console.log(response)})
        }
    return (
        <>
            <div className="container">
                <h1><center>Please log in</center></h1>
                <Formik
                    initialValues={{ mailid: "", password: "" }}
                    validationSchema={validationSchema}
                    onSubmit={values => {
                        handleSubmit(values);
                    }}
                >
                    {({ handleSubmit, handleChange, values, errors }) => (
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Name:</label>
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
                            <div className="form-group">
                                <label>password:</label>
                                <input
                                    type="password"
                                    onChange={handleChange}
                                    value={values.password}
                                    name="password"
                                    className="form-control"
                                />
                            </div>
                            {errors.password}
                            <br />
                            {message}
                            <button className="btn btn-success" type="submit">Submit</button>
                            {loginStatus && <p>Authorized</p>}
                        </form>
                    )}
                </Formik>
            </div>   
        </>
    )
}
export default Login;