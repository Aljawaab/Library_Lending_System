import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StudentForm = () => {
  const navigate = useNavigate();
 
  const validationSchema = Yup.object({
    Name: Yup.string().required("Student Name is required"),
    ClassName: Yup.string().required("Class Name is required"),
  });

  return (
    <Formik
      initialValues={{
        Name: "",
        ClassName: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        // Submit form data to Flask API
        axios
          .post("http://127.0.0.1:5555/students", values)
          .then((response) => {
            alert("Student added successfully!");
            resetForm(); // Clear form fields after success
          })
          .catch((error) => {
            console.error(error);
            alert("Error adding student. Please try again.");
          });
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <div>
            <label htmlFor="Name">Student Name</label>
            <Field name="Name" />
            <ErrorMessage name="Name" component="div" style={{ color: "red" }} />
          </div>

          <div>
            <label htmlFor="ClassName">Class Name</label>
            <Field name="ClassName" />
            <ErrorMessage name="ClassName" component="div" style={{ color: "red" }} />
          </div>

          <button type="submit" disabled={isSubmitting}>
            Add Student
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default StudentForm;
