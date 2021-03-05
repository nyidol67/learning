import React, { useEffect, useState } from 'react';
import {Formik} from 'formik';
import * as yup from "yup";
import axios from 'axios';
import {useHistory} from 'react-router-dom';

const validationSchema = yup.object({
    mailid: yup.string().required("Required"),
    password: yup.string().required("Required")
  });
function Login() {
    const History = useHistory();
    axios.defaults.withCredentials= true;
    const [token,setToken] = useState(localStorage.getItem("token"));
    const [message,setMessage] = useState("");

    const handleSubmit = (values) => {
        axios.post('http://localhost:8900/login', values)
            .then((response) => {
                if (!response.data.auth) {
                    setMessage(response.data.message);
                } else {
                    localStorage.setItem("token",response.data.token)
                    setToken(response.data.token);
                    setMessage("");
                    History.push("/dashboard");
                }
            });
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
                            {token && History.push("/dashboard")}
                        </form>
                    )}
                </Formik>
            </div>   
        </>
    )
}
export default Login;