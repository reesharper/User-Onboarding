import React, { useState, useEffect } from 'react';
import Form from './Form';
import User from './User';
import * as yup from 'yup';
import axios from 'axios';
import schema from '../src/validation/formSchema';

const initialFormValues = {
  name: "",
  email: "",
  password: "",
  terms: false,
};

const initialFormErrors = {
  name: "",
  email: "",
  password: "",
  terms: "",
};

const initialUsers = [];

export default function App() {

  const [users, setUsers] = useState(initialUsers);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);

  const getUsers = () => {
    axios.get(`https://reqres.in/api/users`)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        // debugger
        console.log(`GET ERROR`);
      });
  };

  const postNewUser = (newUser) => {
    axios.post(`https://reqres.in/api/users`, newUser)
      .then((res) => {
        setUsers([res.data, ...users]);
        setFormValues(initialFormValues);
      })
      .catch((err) => {
        // debugger
        console.log(`POST ERROR`)
      })
  }


  const inputChange = (name, value) => {

    yup
      .reach(schema, name)
      .validate(value)
      .then(() => {
        setFormErrors({
          ...formErrors,
          [name]: ""
        });
      })
      .catch((err) => {
        setFormErrors({
          ...formErrors,
        [name]: err.errors[0]
        });
      });
  
      setFormValues({
        ...formValues,
        [name]: value,
      });
  };


  const formSubmit = () => {
    const newUser = {
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
    };
    postNewUser(newUser);
  };

  useEffect(() => {
    getUsers();
  }, []);

return (
  <div>

    <header>
      <h1>User Onboarding</h1>
    </header>

  <Form 
  values={formValues}
  change={inputChange}
  submit={formSubmit}
  errors={formErrors}
  />

  {users.map((user) => {
        return <User key={user.id} details={user} />;
    })}

  </div>
  );
}