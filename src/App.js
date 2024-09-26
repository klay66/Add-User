import Example from "./Example";
import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as Yup from 'yup';

export default function App({ args }) {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const org = 'https://httpbin.org/post'

  const sendData = async (values) => {
    console.log("send", values);
    try {
      const res = await fetch(org, {
        method: 'POST',
        headers: {
          'content-type': 'application / json',
        },
        body: JSON.stringify(values)
      })

    }
    catch (error) {
      console.error('Error:', error);
    }
  }


  const validationSchema = Yup.object({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
    img: Yup.string().required('Image is required'),
  });

  return (
    <div className="add d-flex justify-content-center align-items-center">
      <Button color="danger" onClick={toggle}>
        Add User
      </Button>
      <Modal isOpen={modal} toggle={toggle} {...args}>
        <ModalHeader toggle={toggle}>Add User</ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              img: ""
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
              console.log("Form value", values);
              sendData(values);
              resetForm();
              toggle();
            }}
          >
            {({ setFieldValue, isSubmitting }) => (
              <Form>
                <div className="form-group">
                  <p>First Name</p>
                  <Field type="text" name="firstName" placeholder='Add your name' />
                  <ErrorMessage name="firstName" component="div" className="error" />
                </div>
                <div className="form-group">
                  <p>Last Name</p>
                  <Field type="text" name="lastName" placeholder='Add your name' />
                  <ErrorMessage name="lastName" component="div" className="error" />
                </div>
                <div className="form-group">
                  <p>Email</p>
                  <Field type="email" name="email" placeholder='Add your email' />
                  <ErrorMessage name="email" component="div" className="error" />
                </div>
                <div className="form-group">
                  <p>Password</p>
                  <Field type="password" name="password" placeholder='Add your password' />
                  <ErrorMessage name="password" component="div" className="error" />
                </div>
                <div className="form-group">
                  <p>Add image</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                      const file = event.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setFieldValue("img", reader.result);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                  <ErrorMessage name="img" component="div" className="error" />
                </div>
                <ModalFooter>
                  <Button type='submit' color="primary" disabled={isSubmitting}>
                    Submit
                  </Button>{' '}
                  <Button color="secondary" onClick={toggle}>
                    Cancel
                  </Button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </ModalBody>

      </Modal>
    </div>
  )
}

