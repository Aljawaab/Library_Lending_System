import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const BookForm = () => {
  const validationSchema = Yup.object({
    Title: Yup.string().required("Title is required"),
    Author: Yup.string().required("Author is required"),
    NumberOfBooks: Yup.number()
      .required("Number of copies is required")
      .min(1, "Must be at least 1 copy"),
  });

  return (
    <Formik
      initialValues={{
        Title: "",
        Author: "",
        NumberOfBooks: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        // Send data to the Flask API
        axios
          .post("http://127.0.0.1:5555/books", values)
          .then((response) => {
            alert("Book added successfully!");
            resetForm();
          })
          .catch((error) => {
            console.error(error);
            alert("Error adding book");
          });
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <div>
            <label htmlFor="Title">Title</label>
            <Field name="Title" />
            <ErrorMessage name="Title" component="div" style={{ color: "red" }} />
          </div>

          <div>
            <label htmlFor="Author">Author</label>
            <Field name="Author" />
            <ErrorMessage name="Author" component="div" style={{ color: "red" }} />
          </div>

          <div>
            <label htmlFor="NumberOfBooks">Number of Copies</label>
            <Field name="NumberOfBooks" type="number" />
            <ErrorMessage name="NumberOfBooks" component="div" style={{ color: "red" }} />
          </div>

          <button type="submit" disabled={isSubmitting}>
            Add Book
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default BookForm;
