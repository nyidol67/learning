import React, { useState } from 'react';
import { Formik } from "formik";
import * as yup from "yup";
import axios from 'axios';
import {useHistory} from 'react-router-dom';

const changePasswordUrl = 'http://localhost:8900/changePassword';
const validationSchema = yup.object({
    newPassword: yup.string().required("Required"),
    oldPassword: yup.string().required("Required")
});
function ChangePasswordForm() {
    const History = useHistory();
    const [message,setMessage] = useState("");
    function handleSubmit(values) {
        axios.put(changePasswordUrl, values, {
            headers:{ "x-access-token": localStorage.getItem("token") }
        })
        .then((response) => {
            setMessage(response.data.message);
        });
        History.push('/');
    }

    return (
        <div className="container">
            <Formik enableReinitialize={true}
                initialValues={{oldPassword:"",newPassword:""}}
                validationSchema={validationSchema}
                onSubmit={values => {
                    handleSubmit(values);
                }}>
                {({ handleSubmit, handleChange, values, errors }) => (
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Old Password:</label>
                            <input
                                type="text"
                                onChange={handleChange}
                                value={values.oldPassword}
                                name="oldPassword"
                                className="form-control"
                            />
                        </div>
                        {errors.oldPassword}
                        <br />
                        <div className="form-group">
                            <label>New Password:</label>
                            <input
                                type="text"
                                onChange={handleChange}
                                value={values.newPassword}
                                name="newPassword"
                                className="form-control"
                            />
                        </div>
                        {errors.newPassword}
                        <br/>
                        <button className="btn btn-success" type="submit">Submit</button>
                        {message}
                        </form>
                )}
            </Formik>
        </div>
    )

}
export default ChangePasswordForm;