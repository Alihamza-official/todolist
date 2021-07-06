
import React, { useState } from 'react';
import * as yup from 'yup';
import { Formik, Form } from "formik";

let schema = yup.object().shape({
        name: yup.string().required("Name is required "),
        description: yup.string().required("Description is required ")
        
    });

let LearnFormik = () => {
    const initialValues = {name:"", description:""};
    const [name, setName ] = useState("");
    const  [description, setDescription] = useState("");

    return(
        <div className="container">
            Formik called
            <Formik
                validationSchema={schema}
                initialValues={initialValues}
                onSubmit={(values)=>console.log({message:"onSubmit called", values})}
            >
                { ({ values, touched, errors, handleChange }) => {
                    return (
                        <Form>
                            <input
                                value={values.name}
                                onChange={handleChange("name")}
                            /> 
                            <p> {touched.name && errors.name ? errors.name: ""}</p>
                            <br/><br/>
                            <textarea
                                value={values.description}
                                onChange={handleChange("description")}
                            ></textarea>
                             <p> {touched.description && errors.description ? errors.description: ""}</p>
                             <br/><br/>
                            <button type="submit"> Submit </button>
                        </Form>
                    )
                }}
            </Formik>
        </div>
    )
}

export default LearnFormik;