import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";


const LendingForm = () => {  
  const validationSchema = Yup.object({
    Student_id: Yup.number()
      .required("Student ID is required")
      .min(1, "Student ID must be a positive number"),
    Book_id: Yup.number()
      .required("Book ID is required")
      .min(1, "Book ID must be a positive number"),
    BorrowDate: Yup.string().required("Borrow Date is required"),
    ReturnDate: Yup.string().required("Borrow Date is required"),
  });

  return (
    <Formik
      initialValues={{
        Student_id: "",
        Book_id: "",
        BorrowDate: "",
        ReturnDate: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        // Submit form data to Flask API
        axios
          .post("https://library-lending-system-db.onrender.com/lendings", values)
          .then((response) => {
            alert("Lending record added successfully!");
            resetForm(); // Clear form fields after success
          })
          .catch((error) => {
            console.error(error);
            alert("Error adding lending record. Please try again.");
          });
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <div>
            <label htmlFor="Student_id">Student ID</label>
            <Field name="Student_id" type="number" />
            <ErrorMessage name="Student_id" component="div" style={{ color: "red" }} />
          </div>

          <div>
            <label htmlFor="Book_id">Book ID</label>
            <Field name="Book_id" type="number" />
            <ErrorMessage name="Book_id" component="div" style={{ color: "red" }} />
          </div>

          <div>
            <label htmlFor="BorrowDate">Borrow Date</label>
            <Field name="BorrowDate" type="string" />
            <ErrorMessage name="BorrowDate" component="div" style={{ color: "red" }} />
          </div>

          <div>
            <label htmlFor="ReturnDate">Return Date</label>
            <Field name="ReturnDate" type="string" />
            <ErrorMessage name="ReturnDate" component="div" style={{ color: "red" }} />
          </div>

          <button type="submit" disabled={isSubmitting}>
            Add Lending Record
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default LendingForm;
